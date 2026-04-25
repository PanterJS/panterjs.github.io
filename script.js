document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');
    const viewer = document.getElementById('image-viewer');
    const fullImg = document.getElementById('full-image');
    const caption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-modal');

    // Funzione per generare le stelline
    function generaStelle(livello) {
        const piena = '★';
        const vuota = '☆';
        const rating = Math.min(Math.max(livello, 1), 5);
        return piena.repeat(rating) + vuota.repeat(5 - rating);
    }

    async function loadCactus() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Errore caricamento database');
            const data = await response.json();
            
            data.piante.sort((a, b) => a.nome.localeCompare(b.nome));

            // Usiamo data.piante (assicurati che il JSON sia aggiornato con questa chiave)
            container.innerHTML = data.piante.map(item => `
                <article class="card">
                    <img src="${item.immagine}" class="zoomable" alt="${item.nome}" 
                         onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
                    <div class="card-content">
                        <div class="card-header-flex">
                            <span class="badge">${item.soprannome}</span>
                            <span class="tag-tipo">${item.tipo}</span>
                        </div>
                        <h3>${item.nome}</h3>
                        <p>${item.descrizione}</p>
                        <div class="difficulty">
                            Impegno: <span class="stars">${generaStelle(item.difficolta)}</span>
                        </div>
                    </div>
                </article>
            `).join('');

            // Gestione clic sull'immagine per il popup
            document.querySelectorAll('.zoomable').forEach(img => {
                img.addEventListener('click', () => {
                    fullImg.src = img.src;
                    caption.innerText = img.alt;
                    viewer.showModal();
                });
            });

        } catch (error) {
            container.innerHTML = `<p style="text-align:center;">🌵 Errore: ${error.message}</p>`;
        }
    }

    // Chiusura popup
    closeBtn.addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) viewer.close();
    });

    loadCactus();
});