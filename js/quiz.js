import { getQuiz } from './services/quizService.js';
import { QuizUI } from './components/QuizUI.js';

class Quiz {
    constructor() {
        this.ui = new QuizUI();
        this.currentQuestion = 0;
        this.answers = [];
        this.init();
    }

    async init() {
        try {
            // Get quiz ID from URL
            const quizId = new URLSearchParams(window.location.search).get('id');
            if (!quizId) throw new Error('No quiz selected');

            // Load quiz data
            const { quiz, questions } = await getQuiz(quizId);
            if (!questions.length) throw new Error('No questions available');

            // Initialize quiz
            this.questions = questions;
            this.answers = new Array(questions.length).fill(null);
            
            // Show first question
            this.ui.showQuestion(questions[0]);
            
            // Setup event listeners
            this.setupListeners();

        } catch (error) {
            this.ui.showError(error.message);
        }
    }

    setupListeners() {
        // Handle option selection
        this.ui.optionsContainer.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                this.answers[this.currentQuestion] = parseInt(e.target.value);
            }
        });

        // Handle navigation
        this.ui.nextButton.addEventListener('click', () => {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.ui.showQuestion(
                    this.questions[this.currentQuestion],
                    this.answers[this.currentQuestion]
                );
            }
        });

        this.ui.prevButton.addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.ui.showQuestion(
                    this.questions[this.currentQuestion],
                    this.answers[this.currentQuestion]
                );
            }
        });

        // Handle submit
        this.ui.submitButton.addEventListener('click', () => {
            const score = this.answers.reduce((total, answer, index) => 
                total + (answer === this.questions[index].correctAnswer ? 1 : 0), 0);
            
            alert(`Quiz completed!\nScore: ${score}/${this.questions.length}`);
            window.location.href = '../pages/online-tests.html';
        });
    }
}

// Start quiz when page loads
document.addEventListener('DOMContentLoaded', () => new Quiz());