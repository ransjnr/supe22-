import { defineField, defineType } from "sanity";

export const timelineEventSchema = defineType({
  name: "timelineEvent",
  title: "Career Timeline Event",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year / Period",
      type: "string",
      description: 'e.g. "2025" or "2023 – Present"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Role / Degree Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "institution",
      title: "Institution / Company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Work", value: "work" },
          { title: "Research", value: "research" },
          { title: "Achievement", value: "achievement" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first (most recent = 1)",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "institution", type: "type" },
    prepare({ title, subtitle, type }) {
      const emoji = { education: "🎓", work: "💼", research: "🔬", achievement: "🏆" };
      return { title, subtitle: `${emoji[type as keyof typeof emoji] || "•"} ${subtitle}` };
    },
  },
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
