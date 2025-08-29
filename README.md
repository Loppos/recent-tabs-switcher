# DIY - Recent Tab Switcher

A simple Chromium extension for quickly switching between recently used tabs, similar to Firefox's MRU tab switching.  
This version works without overlays or extra UI elements.

---

## Features

- Switch between the most recently used tabs in your current window.
- Keyboard shortcuts:
  - **Alt+Q** → Next recently used tab
  - **Alt+Shift+Q** → Previous recently used tab
  - Configurable in `chrome://extensions/shortcuts`
- MRU logic limited to the last 6 tabs.
- Fully privacy-friendly; no external communication or tracking.
- Persistent MRU: remembers recently used tabs until the browser is closed.
- Automatically cleans MRU of closed tabs to prevent errors.

---

## Developer Installation (Chromium / Edge / Brave)

1. Download or clone this repository.
2. Ensure all files are in a single folder:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - Optional: `options.html` and `options.js`
3. Open your browser and go to:
   - Brave: `brave://extensions/`
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
4. Enable **Developer Mode** (top-right).
5. Click **Load unpacked**.
6. Select the folder containing the extension.
7. The extension is now active and ready to use.

---

## Build as `.crx` file (optional)

1. Open `chrome://extensions/` or `edge://extensions/`.
2. Click **Pack extension**.
3. Choose the extension folder.
4. Optionally add a private key to maintain updates; otherwise, a new `.crx` is created.
5. You will receive a `.crx` file that can be shared or installed.

> ⚠️ Note: Modern Chromium-based browsers often restrict `.crx` installation outside the store. Using **Load unpacked** in Developer Mode is usually the easiest method.

---

## Notes

- Works only in Chromium-based browsers (Chrome, Edge, Brave, Opera).
- MRU is tracked per window.
- No overlay or ribbon is shown; the functionality is purely via keyboard shortcuts.
- Closed tabs are automatically removed from MRU to prevent errors.
- MRU persists until the browser is closed.

---

## Example Usage

1. Open multiple tabs.
2. Press **Alt+Q** to switch to the last used tab.
3. Press **Alt+Shift+Q** to go back.
4. MRU automatically keeps track of the last 6 tabs and skips closed tabs.

---

## Troubleshooting

- If you see "No tab with id" errors, make sure you have the latest `background.js` which automatically cleans MRU of closed tabs.
- Persistent MRU requires a modern Chromium browser that supports `chrome.storage.session`.
