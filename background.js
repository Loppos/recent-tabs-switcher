const MAX_TABS = 6;
let recentTabs = [];
let historyIndex = -1;
let isSwitching = false;
let altStartTabId = null;
let lastSwitchTime = 0;
const MRU_DELAY = 369; // ms

// Save MRU list to session storage
function saveMRU() {
    chrome.storage.session.set({ recentTabs });
}

// Restore MRU list on startup
chrome.storage.session.get(["recentTabs"], data => {
    if (data.recentTabs) {
        recentTabs = data.recentTabs;
        console.log("[RTS] MRU restored – recentTabs:", recentTabs.join(","));
    }
});

// Update MRU list when a tab is activated
chrome.tabs.onActivated.addListener(activeInfo => {
    const tabId = activeInfo.tabId;
    if (!isSwitching) {
        if (!altStartTabId) recentTabs = recentTabs.filter(id => id !== tabId);
        recentTabs.unshift(tabId);
        if (recentTabs.length > MAX_TABS) recentTabs.pop();
        historyIndex = -1;
        saveMRU();
        console.log("[RTS] MRU updated – recentTabs:", recentTabs.join(","));
    }
});

function getTargetTabId(forward = true) {
    if (recentTabs.length < 2) return null;
    if (historyIndex === -1) historyIndex = 0;
    const targetIndex = forward
        ? (historyIndex + 1) % recentTabs.length
        : (historyIndex - 1 + recentTabs.length) % recentTabs.length;
    historyIndex = targetIndex;
    return recentTabs[targetIndex];
}

function finalizeMRU(currentTabId) {
    if (!altStartTabId || altStartTabId === currentTabId) return;
    recentTabs = recentTabs.filter(id => id !== currentTabId && id !== altStartTabId);
    recentTabs.unshift(currentTabId);
    recentTabs.splice(1, 0, altStartTabId);
    if (recentTabs.length > MAX_TABS) recentTabs = recentTabs.slice(0, MAX_TABS);
    altStartTabId = null;
    historyIndex = -1;
    saveMRU();
    console.log("[RTS] MRU finalized – recentTabs:", recentTabs.join(","));
}

// Handle tab switch commands
chrome.commands.onCommand.addListener(command => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (!tabs.length) return;
        const currentTabId = tabs[0].id;

        if (!altStartTabId) altStartTabId = currentTabId;

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
