document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');

    // Funzione per generare le stelline in base al numero (1-5)
    function generaStelle(livello) {
        const piena = '★';
        const vuota = '☆';
        const rating = Math.min(Math.max(livello, 1), 5);
        return piena.repeat(rating) + vuota.repeat(5 - rating);
    }

    async function loadCactus() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Errore nel caricamento del file JSON');

            const data = await response.json();

            // Usiamo data.piante (come nel tuo nuovo JSON)
            container.innerHTML = data.piante.map(item => `
                <article class="card">
                    <img src="${item.immagine}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
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

        } catch (error) {
            console.error("Errore:", error);
            container.innerHTML = `<p style="text-align:center;">🌵 Errore: ${error.message}</p>`;
        }
    }

    loadCactus();
});
