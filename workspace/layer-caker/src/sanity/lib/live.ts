import { defineLive, type StrictDefinedFetchType } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  strict: true,
});

// Shared 'use cache' boundary: sanityFetch calls cacheTag/cacheLife internally
// but doesn't create the boundary itself.
export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};
