import React from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { RESEARCH_ARTICLES } from '../data/researchData';
import { usePortfolioConfig } from '../context/PortfolioConfigContext';
import { HeroSection } from '../components/HeroSection';
import { ProjectVisual } from '../components/ProjectVisual';
import { ScopeMandate } from '../components/common/ScopeMandate';
import { SEOHead } from '../components/common/SEOHead';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldAlert,
  Network,
  SearchCheck,
  KeyRound,
  SlidersHorizontal,
  FileCheck,
  Target,
  Search,
  Cpu,
  CheckCheck,
  FileText,
  ShieldCheck,
  BookOpen,
  Calendar,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { config } = usePortfolioConfig();
  const { services, projects, methodology, learningAndBackground, principlesQuote } = PORTFOLIO_CONFIG;

  const featuredProjects = projects.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const featuredArticles = RESEARCH_ARTICLES.slice(0, 2);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#E50920]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#E50920]" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-[#E50920]" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-[#E50920]" />;
    }
  };

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
      default:
        return <ShieldCheck className="w-4 h-4 text-[#FF263F]" />;
    }
  };

  return (
    <div className="space-y-0">
      <SEOHead
        title="Mazidul Islam Khan | Penetration Tester &amp; Cybersecurity Specialist"
        description="Professional penetration tester and application security specialist. Methodical, authorized security testing for international businesses, SaaS applications, and modern APIs."
        canonicalPath="/"
      />

      {/* Hero Section */}
      <HeroSection
        customAvailability={config.availability}
        onExploreWork={() => {
          document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onContactClick={() => {
          // Handled via Router Link or scroll
        }}
      />

      {/* Section 01: Featured Projects (Reference 3-Column Layout) */}
      <section id="featured-projects" className="py-20 bg-[#070707] border-t border-[#29292D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#29292D]">
            <div className="space-y-1">
              <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
                03 / SELECTED WORK
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white">
                SELECTED PROJECTS
              </h2>
              <p className="text-sm text-[#A1A1AA] max-w-xl">
                Practical application security assessments, API audits, and documented vulnerability findings with reproducible evidence.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#F5F5F5] hover:text-[#E50920] transition-colors py-2 group"
            >
              <span>VIEW ALL {projects.length} PROJECTS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E50920]" />
            </Link>
          </div>

          {/* 3 Prominent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group rounded-xl bg-[#0A0E17]/95 border border-[#1B2738] hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cyber-panel"
              >
                <div className="relative overflow-hidden">
                  <ProjectVisual type={project.visualType} title={project.title} />
                  <div className="absolute top-3 right-3 text-[10px] font-mono-tech px-2.5 py-1 rounded bg-[#070B12]/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    {project.badge}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
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

                  <div className="pt-3 border-t border-[#162030] flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[#707078] group-hover:text-cyan-300 transition-colors">
                      VIEW CASE STUDY
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#101826] border border-[#1E2B3E] group-hover:border-cyan-400 group-hover:bg-cyan-500 flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 02: 3-Column Editorial Information Layout (Reference Mid Section) */}
      <section className="py-20 bg-[#070707] border-t border-[#29292D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl space-y-2">
            <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
              01 / ABOUT &amp; METHODOLOGY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
              Security begins with understanding how systems fail.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-1">
              Methodical verification across identity boundaries, APIs, and business logic to uncover risk before adversaries can exploit it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Col 1: Background & Learning (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-6 cyber-panel">
              <div className="space-y-6">
                <div className="border-b border-[#29292D] pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                      06 / BACKGROUND
                    </span>
                    <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mt-1">
                      LEARNING &amp; LABS
                    </h3>
                  </div>
                  <Link to="/about" className="text-xs font-mono-tech text-[#E50920] hover:underline">
                    View bio →
                  </Link>
                </div>

                <div className="space-y-4">
                  {learningAndBackground.slice(0, 3).map((item, idx) => (
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

              <div className="pt-4 border-t border-[#1E1E22]">
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-white hover:text-[#E50920] transition-colors"
                >
                  <span>Explore full technical toolkit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Col 2: Work Process (lg:col-span-4) */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] flex flex-col justify-between cyber-panel">
              <div className="space-y-6">
                <div className="border-b border-[#29292D] pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                      05 / WORK PROCESS
                    </span>
                    <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight mt-1">
                      WORK PROCESS
                    </h3>
                  </div>
                  <Link to="/methodology" className="text-xs font-mono-tech text-[#E50920] hover:underline">
                    Full guide →
                  </Link>
                </div>

                <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#29292D]">
                  {methodology.slice(0, 5).map((step) => (
                    <div key={step.step} className="relative flex items-start gap-3 group">
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
                        <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                          {step.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E1E22] text-[11px] font-mono-tech text-[#707078]">
                NIST SP 800-115 &amp; OWASP WSTG v4.2 aligned
              </div>
            </div>

            {/* Col 3: Crimson Quote & Principles Panel (lg:col-span-4) */}
            <div className="lg:col-span-4 rounded-xl bg-gradient-to-b from-[#780916] via-[#4A060E] to-[#250307] border border-[#E50920]/40 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-left">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF263F]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4">
                <div className="text-6xl sm:text-7xl font-display font-black text-[#FF263F] leading-none select-none">
                  &ldquo;
                </div>
                <blockquote className="text-lg sm:text-xl font-heading font-bold text-white leading-relaxed tracking-tight">
                  {principlesQuote.quote}
                </blockquote>
              </div>

              <div className="pt-8 space-y-4">
                <div>
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
                  <div className="flex gap-2 pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-white hover:text-[#FFCCD1] transition-colors"
                    >
                      <span>START INQUIRY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Core Services Overview */}
      <section className="py-20 bg-[#070707] border-t border-[#29292D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#29292D]">
            <div className="space-y-1">
              <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
                02 / SERVICES
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
                Identify risk before attackers do.
              </h2>
              <p className="text-sm text-[#A1A1AA] max-w-xl">
                Authorized penetration testing designed to uncover vulnerabilities in modern web applications, APIs, and identity workflows.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#F5F5F5] hover:text-[#E50920] transition-colors py-2 group"
            >
              <span>EXPLORE ALL SERVICES</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E50920]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-all duration-300 flex flex-col justify-between group shadow-lg cyber-panel"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-3xl text-[#E50920] leading-none group-hover:scale-110 transition-transform">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#121214] border border-[#29292D] group-hover:border-[#E50920]/40 flex items-center justify-center transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono-tech uppercase text-[#707078] tracking-wider">
                      {service.category}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors leading-snug mt-1">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#1E1E22] flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#E50920] hover:text-white transition-colors"
                  >
                    <span>SCOPE &amp; SPECS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-mono-tech text-[#707078] hover:text-white transition-colors"
                  >
                    Inquire →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: Latest Research Whitepapers */}
      <section className="py-20 bg-[#070707] border-t border-[#29292D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#29292D]">
            <div className="space-y-1">
              <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
                06 / RESEARCH &amp; BLOG
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
                TECHNICAL ADVISORIES &amp; RESEARCH
              </h2>
              <p className="text-sm text-[#A1A1AA] max-w-xl">
                Deep dives into authorization bypasses, API security design flaws, and practical remediation patterns.
              </p>
            </div>

            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#F5F5F5] hover:text-[#E50920] transition-colors py-2 group"
            >
              <span>VIEW ALL RESEARCH</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E50920]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/research/${article.slug}`}
                className="p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-all duration-300 flex flex-col justify-between group shadow-xl cyber-panel"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#707078]">
                    <span className="text-[#E50920] font-semibold">{article.category}</span>
                    <span>{article.date} · {article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1E1E22] flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#E50920] group-hover:underline">READ WHITE PAPER</span>
                  <ArrowRight className="w-4 h-4 text-[#707078] group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          {/* Scope Mandate */}
          <div className="pt-12">
            <ScopeMandate />
          </div>
        </div>
      </section>
    </div>
  );
};
