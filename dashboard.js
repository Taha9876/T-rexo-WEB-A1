document.addEventListener('DOMContentLoaded', () => {
    // --- 1. USER INFO SETUP ---
    // Retrieve user data to display email in header
    const storedUserJSON = localStorage.getItem('user');
    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        document.getElementById('userEmailDisplay').textContent = storedUser.email;
    }

    // --- 2. LOGOUT LOGIC ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Remove the session flag (but optionally keep the registered user)
            localStorage.removeItem('loggedIn');
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }

    // --- 3. MOCK DATA INITIALIZATION ---
    // Simulating database data using JavaScript arrays
    const mockData = {
        totalUsers: 1432,
        totalOrders: 856,
        revenue: '$14,500'
    };

    const mockChartData = [
        { day: 'Mon', value: 40 }, // percentages or relative heights
        { day: 'Tue', value: 60 },
        { day: 'Wed', value: 30 },
        { day: 'Thu', value: 85 },
        { day: 'Fri', value: 50 },
        { day: 'Sat', value: 95 },
        { day: 'Sun', value: 20 }
    ];

    // --- 4. RENDER DATA TO CARDS ---
    document.getElementById('totalUsersCard').textContent = mockData.totalUsers.toLocaleString();
    document.getElementById('totalOrdersCard').textContent = mockData.totalOrders.toLocaleString();
    document.getElementById('revenueCard').textContent = mockData.revenue;

    // --- 5. RENDER MOCK CHART ---
    const chartContainer = document.getElementById('salesChart');
    if (chartContainer) {
        mockChartData.forEach(dataPoint => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${dataPoint.value}%`;
            
            const label = document.createElement('span');
            label.textContent = dataPoint.day;
            
            bar.appendChild(label);
            chartContainer.appendChild(bar);
        });
    }
});
