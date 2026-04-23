import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { put, list } from '@vercel/blob';
import {
  getTodaysTheme,
  generateBriefingId,
  type Briefing,
  type BriefingIdea,
} from '@/lib/briefing-constants';

function safeEqualStrings(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = 'moonshotai/kimi-k2.5';

function log(level: 'INFO' | 'WARN' | 'ERROR', message: string, data?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'briefing-api',
    message,
    ...data,
  };
  if (level === 'ERROR') {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export async function POST(request: NextRequest) {
  // Verify cron secret. Missing env var = misconfiguration (500), not open access.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    log('ERROR', 'CRON_SECRET not configured');
    return NextResponse.json({ error: 'Service misconfigured' }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization') ?? '';
  const expected = `Bearer ${cronSecret}`;
  if (!safeEqualStrings(authHeader, expected)) {
    log('WARN', 'Unauthorized briefing request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    log('ERROR', 'NVIDIA_API_KEY not configured');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    log('ERROR', 'BLOB_READ_WRITE_TOKEN not configured');
    return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
  }

  const briefingId = generateBriefingId();
  const theme = getTodaysTheme();

  log('INFO', 'Generating briefing', { briefingId, theme: theme.name });

  const systemPrompt = `You are MuckerkBot, the AI partner of Binmucker (Conor Chepenik). You generate daily Bitcoin innovation briefings — concrete, actionable ideas that real businesses and developers can implement.

Your response must be valid JSON matching this exact structure:
{
  "ideas": [
    {
      "title": "Short catchy title",
      "description": "2-3 sentence description of the idea",
      "businessType": "Target business/developer type",
      "implementation": "Specific technical steps to implement",
      "whyBitcoin": "Why Bitcoin/Lightning is uniquely suited for this"
    }
  ]
}

Generate exactly 4 ideas. Be specific and practical — no vague hand-waving. Reference real technologies (Lightning, L402, Nostr, Strike API, etc.) where relevant. Each idea should be something someone could start building today.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: theme.prompt },
        ],
        max_tokens: 4096,
        temperature: 1.0,
        top_p: 1.0,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      log('ERROR', 'NVIDIA API error', { status: response.status });
      return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
    }

    const data = await response.json();
    const rawText: string = data.choices?.[0]?.message?.content || '';

    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      log('ERROR', 'No JSON in briefing response', { preview: rawText.substring(0, 200) });
      return NextResponse.json({ error: 'Failed to parse briefing' }, { status: 500 });
    }

    let parsed: { ideas: BriefingIdea[] };
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      log('ERROR', 'JSON parse failed for briefing');
      return NextResponse.json({ error: 'Failed to parse briefing' }, { status: 500 });
    }

    if (!Array.isArray(parsed.ideas) || parsed.ideas.length === 0) {
      log('ERROR', 'Invalid briefing structure');
      return NextResponse.json({ error: 'Invalid briefing format' }, { status: 500 });
    }

    const briefing: Briefing = {
      id: briefingId,
      date: new Date().toISOString().split('T')[0],
      theme: theme.name,
      themeId: theme.id,
      ideas: parsed.ideas,
      generatedAt: new Date().toISOString(),
    };

    // Store to Vercel Blob
    await put(`briefings/${briefingId}.json`, JSON.stringify(briefing), {
      contentType: 'application/json',
      access: 'public',
    });

    log('INFO', 'Briefing generated and stored', {
      briefingId,
      theme: theme.name,
      ideaCount: briefing.ideas.length,
    });

    return NextResponse.json({ success: true, briefingId, ideaCount: briefing.ideas.length });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      log('ERROR', 'Briefing generation timed out');
      return NextResponse.json({ error: 'Timed out' }, { status: 504 });
    }

    const msg = error instanceof Error ? error.message : 'Unknown error';
    log('ERROR', 'Briefing generation failed', { error: msg });
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return NextResponse.json({ briefings: [] });
    }

    const { blobs } = await list({ prefix: 'briefings/' });

    const briefings: Briefing[] = [];
    // Get the 10 most recent briefings
    const sorted = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    for (const blob of sorted.slice(0, 10)) {
      try {
        const res = await fetch(blob.url);
        const briefing: Briefing = await res.json();
        briefings.push(briefing);
      } catch {
        // Skip corrupted entries
      }
    }

    return NextResponse.json({ briefings });
  } catch {
    return NextResponse.json({ briefings: [] });
  }
}
