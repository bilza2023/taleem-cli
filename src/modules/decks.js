import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import ora from "ora";

// ✅ use config
import { PATHS } from "../config/paths.js";

const SRC_DIR = PATHS.builderDecks;
const OUT_DIR = PATHS.decks;

// --- ensure setup ---
function ensureSetup() {
  if (!fs.existsSync(SRC_DIR)) {
    fs.mkdirSync(SRC_DIR, { recursive: true });
  }

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
}

// --- menu ---
export async function decksMenu() {
  ensureSetup();

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Decks → Choose action",
        choices: ["Build Decks", "New Deck", "Back"]
      }
    ]);

    if (action === "Build Decks") await buildDecks();
    if (action === "New Deck") await createDeck();
    if (action === "Back") return;
  }
}


// --- BUILD ALL DECKS ---
async function buildDecks() {
  console.clear();
  console.log("✨ Taleem CLI\n");
  console.log("📦 Building Decks...\n");

  const files = fs.readdirSync(SRC_DIR)
    .filter(f => f.endsWith(".js"));

  if (files.length === 0) {
    console.log("📭 No builder decks found\n");
    return;
  }

  for (const file of files) {
    const spinner = ora(`Building ${file}`).start();

    try {
      const fullPath = path.join(SRC_DIR, file);

      // 🔥 dynamic import (important: fresh load)
      const module = await import(`file://${fullPath}?update=${Date.now()}`);

      const buildFn = module.default || module.build;

      if (!buildFn) {
        throw new Error("No default export or build() found");
      }

      const deck = await buildFn();

      const outputName = file.replace(".js", ".json");
      const outputPath = path.join(OUT_DIR, outputName);

      fs.writeFileSync(outputPath, JSON.stringify(deck, null, 2));

      spinner.succeed(`Built: ${outputName}`);
    } catch (err) {
      spinner.fail(`Error in ${file}`);
      console.log("   ", err.message);
    }
  }

  console.log("\n🎉 All decks built\n");
}


// --- CREATE NEW DECK ---
async function createDeck() {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter new deck name:",
      validate: v => v ? true : "Required"
    }
  ]);

  const fileName = `${name}.js`;
  const filePath = path.join(SRC_DIR, fileName);

  if (fs.existsSync(filePath)) {
    console.log("❌ Deck already exists");
    return;
  }

  const template = `import Builder from "taleem-builder";

export default function build() {
  const b = new Builder();

  b.meta({ name: "${name}" });

  b.background()
    .color("#111111")
    .image(null)
    .opacity(0.3);

  b.at(0)
    .titleAndSubtitle()
    .title("Title Here", 0)
    .subtitle("Subtitle here", 2);

  b.end(10);

  return b.build();
}
`;

  fs.writeFileSync(filePath, template);

  console.log("✅ Created:", fileName);
}