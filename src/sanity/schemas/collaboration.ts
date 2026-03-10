import { defineField, defineType } from "sanity";

export const collaborationSchema = defineType({
  name: "collaboration",
  title: "Collaboration Opportunity",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "area",
      title: "Research / Tech Area",
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
      name: "ideal",
      title: "Ideal Collaborator",
      type: "string",
      description: "Who is the ideal collaborator?",
    }),
    defineField({
      name: "commitment",
      title: "Time Commitment",
      type: "string",
      description: 'e.g. "6–12 months", "Part-time"',
    }),
    defineField({
      name: "open",
      title: "Currently Open",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "area", open: "open" },
    prepare({ title, subtitle, open }) {
      return { title, subtitle: `${open ? "🟢 Open" : "🔴 Closed"} · ${subtitle}` };
    },
  },
});
