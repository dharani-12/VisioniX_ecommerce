const sections = document.querySelectorAll('.admin-section');
const menuLinks = document.querySelectorAll('.sidebar-menu a[data-section]');
const sectionTitle = document.getElementById('section-title');

// Stats Elements
const totalUsersEl = document.getElementById('total-users');
const totalOrdersEl = document.getElementById('total-orders');
const totalRevenueEl = document.getElementById('total-revenue');
const totalProductsEl = document.getElementById('total-products');

// Table Lists
const adminProductsList = document.getElementById('admin-products-list');
const adminOrdersList = document.getElementById('admin-orders-list');
const adminUsersList = document.getElementById('admin-users-list');

// Modal Elements
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const addProductBtn = document.getElementById('add-product-btn');
const closeModal = productModal.querySelector('.close-modal');

const menuToggle = document.getElementById("menu-toggle");
const adminSidebar = document.getElementById('admin-sidebar');

if (menuToggle && adminSidebar) {
    menuToggle.addEventListener("click", () => {
        adminSidebar.classList.toggle("active");
        const icon = menuToggle?.querySelector('i');
            if(!icon) return;
        if (adminSidebar.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Navigation
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-section');

        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        sections.forEach(s => s.classList.add('hidden'));
        const section = document.getElementById(`${target}-section`);
        if(section) section.classList.remove('hidden');

        sectionTitle.textContent = link.textContent.trim();
        loadSectionData(target);

         if (window.innerWidth <= 992 && adminSidebar) {
      adminSidebar.classList.remove('active');
      if (menuToggle) {
        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
      }
    }
    });
});

function loadSectionData(section) {
    const products = JSON.parse(localStorage.getItem('visionix_products')) || [];
    const orders = JSON.parse(localStorage.getItem('visionix_orders')) || [];
    const users = JSON.parse(localStorage.getItem('visionix_users')) || [];

    if (section === 'dashboard') {
        totalUsersEl.textContent = users.length;
        totalOrdersEl.textContent = orders.length;
        totalProductsEl.textContent = products.length;
        const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        totalRevenueEl.textContent = formatCurrency(revenue);
    }

    if (section === 'products') {
        renderAdminProducts(products);
    }

    if (section === 'orders') {
        renderAdminOrders(orders);
    }

    if (section === 'users') {
        renderAdminUsers(users);
    }
}

function renderAdminProducts(products) {
    adminProductsList.innerHTML = products.map(p => `
    <tr>
        <td>${p.id}</td>
        <td><img src="${p.image}" class="table-img"></td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${formatCurrency(p.price)}</td>

        <td>
            <span 
            class="status-badge ${p.stock === "Out of Stock" ? "status-out" : "status-in"}"
            onclick="toggleStock('${p.id}')"
            style="cursor:pointer"
            >
            ${p.stock === "Out of Stock" ? "Out of Stock" : "InStock"}
            </span>
        </td>

        <td>
            <button class="btn-icon" onclick="editProduct('${p.id}')"><i class="fas fa-edit"></i></button>
            <button class="btn-icon text-danger" onclick="deleteProduct('${p.id}')"><i class="fas fa-trash"></i></button>
        </td>
    </tr>
  `).join('');
}


/* STOCK UPDATE */

window.toggleStock = (id) => {

    const products = JSON.parse(localStorage.getItem("visionix_products")) || [];

    const index = products.findIndex(p => String(p.id) === String(id));

    if (index > -1) {

        products[index].stock =
            products[index].stock === "InStock" ?
            "Out of Stock" :
            "InStock";

    }

    localStorage.setItem("visionix_products", JSON.stringify(products));

    loadSectionData("products");

};

function generateProductId(category){

    const products = JSON.parse(localStorage.getItem('visionix_products')) || [];

    const prefix = `VNX-${category.toUpperCase().trim()}`;

    const categoryProducts = products.filter(p => p.id.startsWith(prefix));

    const numbers = categoryProducts.map(p => {

        const parts = p.id.split("-");

        return parseInt(parts[2]) || 0;

    });

    const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1;

    const formatted = String(nextNumber).padStart(5,"0");

    return `${prefix}-${formatted}`;
};

function renderAdminOrders(orders) {
    adminOrdersList.innerHTML = orders.map(o => `
    <tr>
      <td>#${o.id}</td>
      <td>${o.customer}</td>
      <td>
        ${o.hasPrescription ? '<span class="badge-role badge-prescription">Prescription</span>' : 'Standard'}
        <div class="item-names">
          ${o.items ? o.items.map(i => i.name).join(', ') : ''}
        </div>
      </td>
      <td>${formatCurrency(o.total)}</td>
      <td>
        <select onchange="window.updateOrderStatus(${o.id}, this.value)" class="status-badge status-${o.status.toLowerCase()}">
          <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
    </tr>
  `).join('');
}

window.updateOrderStatus = (id, newStatus) => {
    const orders = JSON.parse(localStorage.getItem('visionix_orders')) || [];
    const index = orders.findIndex(o => o.id === id);
    if (index > -1) {
        orders[index].status = newStatus;
        localStorage.setItem('visionix_orders', JSON.stringify(orders));
        loadSectionData('orders');
    }
};

function renderAdminUsers(users) {
    adminUsersList.innerHTML = users.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.username}</td>
      <td>${u.registeredAt || "-"}</td>
    
    </tr>
  `).join('');
}

// Product CRUD
if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {

        productForm.reset();

        document.getElementById("edit-id").value = "";

        document.getElementById("modal-title").textContent = "Add New Product";

        productModal.classList.add("show");

    });
}

if (closeModal) {

    closeModal.addEventListener("click", () => {

        productModal.classList.remove("show");

    });

}

window.editProduct = (id) => {

    const products = JSON.parse(localStorage.getItem('visionix_products')) || [];

    const p = products.find(prod => String(prod.id) === String(id));

    if (!p) return;

    document.getElementById('edit-id').value = p.id;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-cat').value = p.category;
    document.getElementById('prod-price').value = p.price;
    document.getElementById('prod-img').value = p.image;
    document.getElementById('prod-mat').value = p.material;

    document.getElementById('modal-title').textContent = 'Edit Product';

    productModal.classList.add('show');

};

window.deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem('visionix_products')) || [];
        products = products.filter(p => String(p.id) !== String(id));
        localStorage.setItem('visionix_products', JSON.stringify(products));
        loadSectionData('products');
    }
};

if (productForm) {
    productForm.onsubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const products = JSON.parse(localStorage.getItem('visionix_products')) || [];

        const productData = {
            id: id || generateProductId(document.getElementById('prod-cat').value),
            name: document.getElementById('prod-name').value,
            category: document.getElementById('prod-cat').value,
            price: parseFloat(document.getElementById('prod-price').value),
            image: document.getElementById('prod-img').value,
            material: document.getElementById('prod-mat').value,
            stock: "InStock",
            rating: 4.5,
            discount: "",
            lens: "",
            badge: "",
            offer: "",
            size: ""
        };

        if (id) {
            const index = products.findIndex(p => p.id === id);
            products[index] = {
                ...products[index],
                ...productData
            };
        } else {
            products.push(productData);
        }

        localStorage.setItem('visionix_products', JSON.stringify(products));
        productModal.classList.remove('show');
        loadSectionData('products');
    };
};



window.addEventListener("click", (e) => {
    if (e.target === productModal) {
        productModal.classList.remove("show");
    }
});

// Logout
const logoutBtns = document.getElementById('admin-logout');
if (logoutBtns) {
    logoutBtns.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('visionix_user');
        window.location.href = 'login.html';
    });
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('visionix_user'));
    if (!user || user.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    loadSectionData('dashboard');
});