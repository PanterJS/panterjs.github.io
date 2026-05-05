document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');
    const speciesCount = document.getElementById('species-count');
    const viewer = document.getElementById('image-viewer');
    const fullImg = document.getElementById('full-image');
    const caption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-modal');
    const backToTopBtn = document.getElementById("backToTop");

    // Elementi di controllo
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const filterType = document.getElementById('filter-type');

    let allPlants = [];

    function generaStelle(livello) {
        const rating = Math.min(Math.max(livello, 1), 5);
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    async function loadCactus() {
        try {
            const response = await fetch('data.json?v=' + Date.now());
            if (!response.ok) throw new Error('Errore caricamento database');
            const data = await response.json();
            
            allPlants = data.piante;
            if (speciesCount) speciesCount.innerText = allPlants.length;
            
            applyFilters(); // Esegue il primo rendering con i filtri attivi
        } catch (error) {
            container.innerHTML = `<p style="text-align:center;">🌵 Errore: ${error.message}</p>`;
        }
    }

    // Funzione unificata per filtrare e ordinare
    function applyFilters() {
        const term = searchInput.value.toLowerCase();
        const type = filterType.value;
        const sort = sortSelect.value;

        // 1. Filtra per ricerca E per tipo
        let filtered = allPlants.filter(plant => {
            const matchesSearch = 
                plant.nome.toLowerCase().includes(term) || 
                plant.soprannome.toLowerCase().includes(term) ||
                plant.descrizione.toLowerCase().includes(term);
            
            const matchesType = (type === 'all') || (plant.tipo === type);

            return matchesSearch && matchesType;
        });

        // 2. Applica l'ordinamento
        if (sort === 'nome') {
            filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (sort === 'difficolta') {
            filtered.sort((a, b) => a.difficolta - b.difficolta);
        }

        renderCards(filtered);
        if (speciesCount) speciesCount.innerText = filtered.length;
    }

    function renderCards(plants) {
        if (plants.length === 0) {
            container.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">Nessuna pianta trovata 🌵</p>`;
            return;
        }

        container.innerHTML = plants.map(item => `
            <article class="card">
                <img src="${item.immagine}" class="zoomable" alt="${item.nome}" 
                     onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
                <div class="card-content">
                    <div class="card-header-flex">
                        <span class="badge">${item.soprannome}</span>
                        <span class="tag-tipo">${item.tipo}</span>
                    </div>
                    <h3>${item.nome}</h3>
                    <div class="extra-info">
                        <p><strong>Famiglia:</strong> ${item.famiglia || 'Cactaceae'}</p>
                        <p><strong>Origine:</strong> ${item.origine || 'Non specificata'}</p>
                    </div>
                    <p>${item.descrizione}</p>
                    <div class="difficulty">
                        Impegno: <span class="stars">${generaStelle(item.difficolta)}</span>
                    </div>
                </div>
            </article>
        `).join('');

        attachZoomEvents();
    }

    function attachZoomEvents() {
        document.querySelectorAll('.zoomable').forEach(img => {
            img.onclick = () => {
                fullImg.src = img.src;
                caption.innerText = img.alt;
                viewer.showModal();
            };
        });
    }

    // Event Listeners per i controlli
    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    filterType.addEventListener('change', applyFilters);

    // Scroll e pulsante Top
    window.onscroll = function() {
        if (backToTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }
    };

    if (backToTopBtn) {
        backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Chiusura Popup
    closeBtn.onclick = () => viewer.close();
    viewer.onclick = (e) => { if (e.target === viewer) viewer.close(); };

    loadCactus();
});