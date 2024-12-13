// Quiz data service
export async function getQuizzes() {
    try {
        const response = await fetch('../data/quizzes.json');
        const data = await response.json();
        return data.quizzes;
    } catch (error) {
        console.error('Error loading quizzes:', error);
        return [];
    }
}

export async function getQuiz(quizId) {
    try {
        // Get quiz details
        const quizResponse = await fetch('../data/quizzes.json');
        const quizData = await quizResponse.json();
        const quiz = quizData.quizzes.find(q => q.id === quizId);
        
        // Get questions
        const questionsResponse = await fetch('../data/questions.json');
        const questionsData = await questionsResponse.json();
        const questions = questionsData[quizId]?.questions || [];
        
        return { quiz, questions };
    } catch (error) {
        throw new Error('Failed to load quiz');
    }
}