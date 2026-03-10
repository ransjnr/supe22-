import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "nb6ptlb7";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "ransford-portfolio",
  title: "Ransford Oppong — Portfolio Studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("researchPost").title("Research Posts"),
            S.documentTypeListItem("publication").title("Publications"),
            S.divider(),
            S.documentTypeListItem("timelineEvent").title("Career Timeline"),
            S.documentTypeListItem("achievement").title("Achievements"),
            S.divider(),
            S.documentTypeListItem("startup").title("Startups"),
            S.documentTypeListItem("initiative").title("Initiatives"),
            S.documentTypeListItem("collaboration").title("Collaborations"),
            S.documentTypeListItem("service").title("Services"),
          ]),
    }),
    // GROQ query playground — useful during development
    visionTool(),
    // Markdown editor for research posts
    markdownSchema(),
  ],

  schema: {
    types: schemaTypes,
  },
});
