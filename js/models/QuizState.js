export class QuizState {
    constructor(quiz, questions) {
        this.quiz = quiz;
        this.questions = questions;
        this.currentQuestion = 0;
        this.answers = new Array(questions.length).fill(null);
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestion];
    }

    getSelectedAnswer() {
        return this.answers[this.currentQuestion];
    }

    setAnswer(answer) {
        this.answers[this.currentQuestion] = answer;
    }

    isFirstQuestion() {
        return this.currentQuestion === 0;
    }

    isLastQuestion() {
        return this.currentQuestion === this.questions.length - 1;
    }

    moveToNextQuestion() {
        if (!this.isLastQuestion()) {
            this.currentQuestion++;
            return true;
        }
        return false;
    }

    moveToPreviousQuestion() {
        if (!this.isFirstQuestion()) {
            this.currentQuestion--;
            return true;
        }
        return false;
    }

    calculateScore() {
        let score = 0;
        this.answers.forEach((answer, index) => {
            if (answer === this.questions[index].correctAnswer) {
                score++;
            }
        });
        return {
            score,
            total: this.questions.length,
            percentage: (score / this.questions.length) * 100
        };
    }
}