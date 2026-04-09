
# Taleem CLI

A minimal, production-focused CLI for building and managing Taleem content.

No UI.
No Express.
No HTML.

Just fast, deterministic workflows.

---

## 🧠 Philosophy

Taleem CLI is built around a simple idea:

> **Content is code → process it with scripts → keep everything deterministic**

* No manual editing of JSON
* No dashboards
* No state bugs
* No unnecessary abstraction

---

## 📦 System Overview

```
builder-decks (source JS)
↓
taleem-cli (build pipeline)
↓
content/decks (JSON output)
↓
taleem-player (runtime)
```

Assets:

```
upload → processed → content
```

---

## ⚙️ Config (NEW 🔥)

Taleem CLI is **config-driven**.

It reads:

```
taleem.config.js
```

from the **current working directory**.

---

### Example

```js
export default {
  contentDir: "./content",
  builderDir: "./builder-decks",
  uploadDir: "./upload"
};
```

---

### Important Rule

> CLI always uses the folder you run it from

```bash
cd my-project
npx taleem
```

👉 config must be inside `my-project`

---

## 📁 Folder Structure (per project)

```
my-project/
  taleem.config.js

  builder-decks/
  upload/

  content/
    images/
    audio/
    decks/
```

---

## 🚀 Features

### 1. Images (Smart Ingestion)

* Drop images into `/upload`
* CLI asks for:

  * prompt
  * tags
* Moves to `/content/images`
* Stores metadata in `images.json`

✔ No overwrite
✔ No delete
✔ Editable metadata

---

### 2. Audio (Simple Pipe)

* Drop `.mp3`, `.opus`, `.ogg` into `/upload`
* CLI moves to `/content/audio`

✔ No metadata
✔ No prompts
✔ Skip if exists

---

### 3. Decks (Compiler)

* Source: `/builder-decks/*.js`
* Output: `/content/decks/*.json`

Run:

```
Decks → Build Decks
```

✔ Always rebuild all
✔ No manual JSON
✔ Deterministic output

---

### 4. New Deck

Creates:

```
/builder-decks/new-deck.js
```

✔ Safe (no overwrite)

---

## ⚙️ Usage

```bash
npx taleem
```

or:

```bash
npm run taleem
```

---

## 🎯 Core Principles

* **Deterministic** → same input = same output
* **Stateless** → no hidden state
* **Batch-first** → process everything cleanly
* **Builder-driven** → JSON is output, not source

---

## ❌ What this is NOT

* Not a CMS
* Not a dashboard
* Not a visual editor

---

## ✅ What this IS

> A fast, reliable **content pipeline for education**

---

## 🔥 Why this works

* No UI = no bugs
* CLI = faster workflows
* Builder = guaranteed correctness
* Filesystem = simple and transparent

---

## 🧠 Final Thought

> “Better error checking than UI.”

---

## Status

✅ Config system complete
✅ Images pipeline complete
✅ Audio pipeline complete
✅ Deck build system complete
🚀 Ready for real multi-project use

