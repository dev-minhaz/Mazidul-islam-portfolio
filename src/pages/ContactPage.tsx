import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { usePortfolioConfig } from '../context/PortfolioConfigContext';
import { inquiryService, AssessmentInquiryPayload } from '../services/inquiryService';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import {
  Mail,
  Copy,
  Check,
  Send,
  Lock,
  ShieldCheck,
  Calendar,
  Terminal,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service') || '';
  const { config } = usePortfolioConfig();
  const { personal, services } = PORTFOLIO_CONFIG;

  const [formData, setFormData] = useState<AssessmentInquiryPayload>({
    fullName: '',
    workEmail: '',
    company: '',
    service: requestedService || 'Web Application Penetration Testing',
    targetType: 'Web Application (Production or Staging)',
    timeline: 'Within 2–4 weeks',
    scopeDetails: '',
    honeypot: '',
  });

  useEffect(() => {
    if (requestedService) {
      setFormData((prev) => ({ ...prev, service: requestedService }));
    }
  }, [requestedService]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [copiedInquiry, setCopiedInquiry] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = inquiryService.validateInquiry(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const res = await inquiryService.submitInquiry(formData);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrors({ form: res.message });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(personal.pgpFingerprint);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  const handleCopyBrief = () => {
    const summary = inquiryService.formatClipboardSummary(formData);
    navigator.clipboard.writeText(summary);
    setCopiedInquiry(true);
    setTimeout(() => setCopiedInquiry(false), 2000);
  };

  const mailtoUrl = inquiryService.formatMailtoUrl(formData, config.email);

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Contact &amp; Security Assessment Intake | Mazidul Islam Khan"
        description="Initiate an authorized penetration test, request an API security review, or send an encrypted message to Mazidul Islam Khan."
        canonicalPath="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Contact & Assessment Intake' }]} />

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication & Channels (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
                07 / CONTACT &amp; INQUIRIES
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-[0.95]">
                LET&apos;S SECURE WHAT YOU&apos;RE BUILDING.
              </h1>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-2">
                Planning a penetration test, reviewing an application, or looking for a security-minded collaborator? Tell me about your project and the security goals you want to achieve.
              </p>
            </div>

            {/* Availability status */}
            <div className="p-4 rounded-xl bg-[#0D0D0F] border border-[#29292D] flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E50920] animate-pulse shrink-0" />
              <div className="space-y-0.5">
                <div className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                  {config.availability}
                </div>
                <div className="text-[11px] font-mono-tech text-[#707078]">
                  {personal.availabilitySub} · Response {personal.responseSla}
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3">
              <div className="text-xs font-mono-tech text-[#707078] uppercase tracking-wider">
                DIRECT COMMUNICATION
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-[#0D0D0F] border border-[#29292D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#E50920] shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono-tech uppercase text-[#707078]">
                      PRIMARY EMAIL
                    </div>
                    <a
                      href={`mailto:${config.email}`}
                      className="text-xs sm:text-sm font-mono-tech text-white hover:text-[#FF263F] transition-colors"
                    >
                      {config.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 text-[#707078] hover:text-white rounded border border-[#29292D] transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* PGP Key */}
              <div className="p-4 rounded-xl bg-[#0D0D0F] border border-[#29292D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Lock className="w-5 h-5 text-[#E50920] shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] font-mono-tech uppercase text-[#707078]">
                      PGP FINGERPRINT (ENCRYPTED INQUIRIES)
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#A1A1AA] truncate font-mono">
                      {personal.pgpFingerprint}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPgp}
                  className="p-2 text-[#707078] hover:text-white rounded border border-[#29292D] transition-colors shrink-0"
                  title="Copy PGP key fingerprint"
                >
                  {copiedPgp ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Consultation Booking Link */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-[#1A1113] to-[#0D0D0F] border border-[#E50920]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#FF263F] shrink-0" />
                  <div>
                    <div className="text-xs font-heading font-bold text-white">
                      PREFER A REAL-TIME SCOPING CALL?
                    </div>
                    <div className="text-[11px] text-[#A1A1AA]">
                      Schedule a 30-minute scoping discussion directly
                    </div>
                  </div>
                </div>
                <Link
                  to="/book"
                  className="px-3 py-1.5 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-mono-tech uppercase font-bold rounded transition-colors whitespace-nowrap"
                >
                  BOOK CALL
                </Link>
              </div>
            </div>

            {/* Confidentiality Box */}
            <div className="p-4 rounded-xl bg-[#121214] border border-[#1E1E22] text-xs font-mono-tech text-[#707078] space-y-1">
              <div className="text-white font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E50920]" />
                <span>CONFIDENTIALITY &amp; AUTHORIZATION</span>
              </div>
              <p className="leading-relaxed">
                All inquiries are treated with strict confidentiality. No testing will begin without a mutually signed non-disclosure agreement (NDA) and formal scope authorization.
              </p>
            </div>
          </div>

          {/* Right Column: Assessment Intake Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#0D0D0F] border border-[#29292D] p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1E22] mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E50920]" />
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-white font-bold">
                    SECURITY ASSESSMENT INTAKE
                  </span>
                </div>
                <span className="text-[11px] font-mono-tech text-[#707078]">
                  STAGE 1 / SCOPE INTAKE
                </span>
              </div>

              {submitted ? (
                /* Success Screen */
                <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#1A1113] border border-[#E50920] flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-[#FF263F]" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h2 className="text-2xl font-heading font-black text-white uppercase">
                      INQUIRY TRANSMITTED &amp; PREPARED
                    </h2>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      Thank you, <strong className="text-white">{formData.fullName}</strong>. Your assessment inquiry for{' '}
                      <strong className="text-white">{formData.service}</strong> has been structured and validated.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-[#121214] rounded-lg border border-[#29292D] text-left text-xs font-mono-tech space-y-3 max-w-lg mx-auto">
                    <div className="text-[#E50920] font-bold">NEXT STEPS:</div>
                    <p className="text-[#A1A1AA]">
                      You can launch your native email client to dispatch the pre-filled inquiry directly to{' '}
                      <span className="text-white">{config.email}</span>, or copy the formatted intake brief.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={mailtoUrl}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E50920] hover:bg-[#FF263F] text-white rounded font-semibold uppercase tracking-wider text-xs transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>OPEN EMAIL CLIENT</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1A1D] hover:bg-[#252528] text-white border border-[#29292D] rounded uppercase tracking-wider text-xs transition-colors"
                      >
                        {copiedInquiry ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedInquiry ? 'COPIED!' : 'COPY BRIEF'}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono-tech text-[#707078] hover:text-white transition-colors"
                  >
                    ← Edit or Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Intake Form */
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot hidden input */}
                  <div className="hidden">
                    <label>
                      Leave blank:
                      <input
                        type="text"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      />
                    </label>
                  </div>

                  {/* Name and Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase flex items-center justify-between">
                        <span>FULL NAME *</span>
                        {errors.fullName && (
                          <span className="text-[#FF263F] text-[10px]">{errors.fullName}</span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 bg-[#121214] border ${
                          errors.fullName ? 'border-[#FF263F]' : 'border-[#29292D]'
                        } rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase flex items-center justify-between">
                        <span>WORK EMAIL *</span>
                        {errors.workEmail && (
                          <span className="text-[#FF263F] text-[10px]">{errors.workEmail}</span>
                        )}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.workEmail}
                        onChange={(e) => {
                          setFormData({ ...formData, workEmail: e.target.value });
                          if (errors.workEmail) setErrors({ ...errors, workEmail: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 bg-[#121214] border ${
                          errors.workEmail ? 'border-[#FF263F]' : 'border-[#29292D]'
                        } rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors`}
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                        COMPANY / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CloudTech Solutions"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                        SERVICE REQUIRED
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Target Environment & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                        TARGET ENVIRONMENT
                      </label>
                      <select
                        value={formData.targetType}
                        onChange={(e) => setFormData({ ...formData, targetType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors"
                      >
                        <option value="Web Application (Staging or Pre-prod)">Web Application (Staging)</option>
                        <option value="Web Application (Production)">Web Application (Production)</option>
                        <option value="REST / GraphQL API Endpoints">REST / GraphQL API Endpoints</option>
                        <option value="External Perimeter & IP Range">External Perimeter &amp; IP Range</option>
                        <option value="Authentication & Access-Control Focus">Authentication &amp; RBAC Focus</option>
                        <option value="Other / Custom Security Scope">Other / Custom Security Scope</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                        DESIRED TIMELINE
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors"
                      >
                        <option value="Immediate (Next 7–14 days)">Immediate (Next 7–14 days)</option>
                        <option value="Within 2–4 weeks">Within 2–4 weeks</option>
                        <option value="Next quarter / Planning phase">Next quarter / Planning phase</option>
                        <option value="Ad-hoc / Consultation only">Ad-hoc / Consultation only</option>
                      </select>
                    </div>
                  </div>

                  {/* Scope Details */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase flex items-center justify-between">
                      <span>PROJECT SCOPE &amp; DETAILS *</span>
                      {errors.scopeDetails && (
                        <span className="text-[#FF263F] text-[10px]">{errors.scopeDetails}</span>
                      )}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline target tech stack, approximate number of endpoints/pages, specific concerns (e.g. tenant isolation, recent code refactor), and testing constraints..."
                      value={formData.scopeDetails}
                      onChange={(e) => {
                        setFormData({ ...formData, scopeDetails: e.target.value });
                        if (errors.scopeDetails) setErrors({ ...errors, scopeDetails: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 bg-[#121214] border ${
                        errors.scopeDetails ? 'border-[#FF263F]' : 'border-[#29292D]'
                      } rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] transition-colors resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-[#E50920] hover:bg-[#FF263F] text-white font-semibold uppercase tracking-wider text-xs sm:text-sm rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#E50920]/25 disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF263F]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>VALIDATING INTAKE BRIEF...</span>
                        </>
                      ) : (
                        <>
                          <span>REQUEST A SECURITY ASSESSMENT</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] font-mono-tech text-[#707078] text-center pt-2">
                    Submitted details are processed confidentially for assessment scoping only.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
