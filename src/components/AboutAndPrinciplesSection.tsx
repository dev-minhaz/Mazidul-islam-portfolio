import React from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import {
  Target,
  Search,
  Cpu,
  CheckCheck,
  FileText,
  ShieldCheck,
  BookOpen,
  Terminal,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface AboutAndPrinciplesSectionProps {
  onContactClick?: () => void;
}

export const AboutAndPrinciplesSection: React.FC<AboutAndPrinciplesSectionProps> = ({
  onContactClick,
}) => {
  const { learningAndBackground, methodology, principlesQuote } = PORTFOLIO_CONFIG;

  const getStepIcon = (icon: string) => {
    switch (icon) {
      case 'Target':
        return <Target className="w-4 h-4 text-[#FF263F]" />;
      case 'Search':
        return <Search className="w-4 h-4 text-[#FF263F]" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#FF263F]" />;
      case 'CheckCheck':
        return <CheckCheck className="w-4 h-4 text-[#FF263F]" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-[#FF263F]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#FF263F]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#FF263F]" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-[#070707] border-t border-[#29292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & Intro */}
        <div className="mb-12 max-w-3xl space-y-2">
          <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
            01 / ABOUT &amp; METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Security begins with understanding how systems fail.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-2">
            I approach security from an authorized adversarial perspective—auditing application logic,
            identity boundaries, and APIs to uncover actionable risks before malicious actors exploit them.
          </p>
        </div>

        {/* 3-Column Editorial Grid (matching reference image middle section!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Education, Learning & Technical Focus (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-6">
            <div className="space-y-6">
              <div className="border-b border-[#29292D] pb-3">
                <span className="text-[11px] font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                  06 / BACKGROUND
                </span>
                <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mt-1">
                  LEARNING &amp; SKILLS
                </h3>
              </div>

              {/* Verified background items */}
              <div className="space-y-4">
                <div className="text-xs font-mono-tech uppercase text-[#E50920] font-bold tracking-wider">
                  CONTINUOUS FOCUS
                </div>
                {learningAndBackground.map((item, idx) => (
                  <div key={idx} className="space-y-1 pb-3 border-b border-[#1E1E22] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-bold text-white">
                        {item.title}
                      </span>
                      <span className="font-mono-tech text-[10px] text-[#E50920]">
                        {item.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#707078]">
                      {item.organization}
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed pt-0.5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Capability Chips */}
            <div className="pt-4 border-t border-[#1E1E22] space-y-2">
              <div className="text-[10px] font-mono-tech uppercase text-[#707078] tracking-wider">
                CORE CAPABILITY DOMAINS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'OWASP TOP 10',
                  'BURP SUITE PRO',
                  'API SECURITY',
                  'IDOR / BOLA',
                  'CVSS 3.1',
                  'KALI LINUX',
                  'PYTHON',
                  'BASH',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-tech px-2.5 py-1 bg-[#121214] text-[#A1A1AA] border border-[#29292D] rounded hover:border-[#E50920]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Work Process / Methodology (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-[#29292D] pb-3">
                <span className="text-[11px] font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                  05 / WORK PROCESS
                </span>
                <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mt-1">
                  WORK PROCESS
                </h3>
              </div>

              {/* Numbered Connected Steps Timeline */}
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#29292D]">
                {methodology.map((step) => (
                  <div key={step.step} className="relative flex items-start gap-3 group">
                    {/* Circular marker with line icon */}
                    <div className="absolute -left-[30px] top-0 w-7 h-7 rounded-full bg-[#121214] border border-[#29292D] group-hover:border-[#E50920] group-hover:bg-[#1A1113] flex items-center justify-center transition-all duration-200 z-10 shrink-0">
                      {getStepIcon(step.icon)}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech font-bold text-xs text-[#E50920]">
                          {step.step}
                        </span>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-white group-hover:text-[#FF263F] transition-colors uppercase tracking-wider">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E1E22] text-[11px] font-mono-tech text-[#707078]">
              Methodology aligned with NIST SP 800-115 &amp; OWASP WSTG v4.2
            </div>
          </div>

          {/* Column 3: Crimson Quote & Principles Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 rounded-xl bg-gradient-to-b from-[#780916] via-[#4A060E] to-[#250307] border border-[#E50920]/40 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-left">
            {/* Ambient Background Accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF263F]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Quote Mark (matching reference image) */}
            <div className="space-y-4">
              <div className="text-6xl sm:text-7xl font-display font-black text-[#FF263F] leading-none select-none">
                &ldquo;
              </div>

              <blockquote className="text-lg sm:text-xl font-heading font-bold text-white leading-relaxed tracking-tight">
                {principlesQuote.quote}
              </blockquote>
            </div>

            {/* Bottom Signature & Brand Commitment (matching reference) */}
            <div className="pt-8 space-y-4">
              <div>
                {/* Handwritten signature in cursive */}
                <div className="font-script text-3xl sm:text-4xl text-[#F5F5F5] tracking-wide transform -rotate-2">
                  Mazidul Islam Khan
                </div>
                <div className="text-xs font-mono-tech uppercase tracking-widest text-[#FF99A4] mt-1">
                  {principlesQuote.author} · {principlesQuote.role}
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/15" />

              <div className="space-y-2">
                <div className="text-xs font-mono-tech uppercase tracking-wider text-white font-bold">
                  LET&apos;S SECURE YOUR PLATFORM.
                </div>
                <p className="text-xs text-[#FFCCD1] leading-relaxed">
                  {principlesQuote.tagline}
                </p>

                <a
                  href="#contact"
                  onClick={onContactClick}
                  className="inline-flex items-center gap-2 pt-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-white hover:text-[#FFCCD1] transition-colors group"
                >
                  <span>START A CONVERSATION</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
