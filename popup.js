const slider = document.getElementById("maxTabsSlider");
const valueDisplay = document.getElementById("valueDisplay");
const saveBtn = document.getElementById("saveBtn");
const savedMsg = document.getElementById("savedMsg");

// Load current MAX_TABS
chrome.storage.sync.get(["maxTabs"], data => {
    const val = data.maxTabs || 6;
    slider.value = val;
    valueDisplay.textContent = val;
});

// Update display as slider moves
slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
});

// Save new value and show brief "Saved!" message
saveBtn.addEventListener("click", () => {
    const val = parseInt(slider.value, 10);
    chrome.storage.sync.set({ maxTabs: val }, () => {
        // Show Saved! message for 1 second
        savedMsg.style.display = "block";
        setTimeout(() => { savedMsg.style.display = "none"; }, 1000);
    });
});
