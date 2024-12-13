import quizService from './services/quizService.js';
import { QuizCard } from './components/QuizCard.js';

class QuizList {
    constructor() {
        this.quizzes = [];
        this.filteredQuizzes = [];
        this.init();
    }

    async init() {
        await this.loadQuizzes();
        this.setupEventListeners();
        this.renderQuizzes();
    }

    async loadQuizzes() {
        this.quizzes = await quizService.getQuizzes();
        this.filteredQuizzes = [...this.quizzes];
    }

    setupEventListeners() {
        // Category filtering
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.textContent;
                this.filterQuizzes(category);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('input[type="text"]');
        const searchButton = searchInput.nextElementSibling;
        
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            this.searchQuizzes(searchTerm);
        });
    }

    filterQuizzes(category) {
        this.filteredQuizzes = category === 'All Quiz' 
            ? [...this.quizzes]
            : this.quizzes.filter(quiz => quiz.category === category);
        this.renderQuizzes();
    }

    searchQuizzes(term) {
        this.filteredQuizzes = this.quizzes.filter(quiz => 
            quiz.title.toLowerCase().includes(term) ||
            quiz.description.toLowerCase().includes(term)
        );
        this.renderQuizzes();
    }

    renderQuizzes() {
        const container = document.querySelector('.grid');
        container.innerHTML = '';
        
        this.filteredQuizzes.forEach(quizData => {
            const quizCard = new QuizCard(quizData);
            container.appendChild(quizCard.render());
        });

        // Add event listeners to start buttons
        document.querySelectorAll('.start-quiz-btn').forEach(button => {
            button.addEventListener('click', () => {
                const quizId = button.dataset.quizId;
                window.location.href = `quiz.html?id=${encodeURIComponent(quizId)}`;
            });
        });
    }
}

// Initialize the quiz list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizList();
});