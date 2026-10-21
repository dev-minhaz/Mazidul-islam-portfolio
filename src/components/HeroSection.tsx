import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { ArrowUpRight, ShieldCheck, Globe, Maximize2, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreWork?: () => void;
  onContactClick?: () => void;
  customAvailability?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onContactClick,
  customAvailability,
}) => {
  const [showFullPhoto, setShowFullPhoto] = useState(false);
  const { personal, trustSignals } = PORTFOLIO_CONFIG;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen pt-24 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden bg-[#070707]"
    >
      {/* Background subtle noise and cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      {/* Top Metadata Row (matching reference image top labels) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex items-center justify-between text-[11px] font-mono-tech tracking-wider uppercase text-[#707078] border-b border-white/[0.05] z-20">
        <div className="flex items-center gap-2">
          <span className="text-[#E50920] font-bold">///</span>
          <span className="text-[#A1A1AA]">{personal.heroKicker}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50920] animate-pulse" />
          <span className="text-[#A1A1AA] hidden sm:inline">
            {customAvailability || personal.availability}
          </span>
          <span className="text-[#A1A1AA] sm:hidden">AVAILABLE</span>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8 sm:py-12 z-10">
        {/* Massive Red Display Typography behind portrait (reference style: PORTFOLIO / SECURITY) */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden leading-none opacity-85"
        >
          <span className="font-display font-black text-[22vw] sm:text-[20vw] lg:text-[18vw] text-transparent bg-clip-text bg-gradient-to-b from-[#E50920] via-[#A80816] to-[#3A040A] tracking-tighter block transform -translate-y-6">
            SECURITY
          </span>
        </div>

        {/* Ambient Crimson Glow behind the right photo and center */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] sm:w-[550px] lg:w-[650px] h-[350px] sm:h-[550px] lg:h-[650px] bg-radial-hero rounded-full pointer-events-none z-0 blur-3xl opacity-80" />

        {/* 2-Column Balanced Editorial Hero Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Name, Title, Bio, Actions, & Qualitative Trust Strip (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* Handwritten cursive accent: "Hello, I'm" */}
            <div className="flex items-center gap-2">
              <span className="font-script text-3xl sm:text-4xl text-[#FF263F] transform -rotate-3 block">
                {personal.handwrittenGreeting}
              </span>
            </div>

            {/* Giant Condensed Name: MAZIDUL ISLAM KHAN */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.88] uppercase drop-shadow-md">
              <span className="block">{personal.headlinePart1}</span>
              <span className="block text-[#F5F5F5]">{personal.headlinePart2}</span>
            </h1>

            {/* Professional Headline in accent red */}
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-heading font-bold text-[#E50920] tracking-wider uppercase">
                {personal.professionalTitle}
              </p>
              <div className="h-0.5 w-20 bg-[#E50920]" />
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-xl font-normal">
              {personal.heroBio}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200 shadow-xl shadow-[#E50920]/25 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF263F]"
              >
                <span>DISCUSS A SECURITY ASSESSMENT</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#121214] hover:bg-[#1A1A1E] text-[#F5F5F5] hover:text-white border border-[#29292D] hover:border-[#E50920]/50 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
              >
                <span>EXPLORE MY WORK</span>
              </Link>
            </div>

            {/* Worldwide Availability indicator */}
            <div className="pt-1 flex items-center gap-2 text-xs font-mono-tech text-[#707078]">
              <Globe className="w-3.5 h-3.5 text-[#E50920]" />
              <span>AVAILABLE WORLDWIDE · AUTHORIZED TESTING ONLY</span>
            </div>

            {/* Horizontal Trust Metrics Strip (Integrated cleanly into left column) */}
            <div className="pt-4 border-t border-[#1E1E22] grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trustSignals.map((item) => (
                <div
                  key={item.metric}
                  className="p-2.5 rounded bg-[#0D0D0F]/80 border border-[#1E1E22] hover:border-[#E50920]/40 transition-colors"
                >
                  <div className="font-display font-black text-xl text-[#E50920] leading-none">
                    {item.metric}
                  </div>
                  <div className="text-[11px] font-heading font-bold text-white tracking-wide mt-1 truncate">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-[#707078] leading-tight line-clamp-2 mt-0.5">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Carefully Placed & Sized Photograph of Mazidul Islam Khan (lg:col-span-5) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center my-4 lg:my-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] h-[460px] sm:h-[520px] lg:h-[560px] flex items-end justify-center group">
              {/* Outer soft ambient backlight with cyan & crimson glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-[#E50920]/15 to-transparent rounded-2xl filter blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Decorative Corner Cyber Accents (Cyan) */}
              <div className="absolute -top-2.5 -right-2.5 w-7 h-7 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none rounded-tr" />
              <div className="absolute -bottom-2.5 -left-2.5 w-7 h-7 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none rounded-bl" />

              {/* Floating Philosophy Card (Inspired by reference image layout) */}
              <div className="hidden sm:flex absolute -left-6 lg:-left-8 top-16 max-w-[200px] lg:max-w-[220px] p-3 rounded-lg bg-[#0A0E17]/95 backdrop-blur-md border border-[#1E293B] shadow-2xl z-30 space-y-1 text-left pointer-events-none group-hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-mono-tech font-bold uppercase tracking-wider">
                  <span className="text-cyan-400">✦</span>
                  <span>SECURITY PHILOSOPHY</span>
                </div>
                <p className="text-[11px] text-[#E4E4E7] leading-snug font-heading font-medium">
                  Turning weaknesses into fortified resilience through methodical testing.
                </p>
              </div>

              {/* Portrait image container with subtle cyan outline & restrained glowing border */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#1E293B] group-hover:border-cyan-400/60 shadow-2xl bg-[#080C14] transition-all duration-300 ring-1 ring-cyan-500/20 group-hover:ring-cyan-400/40 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.18)]">
                <img
                  src={personal.portraitImage}
                  alt={personal.portraitAlt}
                  className={`w-full h-full transition-all duration-500 ${
                    showFullPhoto
                      ? 'object-contain bg-black p-2'
                      : 'object-top object-cover scale-[1.03] group-hover:scale-[1.05]'
                  }`}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to relative path if absolute fails
                    const target = e.currentTarget;
                    if (!target.src.includes('public/')) {
                      target.src = '/public' + personal.portraitImage;
                    }
                  }}
                />

                {/* Dark gradient scrims ensuring seamless editorial integration with dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/25 to-transparent opacity-90 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/30 via-transparent to-[#070707]/30 pointer-events-none" />

                {/* Subtle cyber scan hairline (cyan) */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none" />

                {/* Floating Role Taglet on top-right of image */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded bg-[#0A0E17]/90 backdrop-blur-md text-[10px] font-mono-tech text-cyan-300 border border-cyan-500/30 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>SECURITY SPECIALIST</span>
                </div>

                {/* Portrait Overlay Identity Badge & Full-view Toggle at bottom */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-mono-tech text-white/95 bg-black/85 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-white/10 shadow-xl">
                  <div className="flex items-center gap-2 truncate">
                    <ShieldCheck className="w-4 h-4 text-[#E50920] shrink-0" />
                    <span className="font-semibold tracking-wider uppercase text-xs truncate">
                      {personal.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFullPhoto(!showFullPhoto)}
                    className="flex items-center gap-1.5 text-[10px] text-[#A1A1AA] hover:text-white transition-colors shrink-0 ml-2 py-0.5 px-2 rounded bg-white/5 hover:bg-white/10 border border-white/10"
                    title="Toggle portrait crop vs full frame"
                  >
                    <Maximize2 className="w-3 h-3 text-[#E50920]" />
                    <span>{showFullPhoto ? 'PORTRAIT' : 'FULL PHOTO'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Bar & Scroll Indicator (matching reference horizontal line) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 border-t border-[#29292D] flex items-center justify-between text-xs font-mono-tech text-[#707078] z-10">
        <div className="flex items-center gap-4">
          <span className="text-[#E50920]">00 / INTRO</span>
          <span className="hidden sm:inline text-[#A1A1AA]">
            PENETRATION TESTING &amp; SECURITY ASSESSMENTS
          </span>
        </div>
        <a
          href="#featured-projects"
          onClick={onExploreWork}
          className="flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#E50920] transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="text-[#E50920] animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
};
