import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI", value: "AI" },
          { title: "ML", value: "ML" },
          { title: "Quantum", value: "Quantum" },
          { title: "Physics-ML", value: "Physics-ML" },
          { title: "Full-Stack", value: "Full-Stack" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
          { title: "Research", value: "research" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "demo",
      title: "Demo URL",
      type: "url",
    }),
    defineField({
      name: "paper",
      title: "Paper URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show on the homepage featured section",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required().min(2000).max(2030),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload a project screenshot or cover image",
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail URL (fallback)",
      type: "url",
      description: "External image URL (used if no uploaded thumbnail)",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "thumbnail" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `[${subtitle}]`, media };
    },
  },
  orderings: [
    { title: "Year (Newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
