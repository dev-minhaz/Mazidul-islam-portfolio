import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RESEARCH_ARTICLES } from '../data/researchData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import { BookOpen, ArrowRight, Filter, Tag } from 'lucide-react';

export const ResearchPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'API Security',
    'Web Exploitation',
    'Defense in Depth',
  ];

  const filtered = RESEARCH_ARTICLES.filter((art) => {
    if (activeCategory === 'All') return true;
    return art.category === activeCategory;
  });

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Security Research &amp; Technical Advisories | Mazidul Islam Khan"
        description="Technical research articles, vulnerability deep-dives, and practical remediation patterns authored by Mazidul Islam Khan."
        canonicalPath="/research"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Security Research & Blog' }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#29292D]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
              06 / RESEARCH &amp; BLOG
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
              TECHNICAL RESEARCH &amp; ADVISORIES.
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] pt-1">
              In-depth analysis of modern application vulnerabilities, API authorization flaws, and defensive architecture patterns.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-lg shadow-[#E50920]/20"
          >
            <span>SUBMIT INQUIRY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <span className="text-xs font-mono-tech text-[#707078] mr-2 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E50920]" />
            <span>TOPIC:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono-tech uppercase tracking-wider rounded transition-all whitespace-nowrap shrink-0 border ${
                activeCategory === cat
                  ? 'bg-[#E50920] text-white border-[#E50920] font-semibold shadow-md shadow-[#E50920]/20'
                  : 'bg-[#0D0D0F] text-[#A1A1AA] hover:text-white border-[#29292D] hover:border-[#707078]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              to={`/research/${article.slug}`}
              className="p-6 sm:p-8 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-all duration-300 block group shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E1E22] pb-4">
                <div className="flex items-center gap-3 text-xs font-mono-tech">
                  <span className="text-[#E50920] font-bold uppercase">{article.category}</span>
                  <span className="text-[#707078]">·</span>
                  <span className="text-[#A1A1AA]">{article.date}</span>
                  <span className="text-[#707078]">·</span>
                  <span className="text-[#707078]">{article.readTime}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#121214] text-[#707078] border border-[#1E1E22]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[#E50920] group-hover:underline font-bold">
                  READ FULL RESEARCH ARTICLE
                </span>
                <div className="w-8 h-8 rounded-full bg-[#121214] border border-[#29292D] group-hover:border-[#E50920] group-hover:bg-[#E50920] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-white transition-colors" />
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
