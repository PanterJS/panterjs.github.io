document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');
    const searchBar = document.getElementById('searchBar');
    const filterType = document.getElementById('filterType');
    let allCactus = []; // Buffer per i dati

    async function loadCactus() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            allCactus = data.cactus;
            renderCactus(allCactus);
        } catch (error) {
            container.innerHTML = `<p>Errore nel caricamento.</p>`;
        }
    }

    function renderCactus(items) {
        container.innerHTML = items.map(item => `
            <article class="card">
                <img src="${item.immagine}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
                <div class="card-content">
                    <span class="badge">${item.soprannome}</span>
                    <h3>${item.nome}</h3>
                    <p>${item.descrizione}</p>
                </div>
            </article>
        `).join('');
    }

    // Funzione di ricerca combinata
    const filterData = () => {
        const searchText = searchBar.value.toLowerCase();
        const filtered = allCactus.filter(c => 
            c.nome.toLowerCase().includes(searchText) || 
            c.descrizione.toLowerCase().includes(searchText)
        );
        renderCactus(filtered);
    };

    searchBar.addEventListener('input', filterData);
    loadCactus();
});
