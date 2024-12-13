// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (data.email && data.password) {
            // Here you would typically make an API call to your backend
            console.log('Form submitted:', data);
            
            // For demo purposes, simulate successful login
            alert('Login successful!');
            // Redirect to dashboard or home page
            // window.location.href = 'index.html';
        } else {
            alert('Please fill in all required fields');
        }
    });
});