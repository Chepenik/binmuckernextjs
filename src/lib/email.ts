import { Resend } from 'resend';
import type { AuditReport } from '@/types/audit';

let resend: Resend | null = null;
let warnedMissingResend = false;

function getResend(): Resend | null {
  if (resend) return resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (!warnedMissingResend) {
      warnedMissingResend = true;
      console.warn(
        JSON.stringify({
          level: 'WARN',
          service: 'email',
          message: 'RESEND_API_KEY not set. Email sending disabled.',
        }),
      );
    }
    return null;
  }

  resend = new Resend(apiKey);
  return resend;
}

interface EmailReportData {
  email: string;
  businessName: string;
  city: string;
  report: AuditReport;
}

export async function sendAuditReport(data: EmailReportData): Promise<{ success: boolean; error?: string }> {
  const client = getResend();

  if (!client) {
    // Log the lead/email but don't fake success
    console.error(
      JSON.stringify({
        level: 'ERROR',
        service: 'email',
        message: 'Cannot send audit report: RESEND_API_KEY not configured',
        email: data.email,
        businessName: data.businessName,
      }),
    );
    return {
      success: false,
      error: 'Email service not configured. Please contact support.',
    };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'audit@binmucker.com';

  // Map categories to the report structure
  const categoryMap: Record<string, string> = {
    'Local Search': 'Local search',
    'Reviews': 'Reviews',
    'Review Management': 'Reviews',
    'Content': 'Content',
    'Content Marketing': 'Content',
    'Technical SEO': 'Technical',
    'Technical': 'Technical',
    'AI Readiness': 'AI readiness',
  };

  const categorizedScores: Record<string, { score: number; actions: string[] }> = {};

  data.report.categories.forEach((cat) => {
    const mappedName = categoryMap[cat.category] || cat.category;
    
    if (!categorizedScores[mappedName]) {
      categorizedScores[mappedName] = { score: cat.score, actions: [] };
    }

    cat.actions.forEach((action) => {
      if (action.priority === 'high') {
        categorizedScores[mappedName].actions.push(`• ${action.action}`);
      }
    });
  });

  // Build category breakdown text
  const categoryBreakdown = Object.entries(categorizedScores)
    .map(([name, data]) => {
      const actionsText = data.actions.length > 0 
        ? `\n${data.actions.join('\n')}`
        : '';
      return `• ${name}: ${data.score}/100${actionsText}`;
    })
    .join('\n\n');

  // Build top fixes list (first 3 from topPriorities)
  const topFixesList = data.report.topPriorities
    .slice(0, 3)
    .map((priority, i) => `${i + 1}. ${priority}`)
    .join('\n');

  // Build order of operations (remaining priorities)
  const orderOfOps = data.report.topPriorities.length > 1
    ? `do #1 this week, then #${Math.min(2, data.report.topPriorities.length)}.`
    : 'start with #1.';

  const emailBody = `Hey —

Here's the full local visibility audit for ${data.businessName}.

Overall: ${data.report.overallScore}/100

Top fixes (start here):
${topFixesList}

Full breakdown:
${categoryBreakdown}

Order of operations: ${orderOfOps}

— Conor
binmucker.com

P.S. I keep a short list of tools I actually use (with disclosure) at binmucker.com/stack?utm_source=binmucker&utm_medium=email&utm_campaign=audit_results — only if useful.`;

  try {
    await client.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `Your local visibility audit — ${data.report.overallScore}/100 for ${data.businessName}`,
      text: emailBody,
    });

    console.log(
      JSON.stringify({
        level: 'INFO',
        service: 'email',
        message: 'Audit report sent successfully',
        email: data.email,
        businessName: data.businessName,
        score: data.report.overallScore,
      }),
    );

    return { success: true };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(
      JSON.stringify({
        level: 'ERROR',
        service: 'email',
        message: 'Failed to send audit report',
        error: errMsg,
        email: data.email,
        businessName: data.businessName,
      }),
    );

    return {
      success: false,
      error: 'Failed to send email. Please try again.',
    };
  }
}
