document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');
    const speciesCount = document.getElementById('species-count');
    const viewer = document.getElementById('image-viewer');
    const fullImg = document.getElementById('full-image');
    const caption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-modal');
    
    let allPlants = []; // Qui salveremo i dati scaricati

    function generaStelle(livello) {
        return '★'.repeat(livello) + '☆'.repeat(5 - livello);
    }

    async function loadCactus() {
        try {
            const response = await fetch('data.json?v=' + Date.now());
            const data = await response.json();
            allPlants = data.piante;
            
            // Aggiorna il contatore specie
            speciesCount.innerText = allPlants.length;
            
            // Carica le card iniziali
            renderCards(allPlants);
        } catch (error) {
            container.innerHTML = `<p style="text-align:center;">🌵 Errore caricamento database.</p>`;
        }
    }

    function renderCards(plants) {
        const sortVal = document.getElementById('sort-select').value;
        const filterVal = document.getElementById('filter-type').value;

        // 1. Applica Filtro Genere
        let filtered = plants.filter(p => filterVal === 'all' || p.tipo === filterVal);
        
        // 2. Applica Ordinamento
        filtered.sort((a, b) => {
            if (sortVal === 'nome') return a.nome.localeCompare(b.nome);
            if (sortVal === 'difficolta') return a.difficolta - b.difficolta;
            return 0;
        });

        // 3. Genera HTML
        container.innerHTML = filtered.map(item => `
            <article class="card">
                <img src="${item.immagine}" class="zoomable" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Mancante'">
                <div class="card-content">
                    <div class="card-header-flex" style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="badge">${item.soprannome}</span>
                        <span class="tag-tipo">${item.tipo}</span>
                    </div>
                    <h3>${item.nome}</h3>
                    
                    <div class="extra-info">
                        <p><strong>Famiglia:</strong> ${item.famiglia || 'Non specificata'}</p>
                        <p><strong>Origine:</strong> ${item.origine || 'Sconosciuta'}</p>
                    </div>

                    <p>${item.descrizione}</p>
                    
                    <div class="difficulty" style="margin-top:auto; padding-top:10px; border-top:1px solid #eee;">
                        Impegno: <span class="stars">${generaStelle(item.difficolta)}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // 4. Riattiva i click sulle immagini
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

    // Listener per i filtri
    document.getElementById('sort-select').onchange = () => renderCards(allPlants);
    document.getElementById('filter-type').onchange = () => renderCards(allPlants);

    // Chiusura Modal
    closeBtn.onclick = () => viewer.close();
    viewer.onclick = (e) => { if (e.target === viewer) viewer.close(); };

    loadCactus();
});