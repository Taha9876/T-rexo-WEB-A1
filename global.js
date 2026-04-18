// global.js - Required on all protected admin pages

document.addEventListener('DOMContentLoaded', () => {
    // 1. Route Protection
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // 2. Apply Theme (Dark mode)
    // The default theme is dark, but the assignment asks for a toggle. We can toggle a '.light-mode' class instead.
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-theme'); // We'll define dark-theme as the opposite of the default if needed, or implement a light body
    } else if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.add('light-theme');
    }

    // 3. Display User Info
    const storedUserJSON = localStorage.getItem('user');
    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        const emailDoms = document.querySelectorAll('.user-email-display');
        emailDoms.forEach(el => el.textContent = storedUser.email);
    }

    // 4. Logout Logic
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            window.location.href = 'login.html';
        });
    });
});
