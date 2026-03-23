
const navbar = `
<nav class="navbar">

    <div class="container nav-container">

        <div class="language-dropdown">
            <button class="lang-btn">
                <img src="https://flagcdn.com/w20/us.png" alt="English">En
                    <i class="fas fa-chevron-down"></i>
            </button>

            <ul class="lang-menu">
                <li data-lang="en">
                    <img src="https://flagcdn.com/w20/us.png" alt="English"> En
                </li>
                <li data-lang="fr">
                    <img src="https://flagcdn.com/w20/fr.png" alt="French"> Fr
                </li>
                <li data-lang="hi">
                    <img src="https://flagcdn.com/w20/in.png" alt="Hindi"> Hi
                </li>
                <li data-lang="es">
                    <img src="https://flagcdn.com/w20/es.png" alt="Spanish"> Sp
                </li>
            </ul>
        </div>

        <div class="offer-bar">
            <div class="offer-track">
                <span>🔥 20% OFF on Premium Frames</span>
                <span>🚚 Free Shipping above ₹999</span>
                <span>🕶 Buy 1 Get 1 Free Sunglasses</span>
                <span>💳 Extra 10% OFF with Card</span>
            </div>
        </div>


        <button id="theme-toggle" class="nav-btn" title="Toggle Dark Mode">
            <i class="fas fa-moon"></i>
        </button>

    </div>

    <hr class="nav-container hrs">

    <div class="container nav-container">

        <a href="index.html" class="logo">
            <img src="images/logo33.png" alt="logo">
            VisioniX<span>&reg;</span>
        </a>

        <div class="nav-search">
            <input type="text" placeholder="Search frames, sunglasses..." id="global-search">
            <i class="fas fa-search"></i>
        </div>

        <div class="nav-actions">

            <div class="dropdown">
                <button class="nav-btn wishlist-trigger">
                    <i class="far fa-heart"></i>
                    <span class="badge" id="wishlist-count">0</span>
                </button>
                <div class="dropdown-content wishlist-dropdown" id="wishlist-dropdown">
                    <p class="empty-msg">Your wishlist is empty</p>
                </div>
            </div>

            <div class="dropdown">
                <button class="nav-btn cart-trigger">
                    <i class="fa-brands fa-opencart"></i>
                    <span class="badge" id="cart-count">0</span>
                </button>
                <div class="dropdown-content cart-dropdown"  id="cart-dropdown">
                    <div class="cart-items" id="cart-items-list">
                  <p class="empty-msg">Your cart is empty</p>
                </div>
                <div class="cart-footer hidden" id="cart-footer">
                  <div class="cart-total">
                    <span>Total:</span>
                    <span id="cart-total-amount">$0.00</span>
                  </div>
                  <a href="checkout.html" class="btn btn-primary btn-block">Checkout</a>
                </div>
                </div>
            </div>

            <div class="dropdown">
                <button type="button" class="nav-btn profile-trigger">
                    <i class="far fa-user"></i>
                </button>

                <div class="dropdown-content profile-dropdown">

                    <div id="auth-links" class="auth-links">
                        <a href="login.html">
                        <i class="fa-solid fa-right-to-bracket"></i> Login
                        </a>
                        <a href="register.html"><i class="fa-solid fa-user-plus"></i> Register</a>
                    </div>

                    <div id="user-links" class="hidden">
                        <div class="user-info">
                    <p id="user-name-display">Username</p>
                    <span id="user-role-badge" class="badge-role">User</span>
                  </div>
                  <hr>
                  <a href="admin.html" id="admin-link" class="hidden"><i class="fas fa-user-shield"></i> Admin Panel</a>
                  <a href="#"><i class="fas fa-history"></i> My Orders</a>
                  <a href="login.html" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>

                </div>
            </div>

            <button type="button" class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </button>

        </div>

    </div>

    <hr class="nav-container hrs">

    <div class="navbuttom">

        <div class="left"></div>

        <div class="center">
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="shop.html">Shop</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="service.html">Service</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>

        <div class="right"></div>

    </div>

</nav>
`;

document.getElementById("navbar").innerHTML = navbar;

document.addEventListener("DOMContentLoaded", function () {

    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "") {
        currentPage = "index.html";
    }

    document.querySelectorAll(".nav-links a").forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }

    });

});