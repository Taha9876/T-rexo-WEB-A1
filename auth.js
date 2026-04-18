document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIGNUP LOGIC ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmError = document.getElementById('confirmError');
            const feedbackMessage = document.getElementById('feedbackMessage');
            
            // Reset errors
            emailError.style.display = 'none';
            passwordError.style.display = 'none';
            confirmError.style.display = 'none';
            feedbackMessage.style.display = 'none';
            
            let isValid = true;
            
            if (!email || !email.includes('@')) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            if (!password || password.length < 6) {
                passwordError.style.display = 'block';
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                confirmError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Save user in localStorage
                const user = { email, password };
                localStorage.setItem('user', JSON.stringify(user));
                
                // Show feedback and redirect
                feedbackMessage.textContent = 'Account created successfully! Redirecting...';
                feedbackMessage.style.color = '#10b981'; // Green
                feedbackMessage.style.display = 'block';
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }

    // --- LOGIN LOGIC ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            const emailError = document.getElementById('loginEmailError');
            const passwordError = document.getElementById('loginPasswordError');
            const feedbackMessage = document.getElementById('loginFeedback');
            
            // Reset errors
            emailError.style.display = 'none';
            passwordError.style.display = 'none';
            feedbackMessage.style.display = 'none';
            
            let isValid = true;
            
            if (!email) {
                emailError.style.display = 'block';
                isValid = false;
            }
            if (!password) {
                passwordError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Retrieve user from localStorage
                const storedUserJSON = localStorage.getItem('user');
                
                if (storedUserJSON) {
                    const storedUser = JSON.parse(storedUserJSON);
                    
                    if (storedUser.email === email && storedUser.password === password) {
                        // Success
                        localStorage.setItem('loggedIn', 'true');
                        feedbackMessage.textContent = 'Login successful! Redirecting...';
                        feedbackMessage.style.color = '#10b981'; // Green
                        feedbackMessage.style.display = 'block';
                        
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1000);
                    } else {
                        // Invalid credentials
                        feedbackMessage.textContent = 'Invalid email or password';
                        feedbackMessage.style.color = '#ef4444'; // Red
                        feedbackMessage.style.display = 'block';
                    }
                } else {
                    // No user found
                    feedbackMessage.textContent = 'No account found. Please sign up first.';
                    feedbackMessage.style.color = '#ef4444';
                    feedbackMessage.style.display = 'block';
                }
            }
        });
    }
});
