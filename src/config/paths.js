import path from "path";

let PATHS = null;

export function setPaths(config) {
  const root = process.cwd();

  PATHS = {
    root,

    upload: path.join(root, config.uploadDir),

    images: path.join(root, config.contentDir, "images"),
    audio: path.join(root, config.contentDir, "audio"),
    decks: path.join(root, config.contentDir, "decks"),

    builderDecks: path.join(root, config.builderDir)
  };
}

export function getPaths() {
  if (!PATHS) {
    throw new Error("PATHS not initialized");
  }
  return PATHS;
}