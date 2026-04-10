document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');

    async function loadCactus() {
        try {
            const response = await fetch('data.json');
            
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON');
            }

            const data = await response.json();

            // Svuota il contenitore e inietta i dati
            container.innerHTML = data.cactus.map(item => `
                <article class="card">
                    <img src="${item.immagine}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
                    <div class="card-content">
                        <span class="badge">${item.soprannome}</span>
                        <h3>${item.nome}</h3>
                        <p>${item.descrizione}</p>
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
