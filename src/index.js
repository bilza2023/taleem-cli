#!/usr/bin/env node

import inquirer from "inquirer";
import { decksMenu } from "./modules/decks.js";
import { imagesMenu } from "./modules/images.js";
import { audioMenu } from "./modules/audio.js";

import { loadConfig } from "./config/loadConfig.js";
import { setPaths } from "./config/paths.js";

async function main() {
  // 🔥 LOAD CONFIG + INIT PATHS
  const config = await loadConfig();
  setPaths(config);

  while (true) {
    console.log("\n✨ Taleem CLI\n");

    const { module } = await inquirer.prompt([
      {
        type: "list",
        name: "module",
        message: "Choose module:",
        choices: ["Images", "Decks", "Audio", "Exit"]
      }
    ]);

    if (module === "Images") {
      await imagesMenu();
    }

    if (module === "Decks") {
      await decksMenu();
    }

    if (module === "Audio") {
      await audioMenu();
    }

    if (module === "Exit") {
      console.log("👋 Bye");
      process.exit(0);
    }
  }
}

main();