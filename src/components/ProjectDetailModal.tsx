import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle, Terminal, Layers, FileCode } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectForInquiry: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectForInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0D0D0F] border border-[#29292D] rounded-xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#29292D] bg-[#121214]">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-2xl text-[#E50920]">
              {project.number}
            </span>
            <div>
              <span className="text-[11px] font-mono-tech uppercase text-[#A1A1AA] tracking-wider">
                {project.category} · {project.badge}
              </span>
              <h2 id="modal-title" className="text-base sm:text-lg font-heading font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#707078] hover:text-white rounded-lg border border-[#29292D] hover:border-[#E50920] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E50920]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Visual Banner */}
        <div className="border-b border-[#29292D]">
          <ProjectVisual type={project.visualType} title={project.title} />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Subtitle & Tagline */}
          <div className="space-y-1">
            <div className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider">
              {project.subtitle}
            </div>
            <p className="text-sm sm:text-base text-white font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-[#707078]">
              OVERVIEW &amp; SCOPE
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              {project.overview}
            </p>
            <div className="p-3 bg-[#121214] rounded border border-[#29292D] text-xs font-mono-tech text-[#F5F5F5]">
              <span className="text-[#E50920] font-bold">SCOPE NOTE: </span>
              {project.scopeSummary}
            </div>
          </div>

          {/* Key Assessment Areas */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-[#707078]">
              KEY AREAS EVALUATED
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyAreas.map((area: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 bg-[#121214]/60 rounded border border-[#1E1E22] text-xs text-[#F5F5F5]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E50920] shrink-0 mt-0.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sanitized Findings Sample */}
          {project.findingsSample && project.findingsSample.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono-tech uppercase tracking-wider text-[#707078]">
                  SANITIZED VULNERABILITY DOSSIER (SAMPLE)
                </h3>
                <span className="text-[10px] font-mono-tech text-[#E50920]">
                  ANONYMIZED EVIDENCE
                </span>
              </div>

              <div className="space-y-3">
                {project.findingsSample.map((finding, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#121214] rounded-lg border border-[#29292D] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono-tech px-2 py-0.5 rounded border uppercase font-bold ${getSeverityBadge(
                            finding.severity
                          )}`}
                        >
                          {finding.severity}
                        </span>
                        <span className="text-sm font-heading font-bold text-white">
                          {finding.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono-tech text-[#707078]">
                        {finding.category}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono-tech text-[#A1A1AA] uppercase font-semibold">
                          Potential Impact:{' '}
                        </span>
                        <span className="text-[#A1A1AA]">{finding.impact}</span>
                      </div>
                      <div className="p-2.5 bg-[#09090B] rounded border border-[#1E1E22] text-[#F5F5F5]">
                        <span className="font-mono-tech text-emerald-400 font-semibold">
                          Remediation Guidance:{' '}
                        </span>
                        <span>{finding.remediation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-[#707078]">
              DELIVERABLES INCLUDED
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A1A1AA]">
              {project.deliverables.map((d: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#29292D] bg-[#121214]">
          <span className="text-xs font-mono-tech text-[#707078] text-center sm:text-left">
            Authorized testing only · Evidence sanitized for security
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono-tech text-[#A1A1AA] hover:text-white border border-[#29292D] rounded transition-colors"
            >
              CLOSE
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectForInquiry(project.title);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50920] hover:bg-[#FF263F] rounded transition-colors"
            >
              <span>INQUIRE ABOUT THIS ASSESSMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
