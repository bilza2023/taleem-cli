import fs from "fs";
import path from "path";
import inquirer from "inquirer";

import { getPaths } from "../config/paths.js";

const VALID_EXT = [".mp3", ".opus", ".ogg"];

// helper
function getDirs() {
  const PATHS = getPaths();

  return {
    UPLOAD_DIR: PATHS.upload,
    AUDIO_DIR: PATHS.audio
  };
}

// --- ensure folders ---
function ensureSetup() {
  const { UPLOAD_DIR, AUDIO_DIR } = getDirs();

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
  const { UPLOAD_DIR, AUDIO_DIR } = getDirs();

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
      { type: "input", name: "pause", message: "Press Enter..." }
    ]);

    return;
  }

  for (const file of audios) {
    const src = path.join(UPLOAD_DIR, file);
    const dest = path.join(AUDIO_DIR, file);

    if (!fs.existsSync(dest)) {
      fs.renameSync(src, dest);
    }
  }

  console.log("✅ Done\n");
}