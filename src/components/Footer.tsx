import React from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  customEmail?: string;
  customGithub?: string;
  customLinkedin?: string;
}

export const Footer: React.FC<FooterProps> = ({
  customEmail,
  customGithub,
  customLinkedin,
}) => {
  const { personal } = PORTFOLIO_CONFIG;
  const currentYear = new Date().getFullYear();
  const activeEmail = customEmail || personal.email;
  const activeGithub = customGithub || personal.githubUrl;
  const activeLinkedin = customLinkedin || personal.linkedinUrl;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] border-t border-[#29292D] pt-16 pb-12 text-[#A1A1AA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand & Descriptor (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#hero"
              className="text-white font-heading font-black text-2xl tracking-tight uppercase flex items-center gap-2 hover:text-[#FF263F] transition-colors"
            >
              <span className="text-[#E50920]">/</span>
              <span>{personal.brandWordmark}</span>
            </a>

            <div className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider">
              {personal.brandDescriptor}
            </div>

            <p className="text-sm text-[#A1A1AA] max-w-sm leading-relaxed">
              Focused on finding weaknesses, reducing risk, and helping organizations build more secure digital experiences through authorized, methodical security testing.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#707078] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#E50920]" />
              <span>{personal.authorizedTestingNotice}</span>
            </div>
          </div>

          {/* Quick Nav Links (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
              NAVIGATION
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech">
              <a href="#about" className="hover:text-white transition-colors py-1">
                // 01 ABOUT
              </a>
              <a href="#services" className="hover:text-white transition-colors py-1">
                // 02 SERVICES
              </a>
              <a href="#projects" className="hover:text-white transition-colors py-1">
                // 03 PROJECTS
              </a>
              <a href="#skills" className="hover:text-white transition-colors py-1">
                // 04 SKILLS
              </a>
              <a href="#about" className="hover:text-white transition-colors py-1">
                // 05 METHODOLOGY
              </a>
              <a href="#contact" className="hover:text-white transition-colors py-1">
                // 07 CONTACT
              </a>
            </div>
          </div>

          {/* Social Profiles & Direct (md:col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
              VERIFIED CHANNELS
            </div>

            <div className="flex flex-col space-y-2 text-xs font-mono-tech">
              {activeEmail && (
                <a
                  href={`mailto:${activeEmail}`}
                  className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E50920]" />
                  <span className="truncate">{activeEmail}</span>
                </a>
              )}
              {activeGithub && (
                <a
                  href={activeGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#E50920]" />
                  <span>GitHub Profile</span>
                </a>
              )}
              {activeLinkedin && (
                <a
                  href={activeLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#E50920]" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
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
          <div>
            &copy; {currentYear} {personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50920]" />
            <span>RESPONSIBLE DISCLOSURE &amp; ETHICAL TESTING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
