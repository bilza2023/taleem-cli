import fs from "fs";
import path from "path";
import inquirer from "inquirer";

const BASE = "/home/bilal-tariq/00--TALEEM/taleem-cli";
const UPLOAD_DIR = path.join(BASE, "upload");
const IMAGES_DIR = path.join(BASE, "content/images");
const DB_PATH = path.join(BASE, "content/images.json");

const VALID_EXT = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

// --- ensure setup ---
function ensureSetup() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

// --- db helpers ---
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// --- menu ---
export async function imagesMenu() {
  ensureSetup();

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Images → Choose action",
        choices: ["Process Uploads", "Edit Metadata", "List Images", "Back"]
      }
    ]);

    if (action === "Process Uploads") await processUploads();
    if (action === "Edit Metadata") await editImage();
    if (action === "List Images") listImages();
    if (action === "Back") return;
  }
}

// --- process uploads ---
async function processUploads() {
    const files = fs.readdirSync(UPLOAD_DIR);
  
    const images = files.filter(f =>
      VALID_EXT.includes(path.extname(f).toLowerCase())
    );
  
    if (images.length === 0) {
      console.log("📭 No images in upload folder");
      return;
    }
  
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const src = path.join(UPLOAD_DIR, file);
      const dest = path.join(IMAGES_DIR, file);
  
      // skip if exists
      if (fs.existsSync(dest)) {
        console.log(`⚠️ Skipping (exists): ${file}`);
        continue;
      }
  
      // 🔥 CLEAR SCREEN
      console.clear();
  
      // 🔥 HEADER
      console.log("✨ Taleem CLI\n");
      console.log(`📁 Image ${i + 1} / ${images.length}`);
      console.log(`file: ${file}`);
      console.log("-------------------------\n");
  
      const { prompt, tags } = await inquirer.prompt([
        {
          type: "input",
          name: "prompt",
          message: "🧠 Prompt:",
          validate: v => v ? true : "Required"
        },
        {
          type: "input",
          name: "tags",
          message: "🏷 Tags (comma separated):"
        }
      ]);
  
      // move file
      fs.renameSync(src, dest);
  
      // update db
      const db = readDB();
  
      db.push({
        filename: file,
        prompt,
        tags: tags
          .split(",")
          .map(t => t.trim())
          .filter(Boolean)
      });
  
      writeDB(db);
  
      console.log(`\n✅ Saved: ${file}`);
  
      // 🔥 small pause (optional smoothness)
      await new Promise(r => setTimeout(r, 400));
    }
  
    console.clear();
    console.log("🎉 Done processing uploads\n");
  }

// --- edit metadata ---
async function editImage() {
  const db = readDB();

  if (db.length === 0) {
    console.log("No images found.");
    return;
  }

  const { filename } = await inquirer.prompt([
    {
      type: "list",
      name: "filename",
      message: "Select image:",
      choices: db.map(img => img.filename)
    }
  ]);

  const image = db.find(i => i.filename === filename);

  const { prompt, tags } = await inquirer.prompt([
    {
      type: "input",
      name: "prompt",
      message: "Edit prompt:",
      default: image.prompt
    },
    {
      type: "input",
      name: "tags",
      message: "Edit tags:",
      default: image.tags.join(", ")
    }
  ]);

  image.prompt = prompt;
  image.tags = tags
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  writeDB(db);

  console.log("✅ Updated:", filename);
}

// --- list ---
function listImages() {
  const db = readDB();

  if (db.length === 0) {
    console.log("No images found.");
    return;
  }

  console.log("\n📚 Images:\n");

  db.forEach((img, i) => {
    console.log(`${i + 1}. ${img.filename}`);
    console.log(`   🧠 ${img.prompt}`);
    console.log(`   🏷 ${img.tags.join(", ")}`);
  });

  console.log("");
}