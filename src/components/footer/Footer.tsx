import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioConfig } from '../../context/PortfolioConfigContext';
import { PORTFOLIO_CONFIG } from '../../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck, Calendar } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config } = usePortfolioConfig();
  const { personal } = PORTFOLIO_CONFIG;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] border-t border-[#29292D] pt-16 pb-12 text-[#A1A1AA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand & Descriptor (md:col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              className="text-white font-heading font-black text-2xl tracking-tight uppercase flex items-center gap-2 hover:text-[#FF263F] transition-colors"
            >
              <span className="text-[#E50920]">/</span>
              <span>{personal.brandWordmark}</span>
            </Link>

            <div className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider">
              {personal.brandDescriptor}
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-sm leading-relaxed">
              Focused on proactive vulnerability discovery, evidence-based reporting, and actionable engineering remediation for modern web software.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#707078] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#E50920] shrink-0" />
              <span>{personal.authorizedTestingNotice}</span>
            </div>
          </div>

          {/* Quick Nav Links (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
              PAGES &amp; SECTIONS
            </div>
            <div className="flex flex-col space-y-2 text-xs font-mono-tech">
              <Link to="/" className="hover:text-white transition-colors">
                // HOME
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                // 01 ABOUT &amp; BACKGROUND
              </Link>
              <Link to="/services" className="hover:text-white transition-colors">
                // 02 SECURITY SERVICES
              </Link>
              <Link to="/projects" className="hover:text-white transition-colors">
                // 03 SELECTED PROJECTS
              </Link>
              <Link to="/skills" className="hover:text-white transition-colors">
                // 04 TECHNICAL STACK
              </Link>
              <Link to="/methodology" className="hover:text-white transition-colors">
                // 05 METHODOLOGY
              </Link>
              <Link to="/research" className="hover:text-white transition-colors">
                // 06 RESEARCH &amp; BLOG
              </Link>
              <Link to="/book" className="hover:text-white transition-colors text-[#FF263F]">
                // 07 BOOK SCOPING CALL
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                // 08 CONTACT &amp; INTAKE
              </Link>
            </div>
          </div>

          {/* Core Services Links (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
              SERVICES
            </div>
            <div className="flex flex-col space-y-2 text-xs font-mono-tech">
              {PORTFOLIO_CONFIG.services.slice(0, 4).map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className="hover:text-white transition-colors truncate"
                  title={s.title}
                >
                  {s.title}
                </Link>
              ))}
              <Link to="/services" className="text-[#E50920] hover:underline pt-1">
                View all 6 services →
              </Link>
            </div>
          </div>

          {/* Social Profiles & Direct (md:col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
              VERIFIED CHANNELS
            </div>

            <div className="flex flex-col space-y-2 text-xs font-mono-tech">
              {config.email && (
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E50920]" />
                  <span className="truncate">{config.email}</span>
                </a>
              )}
              {config.githubUrl && (
                <a
                  href={config.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#E50920]" />
                  <span>GitHub Profile</span>
                </a>
              )}
              {config.linkedinUrl && (
                <a
                  href={config.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#E50920]" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              <Link
                to="/book"
                className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E50920]" />
                <span>Schedule Consultation</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech text-white bg-[#121214] border border-[#29292D] hover:border-[#E50920] rounded transition-colors group mt-2"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#E50920] transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom subtle accent line & copyright */}
        <div className="pt-8 border-t border-[#1E1E22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#707078]">
          <div className="flex flex-wrap items-center gap-3">
            <span>&copy; {currentYear} {personal.name}. All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('mzk_open_verification'))}
              className="text-[#A1A1AA] hover:text-cyan-400 underline transition-colors cursor-pointer"
              title="Test the Hacker Challenge riddle entry screen"
            >
              Test Hacker Challenge ⌨️
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300/80">AUTHENTICATED // LEVEL 01 CLEARED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
