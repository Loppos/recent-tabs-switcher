// Verwijder oude overlay als die er is
const oldOverlay = document.getElementById('rts-overlay');
if (oldOverlay) oldOverlay.remove();

// Maak nieuwe overlay
const overlay = document.createElement('div');
overlay.id = 'rts-overlay';
overlay.textContent = 'MRU Tab Debug: initializing...';
document.body.appendChild(overlay);

// Luister naar berichten van background.js
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'showOverlay') {
        overlay.textContent = `MRU Tab Debug:
Tab ID: ${msg.tabId}
Title: ${msg.title}
MRU Pos: ${msg.position + 1} / ${msg.total}`;
        overlay.style.display = 'block';

        // verdwijnt automatisch na 2 seconden
        setTimeout(() => overlay.style.display = 'none', 2000);
    }
});
