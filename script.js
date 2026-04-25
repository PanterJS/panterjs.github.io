document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');

    /**
     * Genera una stringa di 5 stelle
     * @param {number} livello - Numero da 1 a 5
     */
    function generaStelle(livello) {
        const stellaPiena = '★';
        const stellaVuota = '☆';
        // Assicura che il livello sia tra 1 e 5
        const rating = Math.min(Math.max(livello, 1), 5);
        return stellaPiena.repeat(rating) + stellaVuota.repeat(5 - rating);
    }

    async function loadCactus() {
        try {
            const response = await fetch('data.json');
            
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON');
            }

            const data = await response.json();

            // Svuota il contenitore e inietta i nuovi dati
            // Usiamo data.piante invece di data.cactus per coerenza con il nuovo JSON
            container.innerHTML = data.piante.map(item => `
                <article class="card">
                    <img src="${item.immagine}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
                    <div class="card-content">
                        <div class="card-tags" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span class="badge">${item.soprannome}</span>
                            <span class="tag-tipo" style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; border: 1px solid #4b6043; padding: 2px 8px; border-radius: 4px; color: #4b6043;">
                                ${item.tipo}
                            </span>
                        </div>
                        <h3>${item.nome}</h3>
                        <p>${item.descrizione}</p>
                        <div class="difficulty" style="margin-top: 15px; font-size: 0.85rem; font-weight: bold; border-top: 1px solid #eee; padding-top: 10px;">
                            Impegno: <span class="stars" style="color: #f1c40f; font-size: 1.1rem; margin-left: 5px;">
                                ${generaStelle(item.difficolta)}
                            </span>
                        </div>
                    </div>
                </article>
            `).join('');

        } catch (error) {
            console.error("Si è verificato un problema:", error);
            container.innerHTML = `
                <div class="error-message">
                    <p>🌵 Oh no! C'è stata una tempesta di sabbia nel database.</p>
                    <small>${error.message}</small>
                </div>`;
        }
    }

    loadCactus();
});
