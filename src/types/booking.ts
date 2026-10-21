export interface ConsultationBookingRequest {
  fullName: string;
  workEmail: string;
  company: string;
  targetScopeType: string;
  preferredDate: string;
  preferredTimeSlot: string;
  meetingFocus: 'Pre-Engagement Scoping' | 'Architecture Security Review' | 'Vulnerability Remediation Walkthrough' | 'General Advisory';
  notes: string;
  timezone: string;
  ndaRequired: boolean;
}

export interface ConsultationSlot {
  id: string;
  time: string;
  available: boolean;
}
