import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "stats", title: "Stats" },
    { name: "profile", title: "Profile & Bio" },
    { name: "social", title: "Social Links" },
    { name: "booking", title: "Appointment Booking" },
  ],
  fields: [
    // ── Stats ──────────────────────────────────────────────────────────────────
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      group: "stats",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "projectsCompleted",
      title: "Projects Completed",
      type: "number",
      group: "stats",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "papersPublished",
      title: "Papers / Presentations",
      type: "number",
      group: "stats",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "countriesReached",
      title: "Countries Reached",
      type: "number",
      group: "stats",
      validation: (r) => r.required().min(0),
    }),

    // ── Profile & Bio ──────────────────────────────────────────────────────────
    defineField({
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      group: "profile",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Screen-reader description of the photo",
        }),
      ],
    }),
    defineField({
      name: "bioHeading",
      title: "About Page Heading",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status",
      type: "string",
      group: "profile",
      description: 'Shown in hero badge, e.g. "Available for consulting & research collaborations"',
    }),
    defineField({
      name: "contactEmail",
      title: "Contact / Display Email",
      type: "string",
      group: "profile",
      description: "Public email shown in the about page and footer",
    }),

    // ── Social Links ───────────────────────────────────────────────────────────
    defineField({
      name: "socialGithub",
      title: "GitHub URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "socialLinkedin",
      title: "LinkedIn URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "socialTwitter",
      title: "Twitter / X URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "socialGoogleScholar",
      title: "Google Scholar URL",
      type: "url",
      group: "social",
    }),

    // ── Appointment Booking ────────────────────────────────────────────────────
    defineField({
      name: "appointmentBookingUrl",
      title: "Appointment Booking URL",
      type: "url",
      group: "booking",
      description:
        'Google Calendar Appointment Schedules URL (calendar.google.com/calendar/appointments/…) or a Cal.com link. Leave blank to hide the booking section.',
    }),
    defineField({
      name: "bookingTitle",
      title: "Booking Section Title",
      type: "string",
      group: "booking",
      description: 'Defaults to "Book a Call"',
    }),
    defineField({
      name: "bookingDescription",
      title: "Booking Section Description",
      type: "string",
      group: "booking",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
