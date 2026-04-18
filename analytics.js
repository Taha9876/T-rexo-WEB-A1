document.addEventListener('DOMContentLoaded', () => {

    // --- BAR CHART RENDERER ---
    const barChartData = [
        { label: 'Jan', val: 30 },
        { label: 'Feb', val: 50 },
        { label: 'Mar', val: 40 },
        { label: 'Apr', val: 80 },
        { label: 'May', val: 65 },
        { label: 'Jun', val: 90 }
    ];

    const barContainer = document.getElementById('userGrowthChart');
    if (barContainer) {
        barChartData.forEach(item => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${item.val}%`;
            
            const label = document.createElement('span');
            label.textContent = item.label;
            
            bar.appendChild(label);
            barContainer.appendChild(bar);
        });
    }

    // --- PIE CHART RENDERER ---
    const pieData = [
        { label: 'Direct', percentage: 40, color: '#a855f7' },
        { label: 'Social', percentage: 35, color: '#ec4899' },
        { label: 'Referral', percentage: 25, color: '#3b82f6' }
    ];

    const trafficPie = document.getElementById('trafficPie');
    const legendContainer = document.getElementById('trafficLegend');

    if (trafficPie && legendContainer) {
        // Construct conic-gradient string
        let gradientStrArr = [];
        let cumulativePercent = 0;

        pieData.forEach(item => {
            let start = cumulativePercent;
            cumulativePercent += item.percentage;
            let end = cumulativePercent;

            gradientStrArr.push(`${item.color} ${start}% ${end}%`);

            // Build Legend
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `<div class="legend-color" style="background:${item.color}"></div> ${item.label} (${item.percentage}%)`;
            legendContainer.appendChild(legendItem);
        });

        // Apply gradient to pie
        trafficPie.style.background = `conic-gradient(${gradientStrArr.join(', ')})`;
    }

});
