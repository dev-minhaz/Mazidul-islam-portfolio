import React from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { usePortfolioConfig } from '../context/PortfolioConfigContext';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import {
  ShieldCheck,
  Target,
  Search,
  CheckCheck,
  FileText,
  Lock,
  ArrowRight,
  Terminal,
  Globe,
  Award,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { config } = usePortfolioConfig();
  const { personal, learningAndBackground, trustSignals, principlesQuote } = PORTFOLIO_CONFIG;

  const howIWork = [
    {
      number: '01',
      title: 'Scope & Authorization First',
      description: 'Zero testing commences without signed written rules of engagement, clear IP/domain boundaries, and defined escalation contacts.',
    },
    {
      number: '02',
      title: 'Methodical Surface Assessment',
      description: 'Systematic analysis of target entry points, authentication handshakes, and API schemas to identify logical vulnerabilities.',
    },
    {
      number: '03',
      title: 'Safe Validation Without Noise',
      description: 'Manual verification of candidate vulnerabilities with gentle proof-of-concept payloads to confirm exploitability without causing service disruption.',
    },
    {
      number: '04',
      title: 'Risk-Focused Severity Triage',
      description: 'Mapping findings to CVSS v3.1 metrics and evaluating true business impact rather than relying on noisy, unvetted automated scanner alerts.',
    },
    {
      number: '05',
      title: 'Practical Engineering Remediation',
      description: 'Translating findings into concrete code fixes, architectural patterns, and defensive configuration rules that developers can deploy immediately.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="About Mazidul Islam Khan | Penetration Tester &amp; Security Researcher"
        description="Learn about Mazidul Islam Khan, professional penetration tester and application security specialist. Methodology, technical labs, and ethical testing standards."
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'About & Background' }]} />

        {/* Hero Section of About Page */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
                01 / PROFESSIONAL PROFILE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
                UNDERSTANDING HOW SYSTEMS FAIL TO BUILD STRONGER DEFENSES.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#F5F5F5] font-medium leading-relaxed">
              I am an independent penetration tester, application security specialist, and security researcher.
              I help startups, SaaS companies, and international engineering teams identify and remediate security weaknesses before malicious adversaries exploit them.
            </p>

            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              My assessment approach is strictly authorized, evidence-based, and focused on real-world impact. While automated scanners detect superficial configuration flags, complex high-severity vulnerabilities—such as Broken Object Level Authorization (BOLA), business logic flaws, and cross-tenant data leaks—require meticulous manual verification by a skilled human tester.
            </p>

            {/* Quick Status Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#A1A1AA]">
              <div className="flex items-center gap-2 p-2 rounded bg-[#0D0D0F] border border-[#29292D]">
                <Globe className="w-4 h-4 text-[#E50920]" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-[#0D0D0F] border border-[#29292D]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{config.availability}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors shadow-lg shadow-[#E50920]/20"
              >
                <span>REQUEST AN ASSESSMENT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#121214] hover:bg-[#1A1A1E] text-white border border-[#29292D] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors"
              >
                <span>SCHEDULE SCOPING CALL</span>
              </Link>
            </div>
          </div>

          {/* Portrait Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#29292D] shadow-2xl bg-[#0D0D0F] group">
              <img
                src={personal.portraitImage}
                alt={personal.portraitAlt}
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('public/')) {
                    target.src = '/public' + personal.portraitImage;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/70 backdrop-blur-md rounded-lg border border-white/10 text-xs font-mono-tech flex items-center justify-between text-white">
                <span className="font-bold">{personal.name}</span>
                <span className="text-[#E50920]">INDEPENDENT SECURITY</span>
              </div>
            </div>
          </div>
        </div>

        {/* How I Work: 5 Pillars */}
        <div className="space-y-8 pt-8">
          <div className="border-b border-[#29292D] pb-4 space-y-1">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
              OPERATIONAL PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight">
              HOW I WORK: THE 5 ASSESSMENT PILLARS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howIWork.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920]/50 transition-colors space-y-3"
              >
                <div className="font-display font-black text-3xl text-[#E50920] leading-none">
                  {pillar.number}
                </div>
                <h3 className="font-heading font-bold text-base text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}

            {/* Principles Quote Card in Grid */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-[#780916] to-[#250307] border border-[#E50920]/40 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono-tech text-[#FFCCD1] uppercase">PHILOSOPHY</span>
                <p className="text-sm font-heading font-bold text-white italic leading-relaxed">
                  &ldquo;{principlesQuote.quote}&rdquo;
                </p>
              </div>
              <div className="pt-2 border-t border-white/15 text-xs font-mono-tech text-[#FFCCD1]">
                — {principlesQuote.author}
              </div>
            </div>
          </div>
        </div>

        {/* Background & Continuous Development */}
        <div className="space-y-8 pt-8">
          <div className="border-b border-[#29292D] pb-4 space-y-1">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
              CONTINUOUS LEARNING &amp; RESEARCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight">
              STANDARDS &amp; TECHNICAL FOCUS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningAndBackground.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tech text-[#E50920] uppercase font-bold">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono-tech text-[#707078]">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-heading font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono-tech text-[#A1A1AA]">
                    {item.organization}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-[#1E1E22] space-y-1.5">
                  <span className="text-[10px] font-mono-tech uppercase text-[#707078]">
                    KEY FOCUS AREAS:
                  </span>
                  <ul className="space-y-1">
                    {item.highlights.map((hl, i) => (
                      <li key={i} className="text-xs text-[#F5F5F5] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50920]" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
