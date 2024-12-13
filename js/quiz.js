import quizService from './services/quizService.js';
import { Timer } from './utils/timer.js';

class Quiz {
    constructor() {
        this.quizId = new URLSearchParams(window.location.search).get('id');
        this.questions = [];
        this.currentQuestion = 0;
        this.answers = [];
        this.timer = null;
        
        this.init();
    }

    async init() {
        try {
            // Load quiz data
            const quizzes = await quizService.getQuizzes();
            this.quiz = quizzes.find(q => q.id === this.quizId);
            
            if (!this.quiz) {
                throw new Error('Quiz not found');
            }

            // Load questions
            this.questions = await quizService.getQuizQuestions(this.quizId);
            this.answers = new Array(this.questions.length).fill(null);
            
            // Initialize UI
            this.initializeQuiz();
            this.setupEventListeners();
            this.startTimer();
        } catch (error) {
            console.error('Error initializing quiz:', error);
            alert('Error loading quiz');
            window.location.href = 'online-tests.html';
        }
    }

    initializeQuiz() {
        document.getElementById('quiz-title').textContent = this.quiz.title;
        document.getElementById('total-questions').textContent = this.questions.length;
        document.getElementById('question-count').textContent = this.questions.length;
        
        this.displayQuestion();
        this.updateNavButtons();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        document.getElementById('question-text').textContent = question.question;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'flex items-center space-x-3';
            optionDiv.innerHTML = `
                <input type="radio" id="option${index}" name="question" value="${index}"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    ${this.answers[this.currentQuestion] === index ? 'checked' : ''}>
                <label for="option${index}" class="text-gray-700">${option}</label>
            `;
            optionsContainer.appendChild(optionDiv);
        });

        const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.answers[this.currentQuestion] = parseInt(radio.value);
            });
        });
    }

    updateNavButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentQuestion === 0;
        nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Finish' : 'Next';
    }

    setupEventListeners() {
        document.getElementById('prev-btn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitQuiz());
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
            this.updateNavButtons();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
            this.updateNavButtons();
        }
    }

    startTimer() {
        this.timer = new Timer(
            this.quiz.timeLimit,
            (time) => document.getElementById('timer').textContent = time,
            () => this.submitQuiz()
        );
        this.timer.start();
    }

    submitQuiz() {
        this.timer.stop();
        
        let score = 0;
        this.answers.forEach((answer, index) => {
            if (answer === this.questions[index].correctAnswer) {
                score++;
            }
        });

        const percentage = (score / this.questions.length) * 100;
        alert(`Quiz completed!\nScore: ${score}/${this.questions.length} (${percentage}%)`);
        
        window.location.href = 'online-tests.html';
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});