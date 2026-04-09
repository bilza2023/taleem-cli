import fs from "fs";
import path from "path";
import inquirer from "inquirer";

const BASE = "/home/bilal-tariq/00--TALEEM/taleem-cli";

const UPLOAD_DIR = path.join(BASE, "upload");
const AUDIO_DIR = path.join(BASE, "content/audio");

const VALID_EXT = [".mp3", ".opus", ".ogg"];

// --- ensure folders ---
function ensureSetup() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }
}

// --- menu ---
export async function audioMenu() {
  ensureSetup();

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Audio → Choose action",
        choices: ["Upload Audio", "Back"]
      }
    ]);

    if (action === "Upload Audio") await processAudio();
    if (action === "Back") return;
  }
}

// --- main logic ---
async function processAudio() {
  console.clear();
  console.log("✨ Taleem CLI\n");
  console.log("🎧 Upload Audio\n");

  const files = fs.readdirSync(UPLOAD_DIR);

  const audios = files.filter(f =>
    VALID_EXT.includes(path.extname(f).toLowerCase())
  );

  if (audios.length === 0) {
    console.log("📭 No audio files found\n");

    await inquirer.prompt([
      { type: "input", name: "pause", message: "Press Enter to continue..." }
    ]);

    return;
  }

  let moved = [];
  let skipped = [];

  for (const file of audios) {
    const src = path.join(UPLOAD_DIR, file);
    const dest = path.join(AUDIO_DIR, file);

    if (fs.existsSync(dest)) {
      skipped.push(file);
      continue;
    }

    fs.renameSync(src, dest);
    moved.push(file);
  }

  // --- summary ---
  console.log("📦 Processing complete\n");

  if (moved.length > 0) {
    console.log("✅ Moved:");
    moved.forEach(f => console.log("  -", f));
    console.log("");
  }

  if (skipped.length > 0) {
    console.log("⚠️ Skipped (already exists):");
    skipped.forEach(f => console.log("  -", f));
    console.log("");
  }

  console.log(`Total → moved: ${moved.length}, skipped: ${skipped.length}\n`);

  // --- pause ---
  await inquirer.prompt([
    { type: "input", name: "pause", message: "Press Enter to continue..." }
  ]);
}