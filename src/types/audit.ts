export interface AuditFormData {
  businessName: string;
  city: string;
  businessType: string;
  websiteUrl?: string;
  additionalContext?: string;
}

export interface ActionItem {
  action: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: string;
}

export interface CategoryResult {
  category: string;
  score: number;
  emoji: string;
  actions: ActionItem[];
}

export interface QuickWin {
  title: string;
  description: string;
  timeToImplement: string;
}

export interface AuditReport {
  overallScore: number;
  summary: string;
  categories: CategoryResult[];
  quickWin: QuickWin;
  topPriorities: string[];
  competitiveInsight: string;
}

export type AuditState = 'idle' | 'loading' | 'success' | 'error';
