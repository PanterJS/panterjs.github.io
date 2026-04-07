# 🌵 My Cactus Prototipo

Un catalogo digitale minimalista per mostrare la propria collezione di cactus e piante grasse. Sviluppato per essere leggero, veloce e pronto per **GitHub Pages**.

## 📁 Struttura del Progetto

* `index.html` - Struttura della pagina.
* `style.css` - Design e layout.
* `script.js` - Logica JavaScript (fetch dei dati).
* `data.json` - Database dei cactus.
* `imgs/` - Cartella immagini cactus.
* `downloads/` - Cartella documenti PDF.

## 🚀 Come aggiungere nuovi cactus

1. Salva la foto del tuo cactus nella cartella `imgs/`.
2. Apri `data.json`.
3. Aggiungi un nuovo oggetto alla lista seguendo questo schema:
   ```json
   {
     "nome": "Nome Scientifico",
     "soprannome": "Nome Comune",
     "descrizione": "Breve storia della pianta.",
     "immagine": "imgs/nome-file.jpg"
   }
