import { build } from "esbuild";
import { chmodSync } from "fs";

// --- build ---
await build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node18",

  // keep clean + debuggable for now
  sourcemap: false,
  minify: false,

  // 👇 adds shebang automatically
  banner: {
    js: "#!/usr/bin/env node"
  },

  // 👇 externalize node builtins (safe default)
  external: [
    "fs",
    "path",
    "os",
    "url",
    "module"
  ]
}).catch(() => process.exit(1));

// --- make executable (important for CLI) ---
chmodSync("dist/index.js", 0o755);

console.log("✅ Build complete → dist/index.js");