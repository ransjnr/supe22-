import { defineField, defineType } from "sanity";

export const publicationSchema = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "venue",
      title: "Venue / Journal / Conference",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Paper", value: "paper" },
          { title: "Preprint", value: "preprint" },
          { title: "Conference", value: "conference" },
          { title: "Talk", value: "talk" },
          { title: "Poster", value: "poster" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "doi",
      title: "DOI",
      type: "url",
    }),
    defineField({
      name: "arxiv",
      title: "arXiv URL",
      type: "url",
    }),
    defineField({
      name: "pdf",
      title: "PDF URL",
      type: "url",
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "venue", year: "year" },
    prepare({ title, subtitle, year }) {
      return { title, subtitle: `${year} · ${subtitle}` };
    },
  },
  orderings: [
    { title: "Year (Newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
});
