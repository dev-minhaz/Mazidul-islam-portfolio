export interface AssessmentInquiryPayload {
  fullName: string;
  workEmail: string;
  company?: string;
  service: string;
  targetType: string;
  timeline: string;
  scopeDetails: string;
  honeypot?: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export const inquiryService = {
  validateInquiry(payload: AssessmentInquiryPayload): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!payload.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (payload.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }

    if (!payload.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.workEmail.trim())) {
      errors.workEmail = 'Please provide a valid email address';
    }

    if (!payload.scopeDetails.trim()) {
      errors.scopeDetails = 'Please provide details about the project scope or target environment';
    } else if (payload.scopeDetails.trim().length < 15) {
      errors.scopeDetails = 'Please provide at least 15 characters of project context';
    }

    return errors;
  },

  async submitInquiry(payload: AssessmentInquiryPayload): Promise<ServiceResponse<AssessmentInquiryPayload>> {
    // Spam honeypot detection
    if (payload.honeypot) {
      return {
        success: false,
        message: 'Spam detected. Inquiry rejected.',
      };
    }

    const errors = this.validateInquiry(payload);
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors,
      };
    }

    // Realistic API submission simulation with clean integration boundary
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: 'Assessment inquiry received and validated. A scoping response will be sent within 24–48 hours.',
      data: payload,
    };
  },

  formatMailtoUrl(payload: AssessmentInquiryPayload, recipientEmail: string): string {
    const subject = encodeURIComponent(
      `[Security Assessment Request] ${payload.company ? payload.company + ' - ' : ''}${payload.service}`
    );
    const body = encodeURIComponent(
      `Hello Mazidul,\n\n` +
      `I would like to initiate a scoped security assessment.\n\n` +
      `CLIENT DETAILS:\n` +
      `Name: ${payload.fullName}\n` +
      `Work Email: ${payload.workEmail}\n` +
      `Company / Organization: ${payload.company || 'N/A'}\n\n` +
      `ASSESSMENT PARAMETERS:\n` +
      `Requested Service: ${payload.service}\n` +
      `Target Environment: ${payload.targetType}\n` +
      `Estimated Timeline: ${payload.timeline}\n\n` +
      `PROJECT SCOPE & TARGET DETAILS:\n` +
      `${payload.scopeDetails}\n\n` +
      `Looking forward to receiving the rules of engagement and scoping questionnaire.\n`
    );
    return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  },

  formatClipboardSummary(payload: AssessmentInquiryPayload): string {
    return (
      `==========================================\n` +
      `SECURITY ASSESSMENT INTAKE SUMMARY\n` +
      `==========================================\n` +
      `Client Name: ${payload.fullName}\n` +
      `Work Email:  ${payload.workEmail}\n` +
      `Company:     ${payload.company || 'N/A'}\n` +
      `Service:     ${payload.service}\n` +
      `Environment: ${payload.targetType}\n` +
      `Timeline:    ${payload.timeline}\n\n` +
      `Scope & Goals:\n${payload.scopeDetails}\n` +
      `==========================================\n`
    );
  },
};
