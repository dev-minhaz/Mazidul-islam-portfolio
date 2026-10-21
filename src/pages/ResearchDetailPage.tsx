import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESEARCH_ARTICLES } from '../data/researchData';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import {
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  Calendar,
  AlertCircle,
  Share2,
} from 'lucide-react';

export const ResearchDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const article = RESEARCH_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <SEOHead
          title="Article Not Found | Mazidul Islam Khan"
          description="The requested research article could not be located."
        />
        <div className="w-16 h-16 rounded-full bg-[#1A1113] border border-[#E50920] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-[#FF263F]" />
        </div>
        <h1 className="text-3xl font-heading font-black text-white uppercase">
          ARTICLE NOT FOUND
        </h1>
        <p className="text-sm text-[#A1A1AA]">
          The research paper you requested does not exist or has been relocated.
        </p>
        <Link
          to="/research"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
        >
          <span>VIEW ALL RESEARCH</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const otherArticles = RESEARCH_ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title={`${article.title} | Security Research | Mazidul Islam Khan`}
        description={article.summary}
        canonicalPath={`/research/${article.slug}`}
        ogType="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Research', href: '/research' },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <div className="space-y-4 pb-8 border-b border-[#29292D]">
          <div className="flex items-center gap-3 text-xs font-mono-tech">
            <span className="text-[#E50920] font-bold uppercase">{article.category}</span>
            <span className="text-[#707078]">·</span>
            <span className="text-[#A1A1AA]">{article.date}</span>
            <span className="text-[#707078]">·</span>
            <span className="text-[#707078]">{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed pt-2">
            {article.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono-tech px-2.5 py-1 rounded bg-[#0D0D0F] border border-[#29292D] text-[#707078]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Byline */}
          <div className="pt-4 flex items-center justify-between border-t border-[#1E1E22]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E50920]">
                <img
                  src={PORTFOLIO_CONFIG.personal.portraitImage}
                  alt={PORTFOLIO_CONFIG.personal.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white">
                  {PORTFOLIO_CONFIG.personal.name}
                </div>
                <div className="text-[10px] font-mono-tech text-[#707078]">
                  Penetration Tester &amp; Security Researcher
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="text-xs font-mono-tech text-[#E50920] hover:underline"
            >
              Discuss Vulnerability →
            </Link>
          </div>
        </div>

        {/* Article Body Content */}
        <article className="space-y-10 text-sm sm:text-base text-[#F5F5F5] leading-relaxed">
          {article.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight pt-4">
                {section.sectionHeading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[#A1A1AA] leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Code Snippet Box */}
              {section.codeSnippet && (
                <div className="my-6 rounded-xl overflow-hidden border border-[#29292D] bg-[#09090B] font-mono-tech text-xs">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#121214] border-b border-[#1E1E22] text-[#707078]">
                    <span>{section.codeSnippet.caption}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyCode(section.codeSnippet!.code, idx)
                      }
                      className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[#F5F5F5] leading-relaxed selection:bg-[#E50920]">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Key Takeaway Callout */}
              {section.keyTakeaway && (
                <div className="p-4 rounded-lg bg-[#121214] border-l-2 border-[#E50920] text-xs sm:text-sm text-[#F5F5F5] space-y-1">
                  <span className="font-mono-tech text-[#E50920] font-bold uppercase block text-xs">
                    ARCHITECTURAL TAKEAWAY:
                  </span>
                  <p className="text-[#A1A1AA]">{section.keyTakeaway}</p>
                </div>
              )}
            </div>
          ))}

          {/* References */}
          {article.references.length > 0 && (
            <div className="pt-8 border-t border-[#29292D] space-y-3">
              <h3 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider font-bold">
                STANDARDS &amp; CITATIONS
              </h3>
              <ul className="space-y-1.5 text-xs font-mono-tech text-[#A1A1AA]">
                {article.references.map((ref, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#E50920]">›</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Other Research Papers */}
        {otherArticles.length > 0 && (
          <div className="pt-10 border-t border-[#29292D] space-y-6">
            <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
              CONTINUE READING
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherArticles.slice(0, 2).map((other) => (
                <Link
                  key={other.slug}
                  to={`/research/${other.slug}`}
                  className="p-5 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-colors group space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#707078]">
                    <span className="text-[#E50920]">{other.category}</span>
                    <span>{other.readTime}</span>
                  </div>
                  <h3 className="text-base font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] line-clamp-2">
                    {other.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
