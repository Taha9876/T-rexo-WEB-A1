document.addEventListener('DOMContentLoaded', () => {
    // --- MOCK DATA INITIALIZATION ---
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
