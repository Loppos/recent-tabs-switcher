// Opties – bewaart optioneel een karakter (nu niet gebruikt door overlay, maar handig voor uitbreiding)
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("charInput");
  const saveBtn = document.getElementById("saveBtn");

  chrome.storage.sync.get(["displayChar"], (data) => {
    if (data.displayChar) input.value = data.displayChar;
  });

  saveBtn.addEventListener("click", () => {
    const val = input.value || "★";
    chrome.storage.sync.set({ displayChar: val }, () => {
      alert("Karakter opgeslagen: " + val);
    });
  });
});
