# DIY - Recent Tab Switcher

A simple Chromium extension for quickly switching between recently used tabs, similar to Firefox's MRU tab switching.  
This version works without any overlay and does not show extra UI elements.

---

## Features

- Switch between the most recently used tabs in the current window.
- Keyboard shortcuts:
  - **Alt+Q** → Next most recently used tab
  - **Alt+Shift+Q** → Previous most recently used tab
  - Customizable in `chrome://extensions/shortcuts`
- MRU logic limited to the last 6 tabs.
- MRU list persists until the browser is closed (via `chrome.storage.session`).
- Fully privacy-friendly; no external communication or tracking.

---

## Developer Installation (Chromium / Edge / Brave)

1. Download or clone this repository.
2. Extract the files into a single folder:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - Optional: `options.html` and `options.js`
3. Open your browser and navigate to:
   - Brave: `brave://extensions/`
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
4. Enable **Developer Mode** (top-right corner).
5. Click **Load unpacked**.
6. Select the folder containing the extension.
7. The extension is now active and ready to use.

---

## Build as `.crx` file (optional)

1. Open `chrome://extensions/` or `edge://extensions/`.
2. Click **Pack extension**.
3. Choose the folder of the extension.
4. Optional: add a private key to keep updates consistent, otherwise a new `.crx` will be generated.
5. You will get a `.crx` file that can be shared or installed.

⚠️ **Note**: In modern browsers (like Chrome and Brave), standalone `.crx` files often **do not work** anymore.  
The safest and most reliable method is using **Load unpacked**.  
`.crx` files may only be installed via enterprise policies or through the official web store.

---

## Notes

- The extension only works in Chromium-based browsers (Chrome, Edge, Brave, Opera).
- The MRU list is tracked only within the current window.
- The MRU persists as long as the browser is open; it is cleared when the browser is fully closed.
- No overlay or ribbon is shown; functionality is purely via keyboard shortcuts.

---

### Example usage

1. Open multiple tabs.
2. Press **Alt+Q** to switch to the last used tab.
3. Press **Alt+Shift+Q** to go back.
4. The MRU list automatically keeps track of the last 6 tabs and remains active until the browser is closed.
