import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldAlert, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center bg-[#070707] px-4">
      <SEOHead
        title="404 — Target Endpoint Not Found | Mazidul Islam Khan"
        description="The requested URL endpoint is not part of this application's active routing tree."
      />

      <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D0D0F] border border-[#29292D] text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle red accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50920] to-transparent" />

        <div className="w-16 h-16 rounded-full bg-[#1A1113] border border-[#E50920] flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8 text-[#FF263F]" />
        </div>

        <div className="space-y-2">
          <div className="font-mono-tech text-xs text-[#E50920] font-bold tracking-widest uppercase">
            STATUS CODE 404
          </div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">
            ENDPOINT NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            The target URL path does not match any valid route within the authorized application surface.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="p-4 bg-[#121214] rounded-lg border border-[#1E1E22] text-xs font-mono-tech text-left space-y-2">
          <div className="text-[#707078] uppercase">AVAILABLE DIRECTORIES:</div>
          <div className="grid grid-cols-2 gap-2 text-[#A1A1AA]">
            <Link to="/" className="hover:text-white hover:underline">/ home</Link>
            <Link to="/services" className="hover:text-white hover:underline">/ services</Link>
            <Link to="/projects" className="hover:text-white hover:underline">/ projects</Link>
            <Link to="/about" className="hover:text-white hover:underline">/ about</Link>
            <Link to="/research" className="hover:text-white hover:underline">/ research</Link>
            <Link to="/contact" className="hover:text-white hover:underline">/ contact</Link>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>
      </div>
    </div>
  );
};
