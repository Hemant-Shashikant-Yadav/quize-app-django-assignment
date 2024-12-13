// Handles all UI updates
export class QuizUI {
    constructor() {
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.nextButton = document.getElementById('next-btn');
        this.prevButton = document.getElementById('prev-btn');
        this.submitButton = document.getElementById('submit-btn');
    }

    showQuestion(question, selectedAnswer = null) {
        // Display question
        this.questionText.textContent = question.question;
        
        // Display options
        this.optionsContainer.innerHTML = question.options
            .map((option, index) => `
                <div class="flex items-center space-x-3">
                    <input type="radio" id="option${index}" name="question" value="${index}"
                        ${selectedAnswer === index ? 'checked' : ''}>
                    <label for="option${index}">${option}</label>
                </div>
            `).join('');
    }

    showError(message) {
        this.questionText.textContent = message;
        this.optionsContainer.innerHTML = `
            <a href="../pages/online-tests.html" class="text-blue-500">
                Return to Quiz List
            </a>
        `;
    }
}