import React, { useState } from 'react';
import { PORTFOLIO_CONFIG, SkillCategory } from '../data/portfolioData';
import { Terminal, Shield, Wrench, FileCode, CheckCircle2, Info } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills } = PORTFOLIO_CONFIG;
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    description: string;
    category: string;
    type: string;
  } | null>(null);

  return (
    <section id="skills" className="py-20 bg-[#070707] border-t border-[#29292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-2">
          <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
            04 / TECHNICAL STACK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Tools are only as effective as the methodology behind them.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-1">
            Proficiencies organized by operational domain. Focus is placed on manual verification, deep protocol understanding, and reproducible risk evaluation rather than automated scanner reliance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat: SkillCategory) => (
            <div
              key={cat.categoryCode}
              className="p-6 rounded-xl bg-[#0A0E17]/90 border border-[#1B2738] hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-950/40 transition-all duration-300 flex flex-col justify-between space-y-5 cyber-panel"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#162030] pb-3">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    {cat.title}
                  </h3>
                  <span className="font-mono-tech text-[10px] text-cyan-400 uppercase font-semibold">
                    {cat.categoryCode}
                  </span>
                </div>

                {/* Skill Chips List */}
                <div className="space-y-2.5">
                  {cat.skills.map((s: { name: string; description: string; type: string }) => (
                    <div
                      key={s.name}
                      onClick={() =>
                        setSelectedSkill({
                          name: s.name,
                          description: s.description,
                          category: cat.title,
                          type: s.type,
                        })
                      }
                      className="group cursor-pointer p-2.5 rounded-lg bg-[#0E1524] border border-[#1A263A] hover:border-cyan-400/60 hover:bg-[#121D32] transition-all flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                          <span>{s.name}</span>
                        </div>
                        <div className="text-[11px] text-[#A1A1AA] leading-snug">
                          {s.description}
                        </div>
                      </div>

                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-[#131D2E] text-cyan-300/80 border border-cyan-500/20 shrink-0">
                        {s.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Note */}
              <div className="pt-2 text-[10px] font-mono-tech text-[#707078] flex items-center justify-between border-t border-[#141E2E]">
                <span>VERIFIABLE PRACTICAL USE</span>
                <span>NO FABRICATED RATINGS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Quick Detail Modal / Callout */}
        {selectedSkill && (
          <div className="mt-8 p-4 rounded-lg bg-[#121214] border border-[#E50920]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#E50920] shrink-0" />
              <div>
                <span className="text-xs font-heading font-bold text-white">
                  {selectedSkill.name}
                </span>{' '}
                <span className="text-xs text-[#707078]">
                  ({selectedSkill.category} · {selectedSkill.type})
                </span>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  {selectedSkill.description}. Applied in authorized penetration tests for manual risk validation and defensive hardening.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="px-3 py-1 text-xs font-mono-tech text-[#A1A1AA] hover:text-white border border-[#29292D] rounded shrink-0"
            >
              DISMISS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
