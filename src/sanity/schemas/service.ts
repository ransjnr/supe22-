import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service Package",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
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
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [{ type: "string" }],
      description: "List what the client receives",
    }),
    defineField({
      name: "engagement",
      title: "Engagement Duration",
      type: "string",
      description: 'e.g. "4–12 weeks"',
    }),
    defineField({
      name: "priceRange",
      title: "Price Range (optional)",
      type: "string",
      description: 'e.g. "$2,000–$5,000" or leave blank for "Contact for pricing"',
    }),
    defineField({
      name: "cta",
      title: "CTA Button Label",
      type: "string",
      description: 'e.g. "Scope a Project"',
    }),
    defineField({
      name: "featured",
      title: "Featured (Most Popular)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower = appears first",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return { title: `${featured ? "⭐ " : ""}${title}`, subtitle };
    },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
