import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import { ProjectVisual } from '../components/ProjectVisual';
import { ArrowUpRight, Filter, ShieldCheck, ArrowRight } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects } = PORTFOLIO_CONFIG;
  const [activeFilter, setActiveFilter] = useState<string>('All');

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

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Security Projects &amp; Case Studies | Mazidul Islam Khan"
        description="Explore documented penetration test case studies, API security audits, and research lab projects conducted by Mazidul Islam Khan."
        canonicalPath="/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Projects & Case Studies' }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#29292D]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
              03 / SELECTED WORK
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
              PRACTICAL SECURITY. DOCUMENTED FINDINGS.
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] pt-1">
              Methodical security assessments, API audits, and educational security research documenting reproducible vulnerabilities and defense architectures.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-lg shadow-[#E50920]/20"
          >
            <span>DISCUSS AN ASSESSMENT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <span className="text-xs font-mono-tech text-[#707078] mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E50920]" />
            <span>CATEGORY:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded transition-all whitespace-nowrap shrink-0 border ${
                activeFilter === cat
                  ? 'bg-[#E50920] text-white border-[#E50920] font-semibold shadow-md shadow-[#E50920]/20'
                  : 'bg-[#0D0D0F] text-[#A1A1AA] hover:text-white border-[#29292D] hover:border-[#707078]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#E50920]/10"
            >
              <div className="relative overflow-hidden">
                <ProjectVisual type={project.visualType} title={project.title} />
                <div className="absolute top-3 right-3 text-[10px] font-mono-tech px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[#A1A1AA] border border-white/10 uppercase tracking-wider">
                  {project.badge}
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-black text-3xl sm:text-4xl text-[#E50920] leading-none shrink-0 group-hover:scale-110 transition-transform">
                      {project.number}
                    </span>
                    <div>
                      <h2 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#FF263F] transition-colors leading-snug">
                        {project.title}
                      </h2>
                      <div className="text-[11px] font-mono-tech uppercase text-[#707078] tracking-wider mt-0.5">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed pt-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1E1E22] flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#707078] group-hover:text-[#F5F5F5] transition-colors">
                    VIEW CASE STUDY
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#121214] border border-[#29292D] group-hover:border-[#E50920] group-hover:bg-[#E50920] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
