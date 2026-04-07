# 🌵 My Cactus Prototipo

Un catalogo digitale minimalista per mostrare la propria collezione di cactus e piante grasse. Sviluppato per essere leggero, veloce e pronto per **GitHub Pages**.

## 📁 Struttura del Progetto

* `index.html`: La struttura principale e la logica di rendering.
* `style.css`: Design responsive a tema desertico.
* `data.json`: Il "database" del progetto. Modifica questo file per aggiungere nuove piante.
* `imgs/`: Cartella destinata a contenere le foto dei cactus.

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
