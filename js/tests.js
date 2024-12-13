document.addEventListener('DOMContentLoaded', function() {
    // Category button handling
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Here you would typically filter the quizzes based on category
        });
    });

    // Start quiz button handling
    const startButtons = document.querySelectorAll('.start-quiz-btn');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quizCard = this.closest('.quiz-card');
            const quizTitle = quizCard.querySelector('h3').textContent;
            // Here you would typically redirect to the quiz page or start the quiz
            alert(`Starting ${quizTitle}`);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = searchInput.nextElementSibling;
    
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        // Here you would typically filter the quizzes based on search term
        console.log('Searching for:', searchTerm);
    });
});