import fs from "fs";
import path from "path";

export async function loadConfig() {
  const root = process.cwd();
  const configPath = path.join(root, "taleem.config.js");

  if (fs.existsSync(configPath)) {
    const config = await import(`file://${configPath}`);
    console.log("📦 Using config:", configPath);
    return config.default;
  }

  console.log("⚠️ No config found, using defaults");

  return {
    contentDir: "./content",
    builderDir: "./builder-decks",
    uploadDir: "./upload"
  };
}