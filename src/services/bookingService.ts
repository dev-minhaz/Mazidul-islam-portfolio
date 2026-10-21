import { ConsultationBookingRequest, ConsultationSlot } from '../types/booking';
import { ServiceResponse } from './inquiryService';

export const bookingService = {
  getAvailableSlots(dateStr: string): ConsultationSlot[] {
    // Generate realistic professional security consultation time slots
    return [
      { id: 'slot-1', time: '10:00 AM UTC', available: true },
      { id: 'slot-2', time: '11:30 AM UTC', available: true },
      { id: 'slot-3', time: '02:00 PM UTC', available: true },
      { id: 'slot-4', time: '03:30 PM UTC', available: true },
      { id: 'slot-5', time: '05:00 PM UTC', available: true },
    ];
  },

  validateBooking(request: ConsultationBookingRequest): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!request.fullName.trim()) errors.fullName = 'Full name is required';
    if (!request.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.workEmail.trim())) {
      errors.workEmail = 'Please provide a valid work email';
    }
    if (!request.preferredDate) errors.preferredDate = 'Please select a preferred date';
    if (!request.preferredTimeSlot) errors.preferredTimeSlot = 'Please select a preferred time slot';

    return errors;
  },

  async scheduleConsultation(
    request: ConsultationBookingRequest
  ): Promise<ServiceResponse<ConsultationBookingRequest>> {
    const errors = this.validateBooking(request);
    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please resolve the highlighted validation errors.',
        errors,
      };
    }

    // Realistic async scheduling call
    await new Promise((resolve) => setTimeout(resolve, 850));

    return {
      success: true,
      message: 'Consultation scheduled successfully. A calendar invitation and secure meeting link will be sent to your email.',
      data: request,
    };
  },

  generateIcsCalendarFile(request: ConsultationBookingRequest, hostEmail: string): void {
    const eventTitle = `Security Scoping Consultation: Mazidul Islam Khan & ${request.company || request.fullName}`;
    const description = `Scoping & Technical Consultation\\nFocus: ${request.meetingFocus}\\nScope: ${request.targetScopeType}\\nNotes: ${request.notes || 'None'}`;
    
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mazidul Islam Khan//Cybersecurity Consultation//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:${description}
ORGANIZER;CN=Mazidul Islam Khan:mailto:${hostEmail}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Security-Consultation-${request.preferredDate || 'session'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
