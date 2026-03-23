const shopProducts = document.getElementById('shop-products');
const categoryFilters = document.querySelectorAll('#category-filters input');
const materialFilters = document.querySelectorAll('#material-filters input');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const sortBy = document.getElementById('sort-by');
const shopTitle = document.getElementById('shop-title');

if (!window.state) {
    console.error("State not loaded yet");
}

let filteredProducts = [];

function renderProducts() {
    if (!shopProducts) return;

    if (filteredProducts.length === 0) {
        shopProducts.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
        return;
    }

    shopProducts.innerHTML = filteredProducts.map(product => {

        const oldPrice = product.price;
        const newPrice = product.discount ?
            Math.round(product.price * (1 - product.discount / 100)) :
            product.price;

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

function applyFilters() {
    const selectedCats = Array.from(categoryFilters).filter(i => i.checked).map(i => i.value);
    const selectedMats = Array.from(materialFilters).filter(i => i.checked).map(i => i.value);
    const maxPrice = parseInt(priceRange.value);
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search')?.toLowerCase();

    filteredProducts = (state.products || []).filter(p => {
        const catMatch = selectedCats.length === 0 || selectedCats.includes(p.category);
        const matMatch = selectedMats.length === 0 || selectedMats.includes(p.material);
        const priceMatch = p.price <= maxPrice;
        const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery);
        return catMatch && matMatch && priceMatch && searchMatch;
    });

    // Apply Sorting
    const sort = sortBy.value;
    if (sort === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);

    renderProducts();
}

// Event Listeners
categoryFilters.forEach(i => i.addEventListener('change', applyFilters));
materialFilters.forEach(i => i.addEventListener('change', applyFilters));
priceRange.addEventListener('input', (e) => {
    priceValue.textContent = formatCurrency(e.target.value);
    applyFilters();
});
sortBy.addEventListener('change', applyFilters);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    const searchParam = urlParams.get('search');

    filteredProducts = [...state.products];

    if (catParam) {
        const checkbox = Array.from(categoryFilters).find(i => i.value === catParam);
        if (checkbox) checkbox.checked = true;
        shopTitle.textContent = catParam.charAt(0).toUpperCase() + catParam.slice(1) + " Eyewear";
    } else if (searchParam) {
        shopTitle.textContent = `Search results for "${searchParam}"`;
    }

    applyFilters();
});

const filterToggle = document.getElementById("filter-toggle");
const filterSidebar = document.querySelector(".shop-sidebar");
const filterOverlay = document.getElementById("filter-overlay");

if (filterToggle && filterSidebar) {

    filterToggle.addEventListener("click", () => {

        filterSidebar.classList.toggle("active");
        filterOverlay.classList.toggle("active");

    });

}

if (filterOverlay) {

    filterOverlay.addEventListener("click", () => {

        filterSidebar.classList.remove("active");
        filterOverlay.classList.remove("active");

    });

}

document.getElementById("filter-close")?.addEventListener("click",()=>{
    filterSidebar.classList.remove("active");
    filterOverlay.classList.remove("active");
});