import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { usePortfolioConfig } from '../context/PortfolioConfigContext';
import { bookingService } from '../services/bookingService';
import { ConsultationBookingRequest } from '../types/booking';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScopeMandate } from '../components/common/ScopeMandate';
import {
  Calendar,
  Clock,
  Check,
  Download,
  ShieldCheck,
  Lock,
  ArrowRight,
  Send,
  Video,
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const { config } = usePortfolioConfig();

  // Next 7 business days generator
  const getUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    while (dates.length < 6) {
      count++;
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + count);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
        dates.push({
          iso: nextDate.toISOString().split('T')[0],
          display: nextDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
        });
      }
    }
    return dates;
  };

  const availableDates = getUpcomingDates();

  const [formData, setFormData] = useState<ConsultationBookingRequest>({
    fullName: '',
    workEmail: '',
    company: '',
    targetScopeType: preselectedService || 'Web Application (Production / Staging)',
    preferredDate: availableDates[0]?.iso || '',
    preferredTimeSlot: '11:30 AM UTC',
    meetingFocus: 'Pre-Engagement Scoping',
    notes: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    ndaRequired: true,
  });

  const [slots] = useState(bookingService.getAvailableSlots(formData.preferredDate));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = bookingService.validateBooking(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const res = await bookingService.scheduleConsultation(formData);
    setIsSubmitting(false);
    if (res.success) {
      setBooked(true);
    } else {
      setErrors({ form: res.message });
    }
  };

  const handleDownloadCalendar = () => {
    bookingService.generateIcsCalendarFile(formData, config.email);
  };

  return (
    <div className="pt-24 pb-20 bg-[#070707]">
      <SEOHead
        title="Schedule a Security Consultation | Mazidul Islam Khan"
        description="Book a dedicated technical scoping consultation or architecture review session directly with Mazidul Islam Khan."
        canonicalPath="/book"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Consultation Booking' }]} />

        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-[#29292D]">
          <span className="text-xs font-mono-tech text-[#E50920] uppercase tracking-wider font-bold">
            07 / DIRECT CONSULTATION
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            SCHEDULE A TECHNICAL SCOPING CALL.
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
            Book a 30-minute private consultation to discuss target architecture, permitted testing windows, Rules of Engagement (RoE), and priority vulnerability concerns.
          </p>
        </div>

        {booked ? (
          /* Confirmation State */
          <div className="p-8 sm:p-10 rounded-xl bg-[#0D0D0F] border border-[#29292D] text-center space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#1A1113] border border-[#E50920] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[#FF263F]" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-heading font-black text-white uppercase">
                CONSULTATION CONFIRMED
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your scoping session is reserved for:
              </p>
              <div className="p-4 bg-[#121214] rounded border border-[#29292D] font-mono-tech text-xs text-white space-y-1 mt-3">
                <div className="text-[#E50920] font-bold">
                  {formData.preferredDate} at {formData.preferredTimeSlot}
                </div>
                <div className="text-[#707078]">
                  Focus: {formData.meetingFocus} · Timezone: {formData.timezone}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E50920] hover:bg-[#FF263F] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD .ICS CALENDAR INVITE</span>
              </button>

              <button
                type="button"
                onClick={() => setBooked(false)}
                className="px-5 py-3 bg-[#121214] hover:bg-[#1A1A1E] text-xs font-mono-tech text-[#A1A1AA] hover:text-white border border-[#29292D] rounded transition-colors"
              >
                Schedule Another Call
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-[#0D0D0F] border border-[#29292D] space-y-8 shadow-2xl" noValidate>
            {/* Step 1: Session Focus */}
            <div className="space-y-3">
              <label className="text-xs font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                1. SELECT CONSULTATION FOCUS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    value: 'Pre-Engagement Scoping',
                    desc: 'Define targets, RoE, exclusions & quotation',
                  },
                  {
                    value: 'Architecture Security Review',
                    desc: 'Discuss API tokens, auth flows & design',
                  },
                  {
                    value: 'Vulnerability Remediation Walkthrough',
                    desc: 'Review patch implementation & verify fixes',
                  },
                  {
                    value: 'General Advisory',
                    desc: 'Independent cybersecurity guidance & planning',
                  },
                ].map((focus) => (
                  <button
                    key={focus.value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        meetingFocus: focus.value as any,
                      })
                    }
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      formData.meetingFocus === focus.value
                        ? 'bg-[#1A1113] border-[#E50920] text-white'
                        : 'bg-[#121214] border-[#1E1E22] text-[#A1A1AA] hover:border-[#707078]'
                    }`}
                  >
                    <div className="text-xs font-heading font-bold text-white">
                      {focus.value}
                    </div>
                    <div className="text-[11px] text-[#707078] mt-0.5">
                      {focus.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                2. SELECT PREFERRED DATE &amp; TIME SLOT
              </label>

              {/* Date selection row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {availableDates.map((dateObj) => (
                  <button
                    key={dateObj.iso}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, preferredDate: dateObj.iso })
                    }
                    className={`p-2.5 rounded border text-center transition-all ${
                      formData.preferredDate === dateObj.iso
                        ? 'bg-[#E50920] border-[#E50920] text-white font-bold'
                        : 'bg-[#121214] border-[#1E1E22] text-[#A1A1AA] hover:border-[#707078]'
                    }`}
                  >
                    <div className="text-xs font-mono-tech">{dateObj.display}</div>
                  </button>
                ))}
              </div>

              {/* Time slots row */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        preferredTimeSlot: slot.time,
                      })
                    }
                    className={`p-2 rounded border text-center transition-all ${
                      formData.preferredTimeSlot === slot.time
                        ? 'bg-[#1A1113] border-[#E50920] text-[#FF263F] font-bold'
                        : 'bg-[#121214] border-[#1E1E22] text-[#A1A1AA] hover:border-[#707078]'
                    }`}
                  >
                    <div className="text-xs font-mono-tech">{slot.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact & Scope Information */}
            <div className="space-y-4 pt-2 border-t border-[#1E1E22]">
              <label className="text-xs font-mono-tech text-[#E50920] uppercase font-bold tracking-wider">
                3. CONTACT &amp; TARGET DETAILS
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase flex justify-between">
                    <span>FULL NAME *</span>
                    {errors.fullName && (
                      <span className="text-[#FF263F] text-[10px]">{errors.fullName}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase flex justify-between">
                    <span>WORK EMAIL *</span>
                    {errors.workEmail && (
                      <span className="text-[#FF263F] text-[10px]">{errors.workEmail}</span>
                    )}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@techfirm.com"
                    value={formData.workEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, workEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                    COMPANY / STARTUP
                  </label>
                  <input
                    type="text"
                    placeholder="Company or project name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                    TARGET ENVIRONMENT TYPE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. REST API, SaaS Web Portal"
                    value={formData.targetScopeType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        targetScopeType: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono-tech text-[#A1A1AA] uppercase">
                  ADDITIONAL SCOPE CONTEXT (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline any special testing windows, tech stack details, or security goals you want covered..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#29292D] rounded text-white text-xs sm:text-sm focus:outline-none focus:border-[#E50920] resize-none"
                />
              </div>

              <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ndaRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ndaRequired: e.target.checked,
                    })
                  }
                  className="rounded border-[#29292D] bg-[#121214] text-[#E50920] focus:ring-[#E50920]"
                />
                <span className="text-xs font-mono-tech text-[#A1A1AA]">
                  Mutual Non-Disclosure Agreement (NDA) required prior to call
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#1E1E22]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#E50920] hover:bg-[#FF263F] text-white font-semibold uppercase tracking-wider text-xs sm:text-sm rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#E50920]/25 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>SCHEDULING SESSION...</span>
                ) : (
                  <>
                    <span>CONFIRM SCOPING CONSULTATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Scope Mandate */}
        <ScopeMandate />
      </div>
    </div>
  );
};
