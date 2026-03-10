import { defineField, defineType } from "sanity";

export const researchPostSchema = defineType({
  name: "researchPost",
  title: "Research Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short description shown in cards and meta tags",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Quantum", value: "Quantum" },
          { title: "Medical AI", value: "Medical AI" },
          { title: "Research", value: "Research" },
          { title: "Physics-ML", value: "Physics-ML" },
          { title: "Engineering", value: "Engineering" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
      description: "Toggle to make this post visible on the site",
    }),
    defineField({
      name: "body",
      title: "Content (Markdown)",
      type: "markdown",
      description:
        "Write in Markdown. Code blocks with ```language syntax are highlighted automatically.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", published: "published" },
    prepare({ title, subtitle, published }) {
      return {
        title,
        subtitle: `${published ? "✅ Published" : "📝 Draft"} · ${subtitle || ""}`,
      };
    },
  },
  orderings: [
    { title: "Date (Newest)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
