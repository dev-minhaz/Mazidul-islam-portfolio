import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface ScopeMandateProps {
  compact?: boolean;
}

export const ScopeMandate: React.FC<ScopeMandateProps> = ({ compact = false }) => {
  return (
    <div className={`rounded-xl bg-[#0D0D0F] border border-[#29292D] ${compact ? 'p-4' : 'p-6 sm:p-7'} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl`}>
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#121214] border border-[#E50920]/40 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#E50920]" />
        </div>
        <div className="space-y-0.5">
          <div className="text-xs font-mono-tech uppercase font-bold text-white flex items-center gap-2">
            <span>STRICT ENGAGEMENT MANDATE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50920] animate-pulse" />
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-2xl">
            All security testing is performed strictly within agreed rules of engagement, authorized staging/production windows, and written legal scope. No unsolicited probes or destructive activity.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
        <Link
          to="/methodology"
          className="text-xs font-mono-tech text-[#A1A1AA] hover:text-white transition-colors"
        >
          VIEW METHODOLOGY
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
        >
          <span>REQUEST SCOPING BRIEF</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
