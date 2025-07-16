// search.js - Sistema de búsqueda avanzado

class SearchSystem {
    constructor() {
        this.books = this.getAllBooks();
        this.searchHistory = this.getSearchHistory();
        this.currentFilters = {
            genre: '',
            type: '',
            maxPrice: 20,
            minRating: 0
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // Búsqueda en tiempo real
        const searchInput = document.getElementById('advanced-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
            searchInput.addEventListener('focus', this.showSuggestions.bind(this));
        }

        // Filtros
        const genreFilter = document.getElementById('genre-filter');
        const typeFilter = document.getElementById('type-filter');
        const priceFilter = document.getElementById('price-filter');
        const ratingFilter = document.querySelectorAll('.rating-filter .star');
        const sortBy = document.getElementById('sort-by');

        if (genreFilter) genreFilter.addEventListener('change', this.updateFilters.bind(this));
        if (typeFilter) typeFilter.addEventListener('change', this.updateFilters.bind(this));
        if (priceFilter) {
            priceFilter.addEventListener('input', this.updatePriceFilter.bind(this));
        }
        if (sortBy) sortBy.addEventListener('change', this.handleSort.bind(this));

        // Rating filter
        ratingFilter.forEach(star => {
            star.addEventListener('click', this.handleRatingFilter.bind(this));
        });

        // Botones de filtros
        const clearFilters = document.getElementById('clear-filters');
        const applyFilters = document.getElementById('apply-filters');

        if (clearFilters) clearFilters.addEventListener('click', this.clearFilters.bind(this));
        if (applyFilters) applyFilters.addEventListener('click', this.applyFilters.bind(this));
    }

    getAllBooks() {
        return [
            { 
                id: 'quijote', 
                title: "Don Quijote de la mancha", 
                imgSrc: "imagenes_mockups/donquijote.avif", 
                description: "Una obra maestra de la literatura española que narra las aventuras de un hidalgo que pierde la razón por leer libros de caballería.", 
                price: "12.50", 
                genre: "Novela Clásica", 
                author: "Miguel de Cervantes", 
                type: "Narrativa",
                pages: 863,
                language: "Español",
                rating: 4.5,
                reviews: 142
            },
            { 
                id: 'narnia', 
                title: "Las Crónicas de Narnia", 
                imgSrc: "imagenes_mockups/estuche-narnia.jpg", 
                description: "Cuatro hermanos descubren Narnia, un mundo mágico lleno de criaturas fantásticas y aventuras épicas.", 
                price: "10.00", 
                genre: "Fantasía Juvenil", 
                author: "C.S. Lewis", 
                type: "Fantasía",
                pages: 767,
                language: "Español",
                rating: 4.7,
                reviews: 89
            },
            { 
                id: 'shakespeare', 
                title: "Romeo y Julieta", 
                imgSrc: "imagenes_mockups/william_shakespeare.webp",
                description: "La trágica historia de dos jóvenes amantes cuyas muertes unen finalmente a sus familias enfrentadas.", 
                price: "15.75", 
                genre: "Tragedia", 
                author: "William Shakespeare", 
                type: "Dramática",
                pages: 283,
                language: "Español",
                rating: 4.3,
                reviews: 203
            },
            { 
                id: 'sherlock_manga', 
                title: "Manga de Sherlock", 
                imgSrc: "imagenes_mockups/manga_sherlock.webp",
                description: "Las aventuras del famoso detective Sherlock Holmes adaptadas al formato manga con un estilo visual único.", 
                price: "9.99", 
                genre: "Misterio", 
                author: "Arthur Conan Doyle (Adaptación)", 
                type: "Manga",
                pages: 180,
                language: "Español",
                rating: 4.1,
                reviews: 67
            },
            {
                id: 'Padre_Rico',
                title: "Padre Rico, Padre Pobre",
                imgSrc: "imagenes_mockups/padre_rico_padre_pobre.webp",
                description: "Un libro que desafía las creencias tradicionales sobre el dinero y enseña principios de educación financiera.",
                price: "14.99",
                author: "Robert T. Kiyosaki",
                genre: "Finanzas Personales",
                type: "No Ficción",
                pages: 207,
                language: "Español",
                rating: 4.4,
                reviews: 156
            },
            {
                id: 'Principito',
                title: "El Principito",
                imgSrc: "imagenes_mockups/principito.jpg",
                description: "Un cuento poético sobre la soledad, la amistad y el amor, narrado por un piloto varado en el desierto.",
                price: "8.99",
                genre: "Fantasía",
                author: "Antoine de Saint-Exupéry",
                type: "Narrativa",
                pages: 96,
                language: "Español",
                rating: 4.8,
                reviews: 284
            },
            {
                id: 'Cien_Años_de_Soledad',
                title: "Cien Años de Soledad",
                imgSrc: "imagenes_mockups/cien_años_de_soledad.webp",
                description: "La historia de la familia Buendía en el pueblo ficticio de Macondo, una obra maestra del realismo mágico.",
                price: "13.99",
                genre: "Realismo Mágico",
                author: "Gabriel García Márquez",
                type: "Narrativa",
                pages: 471,
                language: "Español",
                rating: 4.6,
                reviews: 198
            },
            {
                id: 'Estoicismo',
                title: "Estoicismo",
                imgSrc: "imagenes_mockups/estoico.webp",
                description: "Descubre la filosofía de los antiguos estoicos para aumentar la resistencia y desarrollar la sabiduría interior.",
                price: "10.87",
                genre: "Filosofía",
                author: "Leon Simonds",
                type: "No Ficción",
                pages: 234,
                language: "Español",
                rating: 4.2,
                reviews: 78
            },
            {
                id: 'Dragon_Ball',
                title: "Dragon Ball",
                imgSrc: "imagenes_mockups/portada_dragon_ball.webp",
                description: "Las aventuras de Goku y sus amigos en la búsqueda de las esferas del dragón y la defensa de la Tierra.",
                price: "12.99",
                genre: "Shonen",
                author: "Akira Toriyama",
                type: "Manga",
                pages: 192,
                language: "Español",
                rating: 4.9,
                reviews: 312
            },
            {
                id:'fantasmas',
                title: "El Fantasma de Canterville",
                imgSrc:"imagenes_mockups/El_fantasma_de_Canterville-Wilde_Oscar-lg.png",
                description: "Una comedia sobre un fantasma que intenta aterrorizar a una familia estadounidense en una mansión inglesa.",
                price: "7.50",
                genre: "Comedia",
                author: "Oscar Wilde",
                type: "Narrativa",
                pages: 94,
                language: "Español",
                rating: 4.0,
                reviews: 123
            },
            {
                id:'Literary',
                title: "Ensayos literarios",
                imgSrc:"imagenes_mockups/Ensayos_Literarios-Robert_Louis_Stevenson-md.jpeg",
                description: "Una colección de ensayos sobre literatura y crítica literaria que exploran diversos aspectos del arte narrativo.",
                price: "9.99",
                genre: "Ensayo",
                author: "Robert Louis Stevenson",
                type: "No Ficción",
                pages: 156,
                language: "Español",
                rating: 3.8,
                reviews: 45
            }
        ];
    }

    getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory')) || [];
    }

    saveSearchHistory(history) {
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    addToSearchHistory(query) {
        if (!query.trim()) return;
        
        let history = this.getSearchHistory();
        history = history.filter(item => item !== query);
        history.unshift(query);
        
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        
        this.saveSearchHistory(history);
    }

    handleSearch(event) {
        const query = event.target.value.trim();
        
        if (query.length > 0) {
            this.addToSearchHistory(query);
            const results = this.searchBooks(query);
            this.displayResults(results);
            this.updateResultsCount(results.length);
        } else {
            this.displayResults(this.books);
            this.updateResultsCount(this.books.length);
        }
    }

    searchBooks(query) {
        return this.books.filter(book => {
            const searchIn = `${book.title} ${book.author} ${book.description} ${book.genre}`.toLowerCase();
            return searchIn.includes(query.toLowerCase());
        });
    }

    showSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (!suggestionsContainer) return;

        const history = this.getSearchHistory();
        if (history.length === 0) {
            suggestionsContainer.classList.remove('active');
            return;
        }

        let suggestionsHTML = '';
        history.slice(0, 5).forEach(item => {
            suggestionsHTML += `
                <div class="suggestion-item" onclick="selectSuggestion('${item}')">
                    <i class="icon-history"></i> ${item}
                </div>
            `;
        });

        suggestionsContainer.innerHTML = suggestionsHTML;
        suggestionsContainer.classList.add('active');
    }

    updateFilters() {
        const genreFilter = document.getElementById('genre-filter');
        const typeFilter = document.getElementById('type-filter');
        const priceFilter = document.getElementById('price-filter');

        this.currentFilters.genre = genreFilter ? genreFilter.value : '';
        this.currentFilters.type = typeFilter ? typeFilter.value : '';
        this.currentFilters.maxPrice = priceFilter ? parseFloat(priceFilter.value) : 20;

        this.applyFilters();
    }

    updatePriceFilter(event) {
        const value = event.target.value;
        const priceValue = document.getElementById('price-value');
        if (priceValue) {
            priceValue.textContent = `$${value}`;
        }
        this.currentFilters.maxPrice = parseFloat(value);
    }

    handleRatingFilter(event) {
        const rating = parseInt(event.target.dataset.rating);
        this.currentFilters.minRating = rating;
        
        // Actualizar visualización de estrellas
        const stars = document.querySelectorAll('.rating-filter .star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
        
        this.applyFilters();
    }

    applyFilters() {
        const searchInput = document.getElementById('advanced-search-input');
        const query = searchInput ? searchInput.value.trim() : '';
        
        let results = query ? this.searchBooks(query) : this.books;
        
        // Aplicar filtros
        results = results.filter(book => {
            const matchesGenre = !this.currentFilters.genre || book.genre === this.currentFilters.genre;
            const matchesType = !this.currentFilters.type || book.type === this.currentFilters.type;
            const matchesPrice = parseFloat(book.price) <= this.currentFilters.maxPrice;
            const matchesRating = !this.currentFilters.minRating || book.rating >= this.currentFilters.minRating;
            
            return matchesGenre && matchesType && matchesPrice && matchesRating;
        });
        
        this.displayResults(results);
        this.updateResultsCount(results.length);
    }

    clearFilters() {
        this.currentFilters = {
            genre: '',
            type: '',
            maxPrice: 20,
            minRating: 0
        };
        
        // Resetear UI
        const genreFilter = document.getElementById('genre-filter');
        const typeFilter = document.getElementById('type-filter');
        const priceFilter = document.getElementById('price-filter');
        const priceValue = document.getElementById('price-value');
        const ratingStars = document.querySelectorAll('.rating-filter .star');
        
        if (genreFilter) genreFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (priceFilter) priceFilter.value = '20';
        if (priceValue) priceValue.textContent = '$20.00';
        
        ratingStars.forEach(star => star.classList.remove('active'));
        
        this.applyFilters();
    }

    handleSort(event) {
        const sortBy = event.target.value;
        const resultsContainer = document.getElementById('search-results-container');
        
        if (!resultsContainer) return;
        
        const currentResults = Array.from(resultsContainer.querySelectorAll('.book-item-vertical'));
        
        currentResults.sort((a, b) => {
            const bookA = this.books.find(book => book.id === a.dataset.id);
            const bookB = this.books.find(book => book.id === b.dataset.id);
            
            switch (sortBy) {
                case 'title':
                    return bookA.title.localeCompare(bookB.title);
                case 'price-low':
                    return parseFloat(bookA.price) - parseFloat(bookB.price);
                case 'price-high':
                    return parseFloat(bookB.price) - parseFloat(bookA.price);
                case 'rating':
                    return bookB.rating - bookA.rating;
                default:
                    return 0;
            }
        });
        
        // Reordenar en el DOM
        currentResults.forEach(item => resultsContainer.appendChild(item));
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('search-results-container');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">📚</div>
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con diferentes términos de búsqueda o ajusta los filtros.</p>
                </div>
            `;
            return;
        }

        let resultsHTML = '';
        results.forEach(book => {
            const isFollowed = this.isBookFollowed(book.id);
            resultsHTML += `
                <div class="book-item-vertical" data-id="${book.id}">
                    <div class="book-image">
                        <img src="${book.imgSrc}" alt="${book.title}" onclick="openBookModal('${book.id}')">
                    </div>
                    <div class="book-info">
                        <h4 onclick="openBookModal('${book.id}')">${book.title}</h4>
                        <p class="book-author">${book.author}</p>
                        <p class="book-genre">${book.genre}</p>
                        <div class="book-rating">
                            <span class="stars">${this.generateStars(book.rating)}</span>
                            <span class="rating-score">${book.rating}</span>
                            <span class="rating-count">(${book.reviews})</span>
                        </div>
                        <p class="book-description">${book.description}</p>
                        <div class="book-actions">
                            <button class="btn-toggle-follow" onclick="toggleFollowBook('${book.id}')" data-book-id="${book.id}">
                                ${isFollowed ? 'Dejar de Seguir' : 'Seguir'}
                            </button>
                            <button class="btn-facturar-libro" onclick="reserveBook('${book.id}')">
                                Reservar - $${book.price}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        resultsContainer.innerHTML = resultsHTML;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        
        if (hasHalfStar) {
            stars += '☆';
        }
        
        while (stars.length < 5) {
            stars += '☆';
        }
        
        return stars;
    }

    updateResultsCount(count) {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = count === 1 ? '1 resultado' : `${count} resultados`;
        }
    }

    isBookFollowed(bookId) {
        const followedBooks = JSON.parse(localStorage.getItem('followedBooksLibrary')) || [];
        return followedBooks.some(book => book.id === bookId);
    }

    loadInitialData() {
        this.displayResults(this.books);
        this.updateResultsCount(this.books.length);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Funciones globales para compatibilidad
function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('advanced-search-input');
    if (searchInput) {
        searchInput.value = suggestion;
        const event = new Event('input');
        searchInput.dispatchEvent(event);
    }
    
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('active');
    }
}

function reserveBook(bookId) {
    const searchSystem = new SearchSystem();
    const book = searchSystem.books.find(b => b.id === bookId);
    if (book) {
        // Aquí puedes redirigir a la página de facturación
        if (typeof populateFacturacionScreen === 'function') {
            populateFacturacionScreen(book);
        }
        if (typeof navigateTo === 'function') {
            navigateTo('pantalla-facturacion');
        }
    }
}

function toggleFollowBook(bookId) {
    const searchSystem = new SearchSystem();
    const book = searchSystem.books.find(b => b.id === bookId);
    if (book) {
        // Aquí puedes usar la función existente de toggle follow
        if (typeof toggleFollowBook === 'function') {
            // Usar la función existente del script principal
        }
    }
}

function openBookModal(bookId) {
    // Esta función debe estar definida en el archivo principal
    if (typeof openBookModal === 'function') {
        openBookModal(bookId);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('advanced-search-input')) {
        new SearchSystem();
    }
});