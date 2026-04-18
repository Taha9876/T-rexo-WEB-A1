document.addEventListener('DOMContentLoaded', () => {

    const defaultNotifs = [
        { id: 1, text: "New user registered (jane@example.com)", isRead: false },
        { id: 2, text: "Order #856 placed for $120.50", isRead: false },
        { id: 3, text: "Product 'Gaming Mouse' is running low on stock.", isRead: true }
    ];

    let notifications = JSON.parse(localStorage.getItem('notificationsData')) || defaultNotifs;
    const notifList = document.getElementById('notifList');

    function saveToStorage() {
        localStorage.setItem('notificationsData', JSON.stringify(notifications));
    }

    function renderList() {
        notifList.innerHTML = '';
        if (notifications.length === 0) {
            notifList.innerHTML = '<li class="notif-item"><span class="notif-text">No new notifications.</span></li>';
            return;
        }

        notifications.forEach(notif => {
            const li = document.createElement('li');
            li.className = `notif-item ${notif.isRead ? 'read' : ''}`;
            
            li.innerHTML = `
                <span class="notif-text">${notif.text}</span>
                <div class="notif-actions">
                    ${!notif.isRead ? `<button class="action-btn edit" onclick="markRead(${notif.id})">Mark as Read</button>` : ''}
                    <button class="action-btn delete" onclick="deleteNotif(${notif.id})">Delete</button>
                </div>
            `;
            notifList.appendChild(li);
        });
    }

    window.markRead = function(id) {
        const index = notifications.findIndex(n => n.id === id);
        if (index > -1) {
            notifications[index].isRead = true;
            saveToStorage();
            renderList();
        }
    }

    window.deleteNotif = function(id) {
        notifications = notifications.filter(n => n.id !== id);
        saveToStorage();
        renderList();
    }

    renderList();

});
