"use client";

import { Calendar } from "lucide-react";

interface BookingWidgetProps {
  bookingUrl: string;
  title?: string;
  description?: string;
}

export default function BookingWidget({
  bookingUrl,
  title = "Book a Call",
  description = "Schedule a 30-minute discovery call to discuss your project, research collaboration, or consulting needs.",
}: BookingWidgetProps) {
  // Cal.com links embed via iframe; Google Calendar appointment links open in a new tab
  // because Google disallows framing. We detect which and choose the right treatment.
  const isGoogleCalendar = bookingUrl.includes("calendar.google.com");

  return (
    <div className="card-base overflow-hidden p-0">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-subtle flex items-center gap-3">
        <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
          <Calendar size={18} className="text-gold" />
        </div>
        <div>
          <h3 className="font-serif text-base text-primary-text">{title}</h3>
          <p className="text-xs text-primary-text/55 mt-0.5">{description}</p>
        </div>
      </div>

      {isGoogleCalendar ? (
        // Google Calendar blocks iframe embedding — show a styled CTA instead
        <div className="px-6 py-8 flex flex-col items-center text-center gap-4">
          <p className="text-sm text-primary-text/65 max-w-sm">
            Pick a time that works for you. The booking page will open in a new tab.
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Calendar size={15} />
            Open Booking Calendar
          </a>
          <p className="text-xs text-primary-text/35">Powered by Google Calendar</p>
        </div>
      ) : (
        // Cal.com and similar services allow iframe embedding
        <iframe
          src={bookingUrl}
          className="w-full border-0"
          style={{ height: 600 }}
          title={title}
          loading="lazy"
        />
      )}
    </div>
  );
}
