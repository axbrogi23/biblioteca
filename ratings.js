// ratings.js - Sistema de calificaciones y reseñas

class RatingSystem {
    constructor() {
        this.ratingsKey = 'userRatings';
        this.reviewsKey = 'userReviews';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserRatings();
    }

    setupEventListeners() {
        // Event listeners para estrellas de calificación
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star') && e.target.dataset.rating) {
                this.handleStarClick(e.target);
            }
        });

        // Event listeners para hover en estrellas
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('star') && e.target.dataset.rating) {
                this.handleStarHover(e.target);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('star') && e.target.dataset.rating) {
                this.handleStarLeave(e.target);
            }
        });
    }

    handleStarClick(starElement) {
        const rating = parseInt(starElement.dataset.rating);
        const bookId = this.getBookIdFromContext(starElement);
        
        if (bookId) {
            this.setUserRating(bookId, rating);
            this.updateStarDisplay(starElement.parentElement, rating);
            this.showRatingFeedback(rating);
        }
    }

    handleStarHover(starElement) {
        const rating = parseInt(starElement.dataset.rating);
        const container = starElement.parentElement;
        this.highlightStars(container, rating);
    }

    handleStarLeave(starElement) {
        const bookId = this.getBookIdFromContext(starElement);
        const container = starElement.parentElement;
        const userRating = this.getUserRating(bookId);
        this.highlightStars(container, userRating);
    }

    getBookIdFromContext(element) {
        // Buscar el book ID en el contexto del elemento
        const bookItem = element.closest('[data-id]');
        if (bookItem) {
            return bookItem.dataset.id;
        }
        
        // Si estamos en un modal, buscar el ID del libro actual
        const modal = element.closest('.modal');
        if (modal) {
            return this.getCurrentModalBookId();
        }
        