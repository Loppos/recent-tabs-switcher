let MAX_TABS = 6;               // default max MRU tabs
let recentTabs = [];
let historyIndex = -1;
let isSwitching = false;
let altStartTabId = null;
let lastSwitchTime = 0;
const MRU_DELAY = 369;          // ms

// --- Persist MRU in session storage ---
function saveMRU() {
    chrome.storage.session.set({ recentTabs });
}

// Restore MRU on startup
chrome.storage.session.get(["recentTabs"], data => {
    if (data.recentTabs) {
        recentTabs = data.recentTabs;
        console.log("[RTS] MRU restored:", recentTabs.join(","));
    }
});

// --- Clean MRU from closed tabs ---
function cleanMRU(callback) {
    chrome.tabs.query({}, tabs => {
        const existingTabIds = new Set(tabs.map(t => t.id));
        recentTabs = recentTabs.filter(id => existingTabIds.has(id));
        if (callback) callback();
    });
}

// --- Update MRU on tab activation ---
chrome.tabs.onActivated.addListener(activeInfo => {
    const tabId = activeInfo.tabId;

    if (!isSwitching) {
        if (!altStartTabId) recentTabs = recentTabs.filter(id => id !== tabId);  // remove duplicates
        recentTabs.unshift(tabId);
        recentTabs = [...new Set(recentTabs)];                                  // ensure unique
        if (recentTabs.length > MAX_TABS) recentTabs = recentTabs.slice(0, MAX_TABS); // trim
        historyIndex = -1;
        saveMRU();
        console.log("[RTS] MRU updated:", recentTabs.join(","));
    }
});

// --- Get target tab ID ---
function getTargetTabId(forward = true) {
    if (recentTabs.length < 2) return null;
    if (historyIndex === -1) historyIndex = 0;
    const targetIndex = forward
        ? (historyIndex + 1) % recentTabs.length
        : (historyIndex - 1 + recentTabs.length) % recentTabs.length;
    historyIndex = targetIndex;
    return recentTabs[targetIndex];
}

// --- Finalize MRU after switch ---
function finalizeMRU(currentTabId) {
    if (!altStartTabId || altStartTabId === currentTabId) return;

    cleanMRU(() => {
        recentTabs = recentTabs.filter(id => id !== currentTabId && id !== altStartTabId);
        recentTabs.unshift(currentTabId);
        recentTabs.splice(1, 0, altStartTabId);
        if (recentTabs.length > MAX_TABS) recentTabs = recentTabs.slice(0, MAX_TABS);
        altStartTabId = null;
        historyIndex = -1;
        saveMRU();
        console.log("[RTS] MRU finalized:", recentTabs.join(","));
    });
}

// --- Handle tab switch commands ---
chrome.commands.onCommand.addListener(command => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (!tabs.length) return;
        const currentTabId = tabs[0].id;

        if (!altStartTabId) altStartTabId = currentTabId;

        cleanMRU(() => {
            let targetTabId;
            if (command === "switch-next") targetTabId = getTargetTabId(true);
            else if (command === "switch-previous") targetTabId = getTargetTabId(false);
            else return;

            if (!targetTabId) return;

            isSwitching = true;
            chrome.tabs.update(targetTabId, { active: true }, () => {
                setTimeout(() => { isSwitching = false; }, 50);
                lastSwitchTime = Date.now();

                setTimeout(() => {
                    if (Date.now() - lastSwitchTime >= MRU_DELAY) {
                        chrome.tabs.query({ active: true, currentWindow: true }, tabs2 => {
                            if (!tabs2.length) return;
                            finalizeMRU(tabs2[0].id);
                        });
                    }
                }, MRU_DELAY + 50);
            });
        });
    });
});

// --- Listen for MAX_TABS changes from popup ---
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.maxTabs) {
        MAX_TABS = changes.maxTabs.newValue;
        console.log("[RTS] MAX_TABS updated to", MAX_TABS);

        // Trim MRU retroactively
        recentTabs = [...new Set(recentTabs)].slice(0, MAX_TABS);
        saveMRU();
        console.log("[RTS] MRU trimmed:", recentTabs.join(","));
    }
});
