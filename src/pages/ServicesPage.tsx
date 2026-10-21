import React from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import {
  ShieldAlert,
  Network,
  SearchCheck,
  KeyRound,
  SlidersHorizontal,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services } = PORTFOLIO_CONFIG;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#E50920]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#E50920]" />;
      case 'SearchCheck':
        return <SearchCheck className="w-5 h-5 text-[#E50920]" />;
      case 'KeyRound':
        return <KeyRound className="w-5 h-5 text-[#E50920]" />;
      case 'SlidersHorizontal':
        return <SlidersHorizontal className="w-5 h-5 text-[#E50920]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#E50920]" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-[#E50920]" />;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Security Services | Mazidul Islam Khan — Penetration Testing &amp; Vulnerability Assessment"
        description="Comprehensive cybersecurity services including Web Application Penetration Testing, API Security Testing, Vulnerability Assessments, and Access Control Audits."
        canonicalPath="/services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Security Services' }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#29292D]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
              02 / ASSESSMENT CATALOG
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white uppercase tracking-tight leading-[0.95]">
              IDENTIFY RISK BEFORE ATTACKERS DO.
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] pt-1">
              Methodical, authorized security testing designed to uncover vulnerabilities in modern web applications, microservices, and identity infrastructure.
            </p>
          </div>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-lg shadow-[#E50920]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>SCHEDULE SCOPING CALL</span>
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-all duration-300 flex flex-col justify-between group shadow-xl"
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
                  <h2 className="text-lg font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors leading-snug mt-1">
                    {service.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 pt-3 border-t border-[#1E1E22]">
                  <span className="text-[10px] font-mono-tech uppercase text-[#707078]">
                    KEY DELIVERABLES:
                  </span>
                  <ul className="space-y-1">
                    {service.deliverables.slice(0, 2).map((deliv, i) => (
                      <li key={i} className="text-xs text-[#F5F5F5] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-4 border-t border-[#1E1E22] flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono-tech font-bold text-[#E50920] hover:text-white transition-colors"
                >
                  <span>EXPLORE SCOPE</span>
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

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
