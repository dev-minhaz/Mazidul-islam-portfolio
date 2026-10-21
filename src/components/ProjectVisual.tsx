import React from 'react';

interface ProjectVisualProps {
  type: 'dashboard' | 'api' | 'report' | 'terminal' | 'matrix' | 'toolkit';
  title: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ type, title }) => {
  switch (type) {
    case 'dashboard':
      return (
        <div className="w-full h-48 sm:h-56 bg-[#0B0B0D] border-b border-[#29292D] p-4 flex flex-col justify-between font-mono-tech text-xs select-none overflow-hidden relative group-hover:border-[#E50920]/40 transition-colors">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-cyber opacity-30" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E50920]/10 rounded-full blur-2xl" />

          {/* Top simulated bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#1E1E22] pb-2 text-[#707078]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E50920]" />
              <span className="text-[#A1A1AA] font-semibold text-[11px]">TARGET: STAGING-APP.INTERNAL</span>
            </div>
            <span className="text-[10px] text-[#A1A1AA]">AUTH SCOPE #01-A</span>
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-2 py-2">
            <div className="flex items-center justify-between bg-[#121214] px-3 py-1.5 rounded border border-[#1E1E22]">
              <span className="text-[#A1A1AA]">POST /api/v2/tenant/export</span>
              <span className="text-[#FF263F] font-bold">403 → 200 (IDOR)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="bg-[#121214] p-2 rounded border border-[#1E1E22]">
                <div className="text-[#707078]">AUTH BOUNDARY</div>
                <div className="text-white font-medium mt-0.5">TENANT_BYPASS</div>
              </div>
              <div className="bg-[#121214] p-2 rounded border border-[#1E1E22]">
                <div className="text-[#707078]">SESSION TOKEN</div>
                <div className="text-white font-medium mt-0.5">JWT_TAMPERED</div>
              </div>
              <div className="bg-[#121214] p-2 rounded border border-[#1E1E22]">
                <div className="text-[#707078]">CVSS v3.1</div>
                <div className="text-[#FF263F] font-bold mt-0.5">8.6 HIGH</div>
              </div>
            </div>
          </div>

          {/* Bottom telemetry line */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#707078] pt-1 border-t border-[#1E1E22]">
            <span>SAFE PROOF-OF-CONCEPT VERIFIED</span>
            <span className="text-[#E50920]">NO DATA DISCLOSURE</span>
          </div>
        </div>
      );

    case 'api':
      return (
        <div className="w-full h-48 sm:h-56 bg-[#0B0B0D] border-b border-[#29292D] p-4 flex flex-col justify-between font-mono-tech text-xs select-none overflow-hidden relative group-hover:border-[#E50920]/40 transition-colors">
          <div className="absolute inset-0 bg-grid-cyber opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#780916]/15 rounded-full blur-3xl" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#1E1E22] pb-2 text-[#707078]">
            <span className="text-[#A1A1AA] font-semibold text-[11px]">API ENDPOINT AUDIT</span>
            <span className="text-[#E50920] text-[10px]">42 ENDPOINTS PROFILED</span>
          </div>

          {/* Interactive API flow graph mock */}
          <div className="relative z-10 space-y-1.5 py-1 text-[11px]">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-emerald-400">GET /v1/users/me</span>
              <span className="text-[#707078]">200 OK · Rate 100/m</span>
            </div>
            <div className="flex items-center justify-between bg-[#1A1113] p-1.5 rounded border border-[#E50920]/30 text-[10px]">
              <span className="text-[#FF263F] font-semibold">PATCH /v1/profile/role</span>
              <span className="text-[#FF263F]">BFLA DETECTED</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-amber-400">POST /v1/auth/reset-sms</span>
              <span className="text-[#707078]">RATE-LIMIT GAP</span>
            </div>
          </div>

          {/* Bottom summary */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#707078] pt-1 border-t border-[#1E1E22]">
            <span>OWASP API-SEC #01 / #05</span>
            <span className="text-white font-medium">SCHEMA DTO REQUIRED</span>
          </div>
        </div>
      );

    case 'report':
      return (
        <div className="w-full h-48 sm:h-56 bg-[#0B0B0D] border-b border-[#29292D] p-4 flex flex-col justify-between font-mono-tech text-xs select-none overflow-hidden relative group-hover:border-[#E50920]/40 transition-colors">
          <div className="absolute inset-0 bg-grid-cyber opacity-30" />

          <div className="relative z-10 flex items-center justify-between border-b border-[#1E1E22] pb-2">
            <span className="text-[#A1A1AA] font-semibold text-[11px]">PERIMETER TRIAGE DOSSIER</span>
            <span className="text-[#707078] text-[10px]">CVSS 3.1 NORMALIZED</span>
          </div>

          {/* Severity bar */}
          <div className="relative z-10 space-y-2 py-1">
            <div className="flex items-center gap-1.5 h-2 w-full bg-[#18181B] rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#E50920] rounded-full w-[20%]" title="Critical" />
              <div className="h-full bg-[#FF263F] rounded-full w-[35%]" title="High" />
              <div className="h-full bg-amber-500 rounded-full w-[30%]" title="Medium" />
              <div className="h-full bg-blue-500 rounded-full w-[15%]" title="Low" />
            </div>

            <div className="bg-[#121214] p-2 rounded border border-[#1E1E22] text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#707078]">FALSE POSITIVES FILTERED:</span>
                <span className="text-emerald-400 font-bold">100% (MANUAL VERIFIED)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707078]">PUBLIC METADATA EXPOSURE:</span>
                <span className="text-[#FF263F]">.git/config ARTIFACT</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#707078] pt-1 border-t border-[#1E1E22]">
            <span>EXECUTIVE READY</span>
            <span className="text-[#A1A1AA]">ACTIONABLE PATCH ROADMAP</span>
          </div>
        </div>
      );

    case 'terminal':
      return (
        <div className="w-full h-48 sm:h-56 bg-[#08080A] border-b border-[#29292D] p-3.5 flex flex-col justify-between font-mono-tech text-[11px] select-none overflow-hidden relative group-hover:border-[#E50920]/40 transition-colors">
          <div className="flex items-center justify-between text-[#707078] border-b border-[#1A1A1D] pb-1.5 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E50920]" />
              <span className="w-2 h-2 rounded-full bg-[#29292D]" />
              <span className="w-2 h-2 rounded-full bg-[#29292D]" />
              <span className="text-[#A1A1AA] ml-1">mazidul@lab-vm:~</span>
            </div>
            <span>ISOLATED LAB</span>
          </div>

          <div className="space-y-1 py-1 text-[10px] leading-relaxed text-[#A1A1AA]">
            <div><span className="text-[#E50920]">$</span> nmap -sC -sV -p 80,443,8080 --reason target.lab</div>
            <div className="text-[#707078]">PORT     STATE SERVICE REASON  VERSION</div>
            <div><span className="text-emerald-400">80/tcp</span>   open  http    syn-ack nginx 1.18.0</div>
            <div><span className="text-emerald-400">443/tcp</span>  open  ssl/http syn-ack TLSv1.3</div>
            <div><span className="text-[#FF263F]">8080/tcp</span> open  http-alt syn-ack internal-admin (exposed)</div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#707078] pt-1 border-t border-[#1A1A1D]">
            <span>CUSTOM FUZZING HARNESS</span>
            <span className="text-[#E50920]">CONTAINERIZED LAB</span>
          </div>
        </div>
      );

    case 'matrix':
      return (
        <div className="w-full h-48 sm:h-56 bg-[#0B0B0D] border-b border-[#29292D] p-4 flex flex-col justify-between font-mono-tech text-xs select-none overflow-hidden relative group-hover:border-[#E50920]/40 transition-colors">
          <div className="absolute inset-0 bg-grid-cyber opacity-30" />

          <div className="relative z-10 flex items-center justify-between border-b border-[#1E1E22] pb-2">
            <span className="text-[#A1A1AA] font-semibold text-[11px]">RBAC BOUNDARY MATRIX</span>
            <span className="text-[#E50920] text-[10px]">PRIVILEGE ANALYSIS</span>
          </div>

          <div className="relative z-10 space-y-1 py-1 text-[10px]">
            <div className="grid grid-cols-4 text-[#707078] font-bold pb-1 border-b border-[#1E1E22]">
              <span>ROLE</span>
              <span>READ</span>
              <span>WRITE</span>
              <span>ADMIN_DEL</span>
            </div>
            <div className="grid grid-cols-4 text-[#A1A1AA]">
              <span>GUEST</span>
              <span className="text-emerald-400">ALLOW</span>
              <span className="text-[#707078]">DENY</span>
              <span className="text-[#707078]">DENY</span>
            </div>
            <div className="grid grid-cols-4 text-[#A1A1AA]">
              <span>MEMBER</span>
              <span className="text-emerald-400">ALLOW</span>
              <span className="text-emerald-400">ALLOW</span>
              <span className="text-[#FF263F] font-bold">BYPASS (!)</span>
            </div>
            <div className="grid grid-cols-4 text-white">
              <span>ADMIN</span>
              <span className="text-emerald-400">ALLOW</span>
              <span className="text-emerald-400">ALLOW</span>
              <span className="text-emerald-400">ALLOW</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#707078] pt-1 border-t border-[#1E1E22]">
            <span>VERTICAL ESCALATION</span>
            <span className="text-[#FF263F]">BACKEND GUARD REQUIRED</span>
          </div>
        </div>
      );

    case 'toolkit':
      return (
        <div className="w-full h-48 sm:h-56 bg-[#08080A] border-b border-[#29292D] p-3.5 flex flex-col justify-between font-mono-tech text-[11px] select-none overflow-hidden relative group-hover:border-[#E50920]/40 transition-colors">
          <div className="flex items-center justify-between text-[#707078] border-b border-[#1A1A1D] pb-1.5 text-[10px]">
            <span className="text-[#A1A1AA] font-semibold">audit_headers.py</span>
            <span className="text-[#E50920]">CLI UTILITY</span>
          </div>

          <div className="space-y-1 py-1 text-[10px] text-[#A1A1AA]">
            <div className="text-[#707078]"># Automated RFC Compliance &amp; Security Headers</div>
            <div><span className="text-[#E50920]">def</span> <span className="text-white font-medium">verify_security_posture</span>(domain):</div>
            <div className="pl-3 text-[#707078]">res = session.head(f&quot;https://{'{'}domain{'}'}&quot;)</div>
            <div className="pl-3"><span className="text-[#E50920]">if</span> &quot;Strict-Transport-Security&quot; <span className="text-[#E50920]">not in</span> res.headers:</div>
            <div className="pl-6 text-[#FF263F]">flag_finding(&quot;HSTS_MISSING&quot;, severity=&quot;MEDIUM&quot;)</div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#707078] pt-1 border-t border-[#1A1A1D]">
            <span>OUTPUT: SANITIZED JSON</span>
            <span className="text-emerald-400">RATE-LIMITED (SAFE)</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
