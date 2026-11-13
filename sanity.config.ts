"use client";

/** The editing dashboard, mounted at /studio (see src/app/studio). */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "expression-concert",
  title: "Expression Concert",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Events")
              .schemaType("event")
              .child(S.documentTypeList("event").title("Events").defaultOrdering([{ field: "date", direction: "desc" }])),
          ]),
    }),
  ],
  apiVersion,
});
