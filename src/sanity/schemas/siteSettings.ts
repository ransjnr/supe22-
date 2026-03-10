import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "projectsCompleted",
      title: "Projects Completed",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "papersPublished",
      title: "Papers / Presentations",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "countriesReached",
      title: "Countries Reached",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "bioHeading",
      title: "About Page Heading",
      type: "string",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status",
      type: "string",
      description: 'Shown in hero badge, e.g. "Available for consulting & research collaborations"',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
