import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services } = PORTFOLIO_CONFIG;

  const service = services.find(
    (s) => s.slug === serviceId || s.id === serviceId
  );

  if (!service) {
    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <SEOHead
          title="Service Not Found | Mazidul Islam Khan"
          description="The requested security assessment service could not be located."
        />
        <div className="w-16 h-16 rounded-full bg-[#1A1113] border border-[#E50920] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-[#FF263F]" />
        </div>
        <h1 className="text-3xl font-heading font-black text-white uppercase">
          SERVICE NOT FOUND
        </h1>
        <p className="text-sm text-[#A1A1AA]">
          The security service specification you requested is not currently listed.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
        >
          <span>VIEW ALL SERVICES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title={`${service.title} | Mazidul Islam Khan — Penetration Testing`}
        description={service.shortDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]}
        />

        {/* Service Hero Header */}
        <div className="space-y-4 pb-8 border-b border-[#29292D]">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-4xl text-[#E50920] leading-none">
              {service.number}
            </span>
            <span className="text-xs font-mono-tech uppercase text-[#A1A1AA] tracking-wider">
              {service.category} · AUTHORIZED ASSESSMENT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-[#F5F5F5] font-medium max-w-3xl leading-relaxed">
            {service.shortDesc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors shadow-lg shadow-[#E50920]/20"
            >
              <span>REQUEST INTAKE FOR THIS SERVICE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/book?service=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#121214] hover:bg-[#1A1A1E] text-white border border-[#29292D] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#E50920]" />
              <span>SCHEDULE SCOPING CALL</span>
            </Link>
          </div>
        </div>

        {/* Detailed Scope & Methodology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Full Description */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider font-bold">
                ASSESSMENT SCOPE &amp; METHODOLOGY
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {service.fullDesc}
              </p>
              <p className="text-xs sm:text-sm text-[#707078] leading-relaxed">
                {service.methodologySummary}
              </p>
            </div>

            {/* Detailed Key Areas */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
                CORE TECHNICAL ATTACK VECTORS EVALUATED
              </h2>
              <div className="space-y-2.5">
                {service.detailedScope.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#0D0D0F] border border-[#29292D] flex items-start gap-3"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#E50920] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#F5F5F5]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Dossier */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
                FORMAL ENGAGEMENT DELIVERABLES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#121214] border border-[#1E1E22] flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-[#F5F5F5] font-medium">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Suitability & Prerequisites (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-4">
              <h3 className="text-xs font-mono-tech uppercase text-white font-bold tracking-wider pb-2 border-b border-[#1E1E22]">
                ENGAGEMENT PARAMETERS
              </h3>

              <div className="space-y-2 text-xs">
                <span className="font-mono-tech text-[#707078] uppercase">SUITABLE ENVIRONMENTS:</span>
                <p className="text-[#F5F5F5] font-medium">{service.suitableFor}</p>
              </div>

              <div className="space-y-2 text-xs pt-3 border-t border-[#1E1E22]">
                <span className="font-mono-tech text-[#707078] uppercase">PREREQUISITES:</span>
                <ul className="space-y-1.5 text-[#A1A1AA]">
                  {service.prerequisites.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E50920] font-bold">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-b from-[#1A1113] to-[#0D0D0F] border border-[#E50920]/30 space-y-3">
              <span className="text-xs font-mono-tech text-[#FF263F] uppercase font-bold">
                READY TO SCOPE?
              </span>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Receive a standardized Rules of Engagement (RoE) questionnaire and scheduling plan tailored to your release cycle.
              </p>
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="block text-center py-2.5 px-4 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                REQUEST SCOPE PROPOSAL
              </Link>
            </div>
          </div>
        </div>

        {/* Other Services Section */}
        <div className="pt-8 border-t border-[#29292D] space-y-6">
          <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
            ADDITIONAL SECURITY ASSESSMENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                to={`/services/${other.slug}`}
                className="p-5 rounded-xl bg-[#0D0D0F] border border-[#29292D] hover:border-[#E50920] transition-colors group space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#E50920] font-bold">{other.number}</span>
                  <span className="text-[#707078]">{other.category}</span>
                </div>
                <h3 className="text-base font-heading font-bold text-white group-hover:text-[#FF263F] transition-colors">
                  {other.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] line-clamp-2">
                  {other.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
