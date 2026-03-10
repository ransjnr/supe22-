import { defineField, defineType } from "sanity";

export const achievementSchema = defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuer / Organization",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Award", value: "award" },
          { title: "Recognition", value: "recognition" },
          { title: "Milestone", value: "milestone" },
          { title: "Grant", value: "grant" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "issuer", year: "year" },
    prepare({ title, subtitle, year }) {
      return { title, subtitle: `${year} · ${subtitle}` };
    },
  },
});
