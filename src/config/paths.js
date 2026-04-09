import path from "path";

// 🔥 1 source of truth
export const BASE =
  process.env.TALEEM_CLI_BASE ||
  "/home/bilal-tariq/00--TALEEM/workspace";

// derived paths
export const PATHS = {
  base: BASE,

  decks: path.join(BASE, "decks"),
  images: path.join(BASE, "images"),
  audio: path.join(BASE, "audio"),

  builderDecks: path.join(BASE, "builder-decks"),
  upload: path.join(BASE, "upload")
};