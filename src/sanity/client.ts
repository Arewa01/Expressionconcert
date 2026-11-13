import { createClient } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({ projectId: projectId || "missing", dataset, apiVersion, useCdn: true });

const builder = createImageUrlBuilder({ projectId: projectId || "missing", dataset });

/** A web-sized image URL that respects the crop and focal point chosen in the Studio. */
export const imageUrl = (source: SanityImageSource, width = 1600) => builder.image(source).width(width).fit("max").auto("format").url();
