# DIY - Recent Tab Switcher

Een eenvoudige Chromium-extensie voor het snel wisselen tussen recent gebruikte tabbladen, vergelijkbaar met Firefox's MRU-tab-switching.  
Deze versie werkt zonder overlay en toont geen extra UI-elementen.

---

## Functies

- Wissel tussen de meest recent gebruikte tabbladen in je huidige venster.
- Sneltoetsen:
  - **Alt+Q** → Volgende recent gebruikte tab
  - **Alt+Shift+Q** → Vorige recent gebruikte tab
  - Aanpasbaar in `chrome://extensions/shortcuts`
- MRU-logica beperkt tot de laatste 6 tabbladen.
- Volledig privacyvriendelijk; geen externe communicatie of tracking.

---

## Installatie voor ontwikkelaars (Chromium / Edge / Brave)

1. Download of clone deze repository.
2. Pak de bestanden uit of zorg dat ze in één map staan:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - Optioneel: `options.html` en `options.js`
3. Open je browser en ga naar:
   - Brave: `brave://extensions/`
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
4. Zet **Developer Mode** aan (rechtsboven).
5. Klik op **Load unpacked**.
6. Selecteer de map waarin de extensie staat.
7. Extensie is nu actief en klaar voor gebruik.

---

## Build als `.crx` bestand (optioneel)

1. Open `chrome://extensions/` of `edge://extensions/`.
2. Klik op **Pack extension**.
3. Kies de map van de extensie.
4. Optioneel: voeg een private key toe om updates te behouden, anders wordt een nieuwe `.crx` gemaakt.
5. Je ontvangt een `.crx` bestand dat je kunt delen of installeren.

---

## Opmerkingen

- De extensie werkt alleen in Chromium-gebaseerde browsers (Chrome, Edge, Brave, Opera).
- De MRU-lijst wordt alleen bijgehouden binnen het huidige venster.
- Er wordt geen overlay of lint getoond; het is puur functioneel via sneltoetsen.

---

### Voorbeeld gebruik

1. Open meerdere tabbladen.
2. Druk **Alt+Q** om naar de laatst gebruikte tab te wisselen.
3. Druk **Alt+Shift+Q** om terug te gaan.
4. De MRU-lijst houdt automatisch de laatste 6 tabbladen bij.
