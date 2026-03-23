// Language Change

const langBtn = document.querySelector(".lang-btn");
const langMenu = document.querySelector(".lang-menu");


if (langBtn && langMenu) {
    langBtn.addEventListener("click", () => {
        langMenu.classList.toggle("show");
    });

    document.querySelectorAll(".lang-menu li").forEach(item => {
        item.addEventListener("click", () => {

            const flag = item.querySelector("img").src;
            const text = item.textContent.trim();

            langBtn.innerHTML = `<img src="${flag}"> ${text} <i class="fas fa-chevron-down"></i>`;

            langMenu.classList.remove("show");
        });
    });
}

// hero class using swipper
const swippe = document.querySelector(".heroSwiper");

if (swippe) {

    const heroSwiper = new Swiper(".heroSwiper", {

        loop: true,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        speed: 1200,

        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

// Sample Product Data
const initialProducts = [

/* ---------- MEN ---------- */

{
id: "VNX-MEN-00001",
name: "Titan Edge Aviator",
category: "men",
price: 18990,
rating: 4.9,
image: "https://api.titaneyeplus.com/media/catalog/product/M/8/M8021GR13V_7_lar.jpg",
badge: "Premium",
discount: 20,
lens: true,
offer: "20% OFF",
material: "Titanium",
size: "Medium"
},

{
id: "VNX-MEN-00002",
name: "Urban Wayfarer",
category: "men",
price: 1899,
rating: 4.6,
image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400",
badge: "Best Value",
discount: 0,
lens: false,
offer: null,
material: "Acetate",
size: "Large"
},

/* ---------- WOMEN ---------- */

{
id: "VNX-WOMEN-00001",
name: "Luxury Cat Eye Gold",
category: "women",
price: 17500,
rating: 4.8,
image: "https://bshopy.in/cdn/shop/files/O1CN01IcvG3t1SvZZ6WE6OJ__2216026832309-0-cib.jpg?v=1746877157",
badge: "Premium",
discount: 15,
lens: false,
offer: "15% OFF",
material: "Gold Plated Metal",
size: "Medium"
},

{
id: "VNX-WOMEN-00002",
name: "Retro Round Chic",
category: "women",
price: 2950,
rating: 4.5,
image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=400",
badge: "Trending",
discount: 0,
lens: true,
offer: null,
material: "Metal",
size: "Small"
},

/* ---------- KIDS ---------- */

{
id: "VNX-KIDS-00001",
name: "Junior Flex Vision",
category: "kids",
price: 5500,
rating: 4.4,
image: "https://images.unsplash.com/photo-1556015048-4d3aa10df74c?auto=format&fit=crop&q=80&w=400",
badge: "Premium",
discount: 10,
lens: true,
offer: "10% OFF",
material: "Flexible TR90",
size: "Small"
},

{
id: "VNX-KIDS-00002",
name: "ColorPop Kids Frame",
category: "kids",
price: 1999,
rating: 4.3,
image: "https://images.unsplash.com/photo-1600180758890-6c5c9c9d7c64?auto=format&fit=crop&q=80&w=400",
discount: 0,
lens: false,
badge: "Kids Choice",
offer: null,
material: "Plastic",
size: "Small"
},

/* ---------- PRESCRIPTION ---------- */

{
id: "VNX-PRESCRIPTION-00001",
name: "Visionix Pro Optical",
category: "prescription",
price: 12900,
rating: 4.7,
image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
badge: "Premium",
discount: 23,
lens: true,
offer: "Flat ₹1000 OFF",
material: "Carbon Fiber",
size: "Medium"
},

{
id: "VNX-PRESCRIPTION-00002",
name: "Daily Optical Frame",
category: "prescription",
price: 7999,
rating: 4.4,
image: "https://images.unsplash.com/photo-1587574293340-6f9c6e2db279?auto=format&fit=crop&q=80&w=400",
discount: 0,
lens: true,
badge: "Doctor Recommended",
offer: null,
material: "Acetate",
size: "Medium"
},

/* ---------- SUNGLASSES ---------- */

{
id: "VNX-SUNGLASSES-00001",
name: "SunGuard Polarized",
category: "sunglasses",
price: 1350,
rating: 4.8,
image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400",
badge: "Best Seller",
discount: 25,
lens: false,
offer: "25% OFF",
material: "Polarized Lens",
size: "Large"
},

{
id: "VNX-SUNGLASSES-00002",
name: "StreetShade Classic",
category: "sunglasses",
price: 699,
rating: 4.3,
image: "https://images.unsplash.com/photo-1600181958805-8c4c1d4c0e41?auto=format&fit=crop&q=80&w=400",
discount: 0,
lens: true,
badge: null,
offer: null,
material: "Plastic",
size: "Medium"
},

/* ---------- COMPUTER / BLUE LIGHT ---------- */

{
id: "VNX-COMPUTER-00001",
name: "BlueGuard Pro",
category: "computer",
price: 999,
rating: 4.6,
image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400",
badge: "Blue Light",
discount: 20,
lens: true,
offer: "20% OFF",
material: "Anti Blue Lens",
size: "Medium"
},

{
id: "VNX-COMPUTER-00002",
name: "ScreenSafe Lite",
category: "computer",
price: 650,
rating: 4.2,
image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400",
discount: 0,
lens: false,
badge: null,
offer: null,
material: "Polycarbonate",
size: "Medium"
}

];

// Initialize Data
function initData() {
    if (!localStorage.getItem('visionix_products')) {
        localStorage.setItem('visionix_products', JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem('visionix_cart')) {
        localStorage.setItem('visionix_cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('visionix_wishlist')) {
        localStorage.setItem('visionix_wishlist', JSON.stringify([]));
    }
}

// State Management
window.state = {};

document.addEventListener('DOMContentLoaded', () => {

    initData();

    window.state = {
        products: JSON.parse(localStorage.getItem('visionix_products')) || [],
        cart: JSON.parse(localStorage.getItem('visionix_cart')) || [],
        wishlist: JSON.parse(localStorage.getItem('visionix_wishlist')) || [],
        currentUser: JSON.parse(localStorage.getItem('visionix_user')) || null,
        theme: localStorage.getItem('visionix_theme') || 'light'
    };

    updateUI();
    renderFeatured();

});

// UI Elements
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartFooter = document.getElementById('cart-footer');
const cartTotalAmount = document.getElementById('cart-total-amount');
const wishlistDropdown = document.getElementById('wishlist-dropdown');
const themeToggle = document.getElementById('theme-toggle');
const featuredProducts = document.getElementById('featured-products');
const authLinks = document.getElementById('auth-links');
const userLinks = document.getElementById('user-links');
const userNameDisplay = document.getElementById('user-name-display');
const userRoleBadge = document.getElementById('user-role-badge');
const adminLink = document.getElementById('admin-link');
const logoutBtn = document.getElementById('logout-btn');
const globalSearch = document.getElementById('global-search');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Dropdown Elements
const dropdowns = document.querySelectorAll('.dropdown');

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Functions
function updateUI() {
    // Update Counts
    if (cartCount) cartCount.textContent = state.cart.length;
    if (wishlistCount) wishlistCount.textContent = state.wishlist.length;

    // Update Cart Dropdown
    if (cartItemsList) {
        if (state.cart.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
            if (cartFooter) cartFooter.classList.add('hidden');
        } else {
            cartItemsList.innerHTML = state.cart.map(item => `
        <div class="cart-item-mini">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>${formatCurrency(item.price)}</p>
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
              <span>${item.quantity || 1}</span>
              <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="remove-item" onclick="removeFromCart('${item.id}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('');

            const total = state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            if (cartTotalAmount) cartTotalAmount.textContent = `${formatCurrency(total)}`;
            if (cartFooter) cartFooter.classList.remove('hidden');
        }
    }

    // Update Wishlist Dropdown
    if (wishlistDropdown) {
        if (state.wishlist.length === 0) {
            wishlistDropdown.innerHTML = '<p class="empty-msg">Your wishlist is empty</p>';
        } else {
            const wishlistItems = state.products.filter(p => state.wishlist.includes(p.id));
            wishlistDropdown.innerHTML = wishlistItems.map(item => `
        <div class="cart-item-mini">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>${formatCurrency(item.price)}</p>
          </div>
          <button class="remove-item" onclick="toggleWishlist('${item.id}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join('') + '<a href="shop.html" class="btn btn-outline btn-block mt-10">View Shop</a>';
        }
    }

    // Update Auth State
    if (state.currentUser) {
        if (authLinks) authLinks.classList.add('hidden');
        if (userLinks) userLinks.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.textContent = state.currentUser.name;
        if (userRoleBadge) userRoleBadge.textContent = state.currentUser.role;
        if (adminLink && state.currentUser.role === 'admin') adminLink.classList.remove('hidden');
    } else {
        if (authLinks) authLinks.classList.remove('hidden');
        if (userLinks) userLinks.classList.add('hidden');
    }

    // Apply Theme
    if (state.theme === 'dark') {
        document.body.classList.add('dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

// Cart Actions
window.addToCart = (productId) => {
    const product = state.products.find(p => String(p.id) === String(productId));
    if(product.stock === "Out of Stock"){
        showToast("Product is currently out of stock");
        return;
    }
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('visionix_cart', JSON.stringify(state.cart));
    updateUI();
    showToast(`${product.name} added to cart`);
};

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-check"></i> ${message}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show")
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 3000);

};

window.removeFromCart = (productId) => {
    state.cart = state.cart.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('visionix_cart', JSON.stringify(state.cart));
    updateUI();
};

window.updateQuantity = (productId, delta) => {
    const item = state.cart.find(i => String(i.id) === String(productId));
    if (item) {
        item.quantity = (item.quantity || 1) + delta;
        if (item.quantity <= 0) {
            window.removeFromCart(productId);
        } else {
            localStorage.setItem('visionix_cart', JSON.stringify(state.cart));
            updateUI();
        }
    }
};

// Wishlist Actions
window.toggleWishlist = (productId) => {
    const index = state.wishlist.findIndex(id => String(id) === String(productId));
    if (index > -1) {
        state.wishlist.splice(index, 1);
    } else {
        state.wishlist.push(productId);
    }
    localStorage.setItem('visionix_wishlist', JSON.stringify(state.wishlist));
    updateUI();

    // Update heart icons on page
    const hearts = document.querySelectorAll(`.product-wishlist[data-id="${productId}"]`);
    hearts.forEach(h => h.classList.toggle('active'));
};

// Render Products
function renderFeatured() {

  if (!featuredProducts) return;

  const featured = state.products.filter(p => p.badge === "Premium").slice(0,8);

  featuredProducts.innerHTML = featured.map(product => {

    const oldPrice = product.price;
    const newPrice = product.discount
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

    return `

    <div class="product-card ${product.stock === "Out of Stock" ? "out-of-stock" : ""}">

      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}

      ${product.discount ? `<span class="product-offer">${product.discount}% OFF</span>` : ''}

      ${product.lens ? `<span class="lens-badge">Lens Customizable</span>` : ''}

      <div class="product-wishlist ${state.wishlist.includes(product.id) ? 'active' : ''}"
           data-id="${product.id}"
           onclick="toggleWishlist('${product.id}')">

           <i class="fas fa-heart"></i>
      </div>

      <a href="product.html?id=${product.id}" class="product-img">
        <img src="${product.image}" alt="${product.name}">
      </a>

      <div class="product-info">

        <span class="product-cat">${product.category}</span>

        <a href="product.html?id=${product.id}">
          <h3>${product.name}</h3>
        </a>

        <div class="product-rating">
          ${Array(Math.floor(product.rating)).fill('<i class="fas fa-star"></i>').join('')}
          ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
          <span>${product.rating}</span>
        </div>

        <div class="product-price-row">

          <div class="price-box">

            ${product.discount
              ? `<span class="old-price">₹${oldPrice}</span>
                 <span class="price">₹${newPrice}</span>`
              : `<span class="price">₹${oldPrice}</span>`}

          </div>

          ${product.stock === "Out of Stock" ? 
                `<button class="add-cart-btn disabled" disabled>
                    <i class="fas fa-ban"></i>
                </button>` 
                : 
                `<button class="add-cart-btn" onclick="addToCart('${product.id}')">
                    <i class="fas fa-plus"></i>
                </button>`
            }

        </div>

      </div>

    </div>

    `;

  }).join('');
}

setTimeout(() => {
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        const id = btn.dataset.id;
        if (state.wishlist.includes(id)) {
            btn.classList.add('active');
        }
    });
}, 50);

// Event Listeners
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('visionix_theme', state.theme);
        updateUI();
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('visionix_user');
        state.currentUser = null;
        window.location.href = 'index.html';
    });
}

if (globalSearch) {
    globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = globalSearch.value.trim();
            if (query) {
                window.location.href = `shop.html?search=${encodeURIComponent(query.toLowerCase())}`;
            }
        }
    });
}

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Dropdown Click Logic
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-btn');
    const content = dropdown.querySelector('.dropdown-content');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();

        // Close other dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown) {
                d.querySelector('.dropdown-content').classList.remove('show');
            }
        });

        content.classList.toggle('show');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    dropdowns.forEach(d => {
        d.querySelector('.dropdown-content').classList.remove('show');
    });
});

// Prevent closing when clicking inside dropdown content
document.querySelectorAll('.dropdown-content').forEach(content => {
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

window.addEventListener("storage", () => {

    state.products = JSON.parse(localStorage.getItem("visionix_products")) || [];

    renderFeatured();
    updateUI();

});