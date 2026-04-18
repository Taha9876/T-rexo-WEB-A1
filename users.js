document.addEventListener('DOMContentLoaded', () => {
    // Basic User Data
    const defaultData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' }
    ];

    let users = JSON.parse(localStorage.getItem('usersData')) || defaultData;

    const tableBody = document.getElementById('usersTableBody');
    const searchInput = document.getElementById('searchInput');
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const modalTitle = document.getElementById('modalTitle');

    // Modals buttons
    const addUserBtn = document.getElementById('addUserBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Input fields
    const idInput = document.getElementById('userId');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const roleInput = document.getElementById('userRole');
    const statusInput = document.getElementById('userStatus');

    function saveToStorage() {
        localStorage.setItem('usersData', JSON.stringify(users));
    }

    function renderTable(dataToRender) {
        tableBody.innerHTML = '';
        dataToRender.forEach(user => {
            const tr = document.createElement('tr');
            
            const statusClass = user.status === 'Active' ? 'active' : 'inactive';
            const roleClass = user.role === 'Admin' ? 'admin' : '';

            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge ${roleClass}">${user.role}</span></td>
                <td><span class="badge ${statusClass}">${user.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="editUser(${user.id})">Edit</button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // --- Search / Filter ---
    searchInput.addEventListener('keyup', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = users.filter(u => 
            u.name.toLowerCase().includes(query) || 
            u.email.toLowerCase().includes(query)
        );
        renderTable(filtered);
    });

    // --- Modal Logic ---
    addUserBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Add User';
        userForm.reset();
        idInput.value = '';
        userModal.classList.add('show');
    });

    closeModalBtn.addEventListener('click', () => {
        userModal.classList.remove('show');
    });

    window.editUser = function(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            modalTitle.textContent = 'Edit User';
            idInput.value = user.id;
            nameInput.value = user.name;
            emailInput.value = user.email;
            roleInput.value = user.role;
            statusInput.value = user.status;
            userModal.classList.add('show');
        }
    };

    window.deleteUser = function(id) {
        if(confirm('Are you sure you want to delete this user?')) {
            users = users.filter(u => u.id !== id);
            saveToStorage();
            renderTable(users);
        }
    };

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newId = idInput.value ? parseInt(idInput.value) : Date.now();
        const userData = {
            id: newId,
            name: nameInput.value,
            email: emailInput.value,
            role: roleInput.value,
            status: statusInput.value
        };

        if (idInput.value) {
            // Edit
            const index = users.findIndex(u => u.id === parseInt(idInput.value));
            users[index] = userData;
        } else {
            // Add
            users.push(userData);
        }

        saveToStorage();
        renderTable(users);
        userModal.classList.remove('show');
    });

    // Initial render
    renderTable(users);
});
