document.addEventListener('DOMContentLoaded', () => {

    const userEmailDom = document.getElementById('profileEmail');
    const userNameDom = document.getElementById('profileName');
    const profileForm = document.getElementById('profileForm');
    const profileFeedback = document.getElementById('profileFeedback');

    const passwordForm = document.getElementById('passwordForm');
    const newPassword = document.getElementById('newPassword');
    const passwordFeedback = document.getElementById('passwordFeedback');

    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // 1. Initialize user data
    let currentUser = JSON.parse(localStorage.getItem('user'));
    let storedName = localStorage.getItem('profileName') || 'Admin User';

    if (currentUser) {
        userEmailDom.value = currentUser.email;
        userNameDom.value = storedName;
    }

    // 2. Profile logic
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('profileName', userNameDom.value.trim());
        
        profileFeedback.textContent = "Profile saved successfully!";
        profileFeedback.style.color = "#10b981";
        profileFeedback.style.display = "block";
        setTimeout(() => profileFeedback.style.display = "none", 3000);
    });

    // 3. Password logic (Mock)
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentUser) {
            currentUser.password = newPassword.value;
            localStorage.setItem('user', JSON.stringify(currentUser));
            
            newPassword.value = '';
            passwordFeedback.textContent = "Password updated securely.";
            passwordFeedback.style.color = "#10b981";
            passwordFeedback.style.display = "block";
            setTimeout(() => passwordFeedback.style.display = "none", 3000);
        }
    });

    // 4. Dark Mode Toggle
    function updateToggleButton() {
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.textContent = isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme';
    }

    // Check initial state from global.js applying it
    updateToggleButton();

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('darkMode', 'false');
        }
        updateToggleButton();
    });

});
