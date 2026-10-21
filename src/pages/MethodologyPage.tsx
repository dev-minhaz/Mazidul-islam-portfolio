import React from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import {
  Target,
  Search,
  Cpu,
  CheckCheck,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Layers,
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  const { methodology } = PORTFOLIO_CONFIG;

  const getStepIcon = (icon: string) => {
    switch (icon) {
      case 'Target':
        return <Target className="w-5 h-5 text-[#FF263F]" />;
      case 'Search':
        return <Search className="w-5 h-5 text-[#FF263F]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#FF263F]" />;
      case 'CheckCheck':
        return <CheckCheck className="w-5 h-5 text-[#FF263F]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#FF263F]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#FF263F]" />;
    }
  };

  const industryStandards = [
    {
      code: 'OWASP WSTG v4.2',
      title: 'Web Security Testing Guide',
      summary: 'Methodical checklist for verifying 11 categories of web application vulnerabilities.',
    },
    {
      code: 'OWASP API-SEC',
      title: 'API Security Top 10',
      summary: 'Targeted assessment of microservices, object authorization, and token flows.',
    },
    {
      code: 'NIST SP 800-115',
      title: 'Technical Guide to Information Security Testing',
      summary: 'Federal standard for target analysis, safe execution, and risk assessment.',
    },
    {
      code: 'CVSS v3.1',
      title: 'Common Vulnerability Scoring System',
      summary: 'Mathematical framework calculating severity without arbitrary rating inflation.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Penetration Testing Methodology &amp; Standards | Mazidul Islam Khan"
        description="A disciplined, 6-phase approach to security testing. Aligned with NIST SP 800-115, OWASP WSTG, and CVSS v3.1."
        canonicalPath="/methodology"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Testing Methodology' }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#29292D]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
              05 / TESTING DISCIPLINE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
              A DISCIPLINED APPROACH TO SECURITY TESTING.
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] pt-1">
              Every authorized engagement follows a structured 6-phase lifecycle designed to systematically discover vulnerabilities while safeguarding service uptime and data integrity.
            </p>
          </div>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-lg shadow-[#E50920]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>SCHEDULE SCOPING CALL</span>
          </Link>
        </div>

        {/* 6 Phases Timeline */}
        <div className="space-y-8">
          <div className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider pb-2 border-b border-[#1E1E22]">
            THE 6-PHASE ASSESSMENT LIFECYCLE
          </div>

          <div className="space-y-6">
            {methodology.map((step, idx) => (
              <div
                key={step.step}
                className="p-6 sm:p-8 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920]/40 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* Step Index & Icon (lg:col-span-3) */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-4xl text-[#E50920] leading-none">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#121214] border border-[#29292D] flex items-center justify-center">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white uppercase tracking-tight">
                    {step.title}
                  </h2>
                  <div className="text-xs font-mono-tech text-[#E50920] uppercase font-semibold">
                    {step.subtitle}
                  </div>
                </div>

                {/* Details (lg:col-span-5) */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-sm text-[#F5F5F5] font-medium leading-relaxed">
                    {step.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {step.details}
                  </p>
                </div>

                {/* Deliverables (lg:col-span-4) */}
                <div className="lg:col-span-4 p-4 rounded-lg bg-[#121214] border border-[#1E1E22] space-y-2">
                  <span className="text-[10px] font-mono-tech uppercase text-[#707078] block">
                    PHASE DELIVERABLES:
                  </span>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((deliv, i) => (
                      <li key={i} className="text-xs text-[#F5F5F5] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Standards Alignment */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-[#29292D] pb-3 space-y-1">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
              GOVERNANCE &amp; STANDARDS
            </span>
            <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight">
              FRAMEWORKS &amp; COMPLIANCE MAPPING
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStandards.map((std) => (
              <div
                key={std.code}
                className="p-5 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-2"
              >
                <div className="text-xs font-mono-tech font-bold text-[#E50920]">
                  {std.code}
                </div>
                <h3 className="text-sm font-heading font-bold text-white">
                  {std.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {std.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
