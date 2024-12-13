export class QuizCard {
    constructor(quizData) {
        this.quiz = quizData;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.innerHTML = `
            <h3 class="text-xl font-semibold mb-2">${this.quiz.title}</h3>
            <p class="text-gray-600 mb-2">Total Questions - ${this.quiz.totalQuestions}</p>
            <p class="text-gray-600 mb-2">Difficulty: ${this.quiz.difficulty}</p>
            <p class="text-gray-600 mb-4">${this.quiz.description}</p>
            <div class="flex justify-between items-center">
                <button class="start-quiz-btn" data-quiz-id="${this.quiz.id}">Start Quiz</button>
                <span class="text-sm text-gray-500">Category: ${this.quiz.category}</span>
            </div>
        `;
        return card;
    }
}