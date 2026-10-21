import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import { Terminal, Shield, Wrench, FileCode, Info, ArrowRight } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const { skills } = PORTFOLIO_CONFIG;
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    description: string;
    category: string;
    type: string;
    practicalUsage: string;
  } | null>(null);

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Technical Stack &amp; Security Toolkit | Mazidul Islam Khan"
        description="Comprehensive technical proficiencies, specialized web security tooling, Burp Suite, Kali Linux, and reconnaissance frameworks."
        canonicalPath="/skills"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Technical Stack & Toolkit' }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#29292D]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
              04 / TECHNICAL TOOLKIT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
              TOOLS ARE ONLY AS EFFECTIVE AS THE METHODOLOGY BEHIND THEM.
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] pt-1">
              Proficiencies organized by operational domain. Focus is placed on manual verification, deep protocol understanding, and reproducible risk evaluation rather than automated scanner reliance.
            </p>
          </div>

          <Link
            to="/methodology"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#121214] hover:bg-[#1A1A1E] text-white border border-[#29292D] text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
          >
            <span>VIEW TESTING METHODOLOGY</span>
            <ArrowRight className="w-4 h-4 text-[#E50920]" />
          </Link>
        </div>

        {/* Selected Skill Detail Inspector Callout */}
        {selectedSkill && (
          <div className="p-5 rounded-xl bg-[#121214] border border-[#E50920] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-150 shadow-xl shadow-[#E50920]/10">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1A1113] border border-[#E50920]/40 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-[#FF263F]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech">
                  <span className="text-white font-bold">{selectedSkill.name}</span>
                  <span className="text-[#E50920]">[{selectedSkill.type}]</span>
                  <span className="text-[#707078]">· {selectedSkill.category}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F5F5] font-medium">
                  {selectedSkill.description}
                </p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  <strong className="text-[#FFCCD1]">Practical Application:</strong> {selectedSkill.practicalUsage}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="px-4 py-1.5 text-xs font-mono-tech text-[#A1A1AA] hover:text-white border border-[#29292D] rounded shrink-0 self-end sm:self-center"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* 5 Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat) => (
            <div
              key={cat.categoryCode}
              className="p-6 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#707078] transition-colors flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E1E22] pb-3">
                  <div>
                    <span className="font-mono-tech text-[10px] text-[#E50920] uppercase font-bold">
                      {cat.categoryCode}
                    </span>
                    <h2 className="font-heading font-bold text-lg text-white mt-0.5">
                      {cat.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-[#707078] leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <div
                      key={s.name}
                      onClick={() =>
                        setSelectedSkill({
                          name: s.name,
                          description: s.description,
                          category: cat.title,
                          type: s.type,
                          practicalUsage: s.practicalUsage,
                        })
                      }
                      className="group cursor-pointer p-3 rounded-lg bg-[#121214] border border-[#1E1E22] hover:border-[#E50920]/50 hover:bg-[#161214] transition-all flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-heading font-semibold text-white group-hover:text-[#FF263F] transition-colors">
                          {s.name}
                        </div>
                        <div className="text-[11px] text-[#A1A1AA] leading-snug">
                          {s.description}
                        </div>
                      </div>

                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-[#1A1A1D] text-[#707078] border border-[#29292D] shrink-0 mt-0.5">
                        {s.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono-tech text-[#707078] flex items-center justify-between border-t border-[#1E1E22]">
                <span>CLICK TO INSPECT USAGE</span>
                <span>NO FABRICATED RATINGS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
