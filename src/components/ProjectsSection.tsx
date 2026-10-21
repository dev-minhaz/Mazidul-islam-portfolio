import React, { useState } from 'react';
import { PORTFOLIO_CONFIG, ProjectItem } from '../data/portfolioData';
import { ArrowRight, ArrowUpRight, ShieldCheck, Filter } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);
  const { projects } = PORTFOLIO_CONFIG;

  const categories = [
    'All',
    'Application Security',
    'API Security',
    'Security Assessment',
    'Research & Learning',
    'Technical Projects',
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="py-20 bg-[#070707] border-t border-[#29292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (matching reference layout: "SELECTED PROJECTS" on left, "VIEW ALL PROJECTS →" on right) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#29292D]">
          <div className="space-y-1">
            <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider flex items-center gap-2">
              <span>03 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white">
              SELECTED PROJECTS
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              Practical security assessments, API audits, and documented findings with reproducible evidence.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#F5F5F5] hover:text-[#E50920] transition-colors py-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E50920]"
            >
              <span>{showAll ? 'SHOW FEATURED (3)' : 'VIEW ALL PROJECTS (6)'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E50920]" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
          <span className="text-xs font-mono-tech text-[#707078] mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-[#E50920]" />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono-tech tracking-wider uppercase rounded transition-all whitespace-nowrap shrink-0 border ${
                activeFilter === cat
                  ? 'bg-[#E50920] text-white border-[#E50920] font-semibold shadow-md shadow-[#E50920]/20'
                  : 'bg-[#0D0D0F] text-[#A1A1AA] hover:text-white border-[#29292D] hover:border-[#707078]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (matching reference 3-column prominent cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-xl bg-[#0A0E17]/95 border border-[#1B2738] hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cyber-panel"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
            >
              {/* Graphical Project Preview */}
              <div className="relative overflow-hidden">
                <ProjectVisual type={project.visualType} title={project.title} />

                {/* Badge overlay */}
                <div className="absolute top-3 right-3 text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#070B12]/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  {project.badge}
                </div>
              </div>

              {/* Card Bottom Meta (matching reference layout: Red Number + Title + Category + Arrow) */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    {/* Index number */}
                    <span className="font-display font-black text-3xl sm:text-4xl text-[#E50920] group-hover:text-cyan-400 leading-none shrink-0 group-hover:scale-110 transition-all">
                      {project.number}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-cyan-200 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <div className="text-[11px] font-mono-tech uppercase text-[#707078] tracking-wider mt-0.5">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed pt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Bottom action row */}
                <div className="pt-3 border-t border-[#162030] flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#707078] group-hover:text-cyan-300 transition-colors">
                    VIEW CASE STUDY
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#101826] border border-[#1E2B3E] group-hover:border-cyan-400 group-hover:bg-cyan-500 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Testing Statement below projects */}
        <div className="mt-12 p-4 rounded-lg bg-[#0D0D0F] border border-[#29292D] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tech text-[#707078]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E50920] shrink-0" />
            <span>
              All project previews utilize sanitized, synthetic evidence to protect client confidentiality and prevent disclosure of sensitive operational targets.
            </span>
          </div>
          <span className="text-[#A1A1AA] shrink-0 uppercase">OWASP WSTG ALIGNED</span>
        </div>
      </div>
    </section>
  );
};
