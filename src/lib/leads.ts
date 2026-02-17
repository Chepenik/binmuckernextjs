import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export interface Lead {
  id: string;
  timestamp: string;
  ip: string;
  businessName: string;
  city: string;
  businessType: string;
  websiteUrl?: string;
  additionalContext?: string;
  status: 'success' | 'error' | 'timeout';
  overallScore?: number;
  errorMessage?: string;
  durationMs: number;
  scrapedDataAvailable?: boolean;
  aiReadinessScore?: number;
}

const DATA_DIR = join(process.cwd(), 'data');
const LEADS_FILE = join(DATA_DIR, 'leads.json');

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
    // directory already exists
  }
}

async function readLeads(): Promise<Lead[]> {
  try {
    const data = await readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  try {
    await ensureDataDir();
    const leads = await readLeads();
    leads.push(lead);
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error('[LEADS] Failed to save lead:', err);
  }
}

export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
