const productContainer = document.getElementById('product-container');
const lensModal = document.getElementById('lens-modal');
const lensForm = document.getElementById('lens-form');
const closeModal = document.querySelector('.close-modal');

document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!window.state || !state.products) {
        console.error("Products not loaded yet");
        return;
    }

    const product = state.products.find(p => String(p.id) === String(productId));

    if (!product) {
        productContainer.innerHTML = "<p>Product not found.</p>";
        return;
    }

    renderProductDetails(product);



    if (lensForm) {
        lensForm.onsubmit = (e) => {
            e.preventDefault();
            const lensType = document.getElementById('lens-type').value;
            const lensPrice = {
                'standard': 0,
                'blue-light': 1500,
                'anti-glare': 1000,
                'photochromic': 3000,
                'progressive': 4500
            } [lensType];

            const customizedProduct = {
                ...product,
                id: Date.now(), // Unique ID for customized item
                originalId: product.id,
                name: `${product.name} (Custom Lenses)`,
                price: product.price + lensPrice,
                customized: true,
                lensType: lensType
            };

            state.cart.push(customizedProduct);
            localStorage.setItem('visionix_cart', JSON.stringify(state.cart));
            updateUI();
            lensModal.classList.remove('show');
            alert('Customized product added to cart!');
        };
    }

});


function renderProductDetails(product) {
    const productContainer = document.getElementById('product-container');

    if (!product || !productContainer) return;

    const oldPrice = product.price;
    const newPrice = product.discount ?
        Math.round(product.price * (1 - product.discount / 100)) :
        product.price;

    productContainer.innerHTML = `
        <div class="product-details-grid">
        <div class="product-gallery">
            <img src="${product.image}" alt="${product.name}" referrerPolicy="no-referrer">
        </div>
        <div class="product-info-detailed">

            <span class="hero-subtitle">${product.category}</span>
            <h1>${product.name}</h1>
            <div class="product-meta">
                <div class="product-rating">
                    <i class="fas fa-star"></i> ${product.rating} (120 Reviews)
                </div>
                <span>|</span>
                <span>SKU: ${product.id}</span>
            </div>
            <div class="product-price-large">
                ${formatCurrency(newPrice)}
                ${product.discount ? `<span class="old-price">${formatCurrency(oldPrice)}</span>` : ""}
            </div>
            
            <div class="product-specs">
            <div class="spec-item"><strong>Material:</strong> ${product.material}</div>
            <div class="spec-item"><strong>Frame Size:</strong> ${product.size}</div>
            <div class="spec-item"><strong>Warranty:</strong> 1 Year Manufacturer Warranty</div>
            </div>

            <p class="product-description">
            Experience ultimate comfort and style with our ${product.name}. 
            Crafted from premium ${product.material}, these frames are designed to be lightweight yet durable. 
            Perfect for daily wear, whether you're at the office or out on the town.
            </p>

            <div class="product-actions mt-40 flex gap-20">
            <button class="btn btn-primary" id="buy-now-btn">Buy Now</button>

            ${product.lens ? `<button class="btn btn-outline" id="customize-btn">Customize Lenses</button>` : `<button class="btn btn-outline" id="customize-btn">Customize Lenses</button>`}
            </div>
        </div>
        </div>
    `;

    document.getElementById('customize-btn') ?.addEventListener('click', () => {
        lensModal.classList.add('show');
    });

    document.getElementById('buy-now-btn').addEventListener('click', () => {
        window.addToCart(product.id);
        window.location.href = 'checkout.html';
    });
}

if (closeModal && lensModal) {
    closeModal.onclick = () => lensModal.classList.remove('show');
}

window.onclick = (event) => {
    if (event.target == lensModal) lensModal.classList.remove('show');
};