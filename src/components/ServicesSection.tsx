import React from 'react';
import { PORTFOLIO_CONFIG, ServiceItem } from '../data/portfolioData';
import {
  ShieldAlert,
  Network,
  SearchCheck,
  KeyRound,
  SlidersHorizontal,
  FileCheck,
  ArrowUpRight,
  Shield,
  CheckCircle2,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
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
        return <Shield className="w-5 h-5 text-[#E50920]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#070707] border-t border-[#29292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-2">
          <div className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider">
            02 / SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Identify risk before attackers do.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-1">
            Structured, authorized security testing designed to uncover vulnerabilities in modern web applications,
            APIs, and critical authentication flows before deployment.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-[#E50920]/10"
            >
              <div className="space-y-4">
                {/* Card Top: Red Number + Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-3xl text-[#E50920] leading-none group-hover:scale-110 transition-transform">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#121214] border border-[#29292D] group-hover:border-[#E50920]/40 flex items-center justify-center transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Title & Category */}
                <div>
                  <div className="text-[10px] font-mono-tech uppercase text-[#707078] tracking-wider">
                    {service.category}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors leading-snug mt-1">
                    {service.title}
                  </h3>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables Preview */}
                <div className="space-y-1.5 pt-2 border-t border-[#1E1E22]">
                  <div className="text-[10px] font-mono-tech uppercase text-[#707078]">
                    KEY DELIVERABLES:
                  </div>
                  <ul className="space-y-1">
                    {service.deliverables.slice(0, 2).map((deliv: string, i: number) => (
                      <li key={i} className="text-xs text-[#F5F5F5] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-4 border-t border-[#1E1E22] flex items-center justify-between">
                <span className="text-[11px] font-mono-tech text-[#707078] truncate max-w-[180px]">
                  {service.suitableFor}
                </span>

                <a
                  href="#contact"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1 text-xs font-mono-tech font-bold text-[#E50920] hover:text-white transition-colors group/link"
                >
                  <span>DISCUSS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Authorization Statement */}
        <div className="mt-12 p-5 rounded-lg bg-[#0D0D0F] border border-[#29292D] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E50920] animate-pulse shrink-0" />
            <p className="text-xs font-mono-tech text-[#A1A1AA]">
              <strong className="text-white">STRICT ENGAGEMENT MANDATE:</strong> All security testing is conducted only with explicit written authorization, clear boundaries of responsibility, and defined rules of engagement.
            </p>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 bg-[#121214] hover:bg-[#1A1A1E] text-xs font-mono-tech text-white border border-[#29292D] hover:border-[#E50920] rounded whitespace-nowrap transition-colors"
          >
            REQUEST SCOPE BRIEF
          </a>
        </div>
      </div>
    </section>
  );
};
