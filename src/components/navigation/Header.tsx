import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { usePortfolioConfig } from '../../context/PortfolioConfigContext';
import { PORTFOLIO_CONFIG } from '../../data/portfolioData';
import { Menu, X, ArrowUpRight, Settings2, ShieldCheck, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const { config, openConfig } = usePortfolioConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Methodology', to: '/methodology' },
    { label: 'Skills', to: '/skills' },
    { label: 'Research', to: '/research' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070707]/90 backdrop-blur-md border-b border-[#29292D] py-3 shadow-2xl'
            : 'bg-[#070707]/60 backdrop-blur-sm border-b border-white/[0.05] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-white font-heading font-black text-lg sm:text-xl tracking-tight whitespace-nowrap shrink-0 hover:text-[#FF263F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
          >
            <span className="text-[#E50920] font-black tracking-wider">/</span>
            <span>{PORTFOLIO_CONFIG.personal.brandWordmark}</span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-mono-tech uppercase tracking-wider text-[#A1A1AA]">
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-white ${
                    isActive
                      ? 'text-white font-bold after:w-full after:h-[2px] after:bg-[#E50920] after:absolute after:bottom-0 after:left-0'
                      : 'hover:after:w-full after:w-0 after:h-[2px] after:bg-[#E50920] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link
              to="/book"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono-tech text-[#A1A1AA] hover:text-white bg-[#121214] border border-[#29292D] hover:border-[#E50920]/50 rounded transition-colors whitespace-nowrap"
              title="Schedule scoping call"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E50920]" />
              <span className="hidden md:inline">BOOK CALL</span>
            </Link>

            <button
              type="button"
              onClick={openConfig}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-2 text-xs font-mono-tech text-[#707078] hover:text-white bg-[#121214] border border-[#29292D] rounded transition-colors hover:border-[#E50920]/50"
              title="Configure personal channels & status"
            >
              <Settings2 className="w-3.5 h-3.5 text-[#E50920]" />
              <span>CONFIG</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50920] hover:bg-[#FF263F] rounded transition-all duration-200 shadow-lg shadow-[#E50920]/20 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A1A1AA] hover:text-white rounded-lg border border-[#29292D] bg-[#0D0D0F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
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
        <div className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 border-b border-[#29292D] animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-xs font-mono-tech text-[#707078] uppercase tracking-wider pb-2 border-b border-[#1E1E22]">
              {PORTFOLIO_CONFIG.personal.brandDescriptor}
            </div>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `text-xl font-heading font-bold uppercase tracking-tight py-1 transition-colors ${
                      isActive ? 'text-[#E50920]' : 'text-white hover:text-[#E50920]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/book"
                className={({ isActive }) =>
                  `text-xl font-heading font-bold uppercase tracking-tight py-1 transition-colors ${
                    isActive ? 'text-[#E50920]' : 'text-[#FF263F] hover:text-white'
                  }`
                }
              >
                Schedule Scoping Call
              </NavLink>
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#1E1E22]">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#A1A1AA]">
              <ShieldCheck className="w-4 h-4 text-[#E50920]" />
              <span className="truncate">{config.availability}</span>
            </div>
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="flex-1 text-center py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50920] rounded hover:bg-[#FF263F] transition-colors"
              >
                REQUEST ASSESSMENT
              </Link>
              <button
                type="button"
                onClick={openConfig}
                className="px-4 py-3 bg-[#121214] border border-[#29292D] rounded text-[#A1A1AA] hover:text-white"
                title="Configure"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
