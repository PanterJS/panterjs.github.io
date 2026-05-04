document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cactus-container');
    const speciesCount = document.getElementById('species-count'); // Ripristinato
    const viewer = document.getElementById('image-viewer');
    const fullImg = document.getElementById('full-image');
    const caption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-modal');
    const backToTopBtn = document.getElementById("backToTop"); // Spostato qui dentro

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
            if (speciesCount) speciesCount.innerText = allPlants.length; // Aggiorna contatore
            
            renderCards(allPlants);
        } catch (error) {
            container.innerHTML = `<p style="text-align:center;">🌵 Errore: ${error.message}</p>`;
        }
    }

    function renderCards(plants) {
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

    // Gestione Pulsante Torna Su
    window.onscroll = function() {
        if (backToTopBtn) {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }
    };

    // barra di ricerca
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    const filteredPlants = allPlants.filter(plant => 
        plant.nome.toLowerCase().includes(term) || 
        plant.soprannome.toLowerCase().includes(term) ||
        plant.descrizione.toLowerCase().includes(term)
    );
    
    renderCards(filteredPlants);
    
    // Aggiorna il contatore con il numero di risultati trovati
    if (speciesCount) speciesCount.innerText = filteredPlants.length;
});

    if (backToTopBtn) {
        backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Chiusura Popup
    closeBtn.onclick = () => viewer.close();
    viewer.onclick = (e) => { if (e.target === viewer) viewer.close(); };

    loadCactus();
});