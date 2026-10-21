import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import { ProjectVisual } from '../components/ProjectVisual';
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Terminal,
  AlertCircle,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = PORTFOLIO_CONFIG;

  const project = projects.find(
    (p) => p.slug === projectId || p.id === projectId
  );

  if (!project) {
    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <SEOHead
          title="Case Study Not Found | Mazidul Islam Khan"
          description="The requested security case study could not be located."
        />
        <div className="w-16 h-16 rounded-full bg-[#1A1113] border border-[#E50920] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-[#FF263F]" />
        </div>
        <h1 className="text-3xl font-heading font-black text-white uppercase">
          PROJECT NOT FOUND
        </h1>
        <p className="text-sm text-[#A1A1AA]">
          The security case study or lab project you requested does not exist.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
        >
          <span>EXPLORE ALL PROJECTS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const getSeverityBadge = (severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-[#780916] text-white border-[#E50920]';
      case 'HIGH':
        return 'bg-[#2A0F12] text-[#FF263F] border-[#FF263F]/50';
      case 'MEDIUM':
        return 'bg-[#291F0A] text-amber-400 border-amber-500/50';
      case 'LOW':
        return 'bg-[#0D1C2E] text-blue-400 border-blue-500/50';
    }
  };

  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title={`${project.title} | Case Study | Mazidul Islam Khan`}
        description={project.tagline}
        canonicalPath={`/projects/${project.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.title },
          ]}
        />

        {/* Project Header */}
        <div className="space-y-4 pb-8 border-b border-[#29292D]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-4xl text-[#E50920] leading-none">
                {project.number}
              </span>
              <span className="text-xs font-mono-tech uppercase text-[#A1A1AA] tracking-wider">
                {project.category} · {project.badge}
              </span>
            </div>

            <div className="text-xs font-mono-tech text-[#707078]">
              ESTIMATED DURATION: {project.estimatedTimeline || 'Scoped Engagement'}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
            {project.title}
          </h1>

          <div className="text-sm font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
            {project.subtitle}
          </div>

          <p className="text-base sm:text-lg text-[#F5F5F5] font-medium max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?service=${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors shadow-lg shadow-[#E50920]/20"
            >
              <span>INQUIRE ABOUT SIMILAR ASSESSMENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#121214] hover:bg-[#1A1A1E] text-white border border-[#29292D] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#E50920]" />
              <span>SCHEDULE SCOPING CALL</span>
            </Link>
          </div>
        </div>

        {/* Visual Preview Banner */}
        <div className="rounded-xl overflow-hidden border border-[#29292D] shadow-2xl bg-[#0D0D0F]">
          <ProjectVisual type={project.visualType} title={project.title} />
        </div>

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Dossier Content (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Scope */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider font-bold">
                ENGAGEMENT OVERVIEW &amp; CONTEXT
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {project.overview}
              </p>
              <div className="p-4 bg-[#121214] rounded-lg border border-[#29292D] text-xs font-mono-tech text-[#F5F5F5] space-y-1">
                <div className="text-[#E50920] font-bold">SCOPE BOUNDARY NOTE:</div>
                <div className="text-[#A1A1AA]">{project.scopeSummary}</div>
              </div>
            </div>

            {/* Key Areas Evaluated */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
                KEY TECHNICAL AREAS EVALUATED
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0D0D0F] rounded-lg border border-[#29292D] text-xs text-[#F5F5F5] flex items-start gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#E50920] shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology Execution */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
                METHODOLOGY EXECUTION STEPS
              </h2>
              <div className="space-y-3">
                {project.methodologySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#0D0D0F] rounded-lg border border-[#29292D] flex items-start gap-3"
                  >
                    <span className="font-mono-tech text-xs text-[#E50920] font-bold shrink-0 pt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sanitized Findings Sample Dossier */}
            {project.findingsSample && project.findingsSample.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-mono-tech uppercase text-[#E50920] tracking-wider font-bold">
                    SANITIZED VULNERABILITY DOSSIER (SAMPLE)
                  </h2>
                  <span className="text-[10px] font-mono-tech text-[#707078]">
                    CONFIDENTIALITY SANITIZED
                  </span>
                </div>

                <div className="space-y-4">
                  {project.findingsSample.map((finding, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 bg-[#0D0D0F] rounded-xl border border-[#29292D] space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono-tech px-2.5 py-0.5 rounded border uppercase font-bold ${getSeverityBadge(
                              finding.severity
                            )}`}
                          >
                            {finding.severity}
                          </span>
                          <h3 className="text-base font-heading font-bold text-white">
                            {finding.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#707078]">
                          {finding.cwe && <span>{finding.cwe}</span>}
                          {finding.cvssScore && (
                            <span className="text-[#FF263F] font-bold">
                              CVSS {finding.cvssScore}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-mono-tech text-[#A1A1AA] uppercase font-semibold">
                            Potential Risk &amp; Business Impact:{' '}
                          </span>
                          <span className="text-[#A1A1AA] leading-relaxed">
                            {finding.impact}
                          </span>
                        </div>
                        <div className="p-3 bg-[#121214] rounded border border-[#1E1E22] text-[#F5F5F5] space-y-1">
                          <span className="font-mono-tech text-emerald-400 font-semibold block">
                            Engineering Remediation Guidance:
                          </span>
                          <p className="leading-relaxed">{finding.remediation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Environment & Deliverables (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-4">
              <h3 className="text-xs font-mono-tech uppercase text-white font-bold tracking-wider pb-2 border-b border-[#1E1E22]">
                ASSESSMENT PARAMETERS
              </h3>

              <div className="space-y-1 text-xs">
                <span className="font-mono-tech text-[#707078] uppercase">TARGET ENVIRONMENT:</span>
                <p className="text-white font-medium">{project.environmentType}</p>
              </div>

              <div className="space-y-1 text-xs pt-3 border-t border-[#1E1E22]">
                <span className="font-mono-tech text-[#707078] uppercase">THREAT MODEL:</span>
                <p className="text-[#A1A1AA] leading-relaxed">{project.threatModel}</p>
              </div>

              <div className="space-y-2 text-xs pt-3 border-t border-[#1E1E22]">
                <span className="font-mono-tech text-[#707078] uppercase">DELIVERABLES INCLUDED:</span>
                <ul className="space-y-1.5">
                  {project.deliverables.map((deliv, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#F5F5F5]">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-b from-[#1A1113] to-[#0D0D0F] border border-[#E50920]/30 space-y-3">
              <span className="text-xs font-mono-tech text-[#FF263F] uppercase font-bold">
                SIMILAR PLATFORM ARCHITECTURE?
              </span>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                If your product utilizes similar microservices, authentication tokens, or multi-tenant structures, request an authorized assessment today.
              </p>
              <Link
                to={`/contact?service=${encodeURIComponent(project.title)}`}
                className="block text-center py-2.5 px-4 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                REQUEST SCOPING CALL
              </Link>
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div className="pt-8 border-t border-[#29292D] space-y-6">
          <h2 className="text-xs font-mono-tech uppercase text-[#707078] tracking-wider">
            OTHER SECURITY ASSESSMENTS &amp; LABS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((other) => (
              <Link
                key={other.id}
                to={`/projects/${other.slug}`}
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
                  {other.tagline}
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
