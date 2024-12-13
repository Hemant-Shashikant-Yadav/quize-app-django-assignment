class QuizService {
    async getQuizzes() {
        try {
            const response = await fetch('../data/quizzes.json');
            const data = await response.json();
            return data.quizzes;
        } catch (error) {
            console.error('Error loading quizzes:', error);
            return [];
        }
    }

    async getQuizQuestions(quizId) {
        try {
            const response = await fetch('../data/questions.json');
            const data = await response.json();
            return data[quizId]?.questions || [];
        } catch (error) {
            console.error('Error loading questions:', error);
            return [];
        }
    }
}

export default new QuizService();