import { defineField, defineType } from "sanity";

export const initiativeSchema = defineType({
  name: "initiative",
  title: "Initiative",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Initiative Name",
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
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Forming", value: "forming" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "link",
      title: "Link / URL",
      type: "url",
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
    select: { title: "name", subtitle: "tagline" },
  },
});
