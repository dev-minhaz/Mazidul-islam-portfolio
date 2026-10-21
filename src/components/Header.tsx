import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, ShieldCheck, Settings2 } from 'lucide-react';

interface HeaderProps {
  onOpenConfig?: () => void;
  availabilityText?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfig, availabilityText }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070707]/90 backdrop-blur-md border-b border-[#29292D] py-3.5 shadow-2xl'
            : 'bg-transparent border-b border-white/[0.05] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single line, crisp display face) */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-white font-heading font-bold text-lg sm:text-xl tracking-tight whitespace-nowrap shrink-0 hover:text-[#FF263F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
          >
            <span className="text-[#E50920] font-black tracking-wider">/</span>
            <span>{PORTFOLIO_CONFIG.personal.brandWordmark}</span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#A1A1AA]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#E50920] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E50920]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenConfig && (
              <button
                type="button"
                onClick={onOpenConfig}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-mono-tech text-[#707078] hover:text-white bg-[#121214] border border-[#29292D] rounded-md transition-colors hover:border-[#E50920]/50"
                title="Configure profile details, email & availability"
              >
                <Settings2 className="w-3.5 h-3.5 text-[#E50920]" />
                <span>CONFIG</span>
              </button>
            )}

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50920] hover:bg-[#FF263F] rounded transition-all duration-200 shadow-lg shadow-[#E50920]/20 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[#E50920]"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A1A1AA] hover:text-white rounded-lg border border-[#29292D] bg-[#0D0D0F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 border-b border-[#29292D] animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="text-xs font-mono-tech text-[#707078] uppercase tracking-wider pb-2 border-b border-[#1E1E22]">
              {PORTFOLIO_CONFIG.personal.brandDescriptor}
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-semibold text-white hover:text-[#E50920] transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#1E1E22]">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A1A1AA]">
              <ShieldCheck className="w-4 h-4 text-[#E50920]" />
              <span>{availabilityText || PORTFOLIO_CONFIG.personal.availability}</span>
            </div>
            <div className="flex gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#E50920] rounded hover:bg-[#FF263F] transition-colors"
              >
                REQUEST ASSESSMENT
              </a>
              {onOpenConfig && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConfig();
                  }}
                  className="px-4 py-3 bg-[#121214] border border-[#29292D] rounded text-[#A1A1AA] hover:text-white"
                  title="Configure"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
