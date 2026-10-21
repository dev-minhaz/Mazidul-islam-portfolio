export interface FindingSample {
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  impact: string;
  remediation: string;
  cwe?: string;
  cvssScore?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  tagline: string;
  overview: string;
  scopeSummary: string;
  environmentType: string;
  threatModel: string;
  keyAreas: string[];
  methodologySteps: string[];
  findingsSample: FindingSample[];
  deliverables: string[];
  visualType: 'dashboard' | 'api' | 'report' | 'terminal' | 'matrix' | 'toolkit';
  estimatedTimeline?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  detailedScope: string[];
  methodologySummary: string;
  deliverables: string[];
  suitableFor: string;
  prerequisites: string[];
  iconName: string;
}

export interface SkillCategory {
  title: string;
  categoryCode: string;
  description: string;
  skills: {
    name: string;
    description: string;
    type: 'Core' | 'Tool' | 'Standard' | 'Scripting';
    practicalUsage: string;
  }[];
}

export interface MethodologyStep {
  step: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string;
  deliverables: string[];
  icon: string;
}

export interface BackgroundItem {
  period: string;
  title: string;
  organization: string;
  description: string;
  category: 'Focus' | 'Research' | 'Learning' | 'Methodology';
  highlights: string[];
}

export interface UserConfigState {
  email: string;
  availability: string;
  githubUrl: string;
  linkedinUrl: string;
  phone?: string;
  location?: string;
}
