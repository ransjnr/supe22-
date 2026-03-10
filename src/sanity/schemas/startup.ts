import { defineField, defineType } from "sanity";

export const startupSchema = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
      description: 'e.g. "Founder & CEO", "CTO"',
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Stealth", value: "stealth" },
          { title: "Acquired", value: "acquired" },
          { title: "Sunset", value: "sunset" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "year",
      title: "Founded Year",
      type: "number",
    }),
    defineField({
      name: "link",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "logo" },
  },
});
