# DIY - Recent Tab Switcher

A simple Chromium extension for quickly switching between recently used tabs, similar to Firefox's MRU tab switching.  
This version works without an overlay and shows no additional UI elements.

---

## Features

- Switch between the most recently used tabs in your current window.
- Keyboard shortcuts:
  - **Alt+Q** → Next recently used tab
  - **Alt+Shift+Q** → Previous recently used tab
  - Customizable via `chrome://extensions/shortcuts`
- MRU logic tracks the last 6 tabs only.
- Fully privacy-friendly; no external communication or tracking.

---

## Developer Installation (Chromium / Edge / Brave)

1. Download or clone this repository.
2. Extract the files or keep them in a single folder:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - Optional: `options.html` and `options.js`
3. Open your browser and go to:
   - Brave: `brave://extensions/`
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
4. Enable **Developer Mode** (top right).
5. Click **Load unpacked**.
6. Select the folder containing the extension.
7. The extension is now active and ready to use.

---

## Build as a `.crx` File (Optional)

1. Open `chrome://extensions/` or `edge://extensions/`.
2. Click **Pack extension**.
3. Choose the extension folder.
4. Optionally, add a private key to maintain updates, otherwise a new `.crx` will be created.
5. You will get a `.crx` file which can be shared or installed.

---

## Notes

- The extension only works in Chromium-based browsers (Chrome, Edge, Brave, Opera).
- The MRU list is maintained only within the current window.
- No overlay or ribbon is shown; it’s purely functional through keyboard shortcuts.

---

### Example Usage

1. Open multiple tabs.
2. Press **Alt+Q** to switch to the most recently used tab.
3. Press **Alt+Shift+Q** to switch back.
4. The MRU list automatically keeps track of the last 6 tabs.