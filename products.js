document.addEventListener('DOMContentLoaded', () => {
    // Basic Product Data
    const defaultData = [
        { id: 1, name: 'Wireless Headphones', price: 120.50, qty: 45, picture: 'https://via.placeholder.com/40', status: 'In Stock' },
        { id: 2, name: 'Mechanical Keyboard', price: 95.00, qty: 0, picture: 'https://via.placeholder.com/40', status: 'Out of Stock' },
        { id: 3, name: 'Gaming Mouse', price: 45.99, qty: 120, picture: 'https://via.placeholder.com/40', status: 'In Stock' }
    ];

    let products = JSON.parse(localStorage.getItem('productsData')) || defaultData;

    const tableBody = document.getElementById('productsTableBody');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const modalTitle = document.getElementById('modalTitle');

    const addProductBtn = document.getElementById('addProductBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Input fields
    const idInput = document.getElementById('productId');
    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const qtyInput = document.getElementById('productQty');
    const picInput = document.getElementById('productPic');
    const statusInput = document.getElementById('productStatus');

    function saveToStorage() {
        localStorage.setItem('productsData', JSON.stringify(products));
    }

    function renderTable(dataToRender) {
        tableBody.innerHTML = '';
        dataToRender.forEach(prod => {
            const tr = document.createElement('tr');
            
            const statusClass = prod.status === 'In Stock' ? 'active' : 'inactive';

            tr.innerHTML = `
                <td><img src="${prod.picture}" class="product-img" alt="Product"></td>
                <td>${prod.name}</td>
                <td>$${parseFloat(prod.price).toFixed(2)}</td>
                <td>${prod.qty}</td>
                <td><span class="badge ${statusClass}">${prod.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="editProduct(${prod.id})">Edit</button>
                    <button class="action-btn delete" onclick="deleteProduct(${prod.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function applyFilterAndSort() {
        const query = searchInput.value.toLowerCase();
        const sortVal = sortSelect.value;

        // Filter
        let result = products.filter(p => p.name.toLowerCase().includes(query));

        // Sort
        if (sortVal === 'priceAsc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'priceDesc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortVal === 'qtyAsc') {
            result.sort((a, b) => a.qty - b.qty);
        }

        renderTable(result);
    }

    searchInput.addEventListener('keyup', applyFilterAndSort);
    sortSelect.addEventListener('change', applyFilterAndSort);

    // --- Modal Logic ---
    addProductBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Add Product';
        productForm.reset();
        idInput.value = '';
        productModal.classList.add('show');
    });

    closeModalBtn.addEventListener('click', () => {
        productModal.classList.remove('show');
    });

    window.editProduct = function(id) {
        const prod = products.find(p => p.id === id);
        if (prod) {
            modalTitle.textContent = 'Edit Product';
            idInput.value = prod.id;
            nameInput.value = prod.name;
            priceInput.value = prod.price;
            qtyInput.value = prod.qty;
            picInput.value = prod.picture;
            statusInput.value = prod.status;
            productModal.classList.add('show');
        }
    };

    window.deleteProduct = function(id) {
        if(confirm('Are you sure you want to delete this product?')) {
            products = products.filter(p => p.id !== id);
            saveToStorage();
            applyFilterAndSort();
        }
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newId = idInput.value ? parseInt(idInput.value) : Date.now();
        const prodData = {
            id: newId,
            name: nameInput.value,
            price: parseFloat(priceInput.value),
            qty: parseInt(qtyInput.value),
            picture: picInput.value,
            status: statusInput.value
        };

        if (idInput.value) {
            // Edit
            const index = products.findIndex(p => p.id === parseInt(idInput.value));
            products[index] = prodData;
        } else {
            // Add
            products.push(prodData);
        }

        saveToStorage();
        applyFilterAndSort();
        productModal.classList.remove('show');
    });

    // Initial render
    renderTable(products);
});
