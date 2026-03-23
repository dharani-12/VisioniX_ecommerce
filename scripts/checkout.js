const summaryItems = document.getElementById('summary-items');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');
const checkoutForm = document.getElementById('checkout-form');

const itemCount = document.getElementById('item-count');

const summaryDiscount = document.getElementById('summary-discount');
const summaryGST = document.getElementById('summary-gst');


function renderSummary() {
    if (!window.state || !state.cart) return;

    if (!summaryItems) return;

    if (state.cart.length === 0) {
        summaryItems.innerHTML = '<p class="no-results">Your cart is empty</p>';
        summarySubtotal.textContent = formatCurrency(0);
        if (summaryDiscount) summaryDiscount.textContent = formatCurrency(0);
        if (summaryGST) summaryGST.textContent = formatCurrency(0);
        if (summaryTotal) summaryTotal.textContent = formatCurrency(0);
        return;
    }

    itemCount.textContent = state.cart.length;

    summaryItems.innerHTML = state.cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>${item.quantity || 1} x ${formatCurrency(item.price)}</p>
                <p><strong>${formatCurrency(item.price * (item.quantity || 1))}</strong></p>
            </div>
        </div>
    `).join('');

    calculateTotal();
};

function calculateTotal() {
    const subtotal = state.cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const discount = subtotal > 2000 ? subtotal * 0.1 : 0; // 10% discount
    const gst = (subtotal - discount) * 0.18; // 18% GST

    const total = subtotal - discount + gst;

     if (summarySubtotal) summarySubtotal.textContent = formatCurrency(subtotal);

    if (summaryDiscount) {
        summaryDiscount.textContent = discount > 0
            ? "- " + formatCurrency(discount)
            : formatCurrency(0);
    }

    if (summaryGST) summaryGST.textContent = formatCurrency(gst);
    if (summaryTotal) summaryTotal.textContent = formatCurrency(total);

    return { subtotal, discount, gst, total };
}

/* PAYMENT TOGGLE (optional UI later) */
function getPaymentMethod() {
    const selected = document.querySelector('input[name="payment"]:checked');
    return selected ? selected.value : null;

};

function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

function markError(inputId) {
    const el = document.getElementById(inputId);
    if (el) el.classList.add("error");
}

function clearErrors() {
    document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
}

if (checkoutForm) {
    checkoutForm.onsubmit = (e) => {
        e.preventDefault();
        clearErrors();
        if (!window.state || !state.cart || state.cart.length === 0) {
            showError("form-error", "Your cart is empty. Please add items before checking out.");
            return;
        };

        const name = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const stateInput = document.getElementById("state").value.trim();
        const zip = document.getElementById("zip").value.trim();

        let valid = true;

        if (!name) {
            showError("name-error", "Required");
            markError("full-name");
            valid = false;
        }

        if (!email || !email.includes("@")) {
            showError("email-error", "Invalid email");
            markError("email");
            valid = false;
        }

        if (!address) {
            showError("address-error", "Required");
            markError("address");
            valid = false;
        }

        if (!city) {
            showError("city-error", "Required");
            markError("city");
            valid = false;
        }

        if (!stateInput) {
            showError("state-error", "Required");
            markError("state");
            valid = false;
        }

        if (!zip) {
            showError("zip-error", "Required");
            markError("zip");
            valid = false;
        }

        const method = getPaymentMethod();

        if (!method) {
            showError("payment-error", "Select a payment method");
            return;
        }

        if (method === "card") {
            // Validate card details here if needed
            if (!validateCard()) {
                showError("form-error", "Please fill in valid card details.");
                return;
            };
        };

        if (method === "upi") {
            if (!validateUPI()) {
                showError("form-error", "Please enter a valid UPI ID.");
                return;
            }
        };

        if (!valid) return;

        document.querySelectorAll("input, textarea").forEach(el => {
            el.addEventListener("input", () => {
                el.classList.remove("error");
            });
        });

        const orders = JSON.parse(localStorage.getItem('visionix_orders')) || [];

        // const total = state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        const total = calculateTotal();

        const newOrder = {
            id: 'VNX_ORD' + Date.now(),
            customer: state.currentUser ? state.currentUser.name : 'Guest Customer',
            email: email,
            paymentMethod: method,
            total: total,
            status: method === "cashondelivery" ? "Pending" : "Paid",
            hasPrescription: state.cart.some(item => item.customized),
            items: state.cart,
            date: new Date().toISOString()
        };

        localStorage.setItem('visionix_last_order', JSON.stringify(newOrder));

        orders.push(newOrder);
        localStorage.setItem('visionix_orders', JSON.stringify(orders));

        // Clear cart
        localStorage.setItem('visionix_cart', JSON.stringify([]));
        state.cart = [];
        updateUI();

        // alert('Order placed successfully! Thank you for shopping with Visionix.');
        window.location.href = 'order-success.html';

    };
};

function validateCard() {
    const number = document.getElementById("numberInput").value.replace(/\s/g, "");
    const name = document.getElementById("nameInput").value.trim();
    const month = document.getElementById("monthInput").value;
    const year = document.getElementById("yearInput").value;
    const cvv = document.getElementById("cvvPass").value;

    if (number.length !== 16) return false;
    if (!name) return false;
    if (month === "MM") return false;
    if (year === "YY") return false;
    if (cvv.length < 3) return false;

    return true;
}

function validateUPI() {
    const upiInput = document.getElementById("upi-id");
    const value = upiInput.value.trim();

    const upiPattern = /^[\w.-]+@[\w.-]+$/.test(value);

    document.getElementById("upi-status").textContent = upiPattern ? "Valid UPI ID ✓" : "Invalid UPI ID";

    return upiPattern;
}

document.addEventListener('DOMContentLoaded', () => {

    if (!window.state || !state.cart) {
        console.error("Cart not loaded");
        return;
    };

    renderSummary();

    document.querySelectorAll('input[name="payment"]').forEach(input => {
        input.addEventListener('change', () => {
            const selected = getPaymentMethod();

            const card = document.getElementById("card-payment");
            const upi = document.getElementById("upi-payment");

            card.classList.toggle("hidden", selected !== "card");
            upi.classList.toggle("hidden", selected !== "upi");
        });

    });

    initCardUI();
});

// card ui 

function initCardUI(){
    const cardDisk = document.getElementById("cardDisk");
    const form = document.getElementById("myCard");

    // Get card elements
    const cardNumber = document.getElementById("cardNumber");
    const cardName = document.getElementById("cardName");
    const cardMonth = document.getElementById("cardMonth");
    const cardYear = document.getElementById("cardYear");
    const errMsg = document.getElementById("errorMsg");

    // Get input elements
    const numberInput = document.getElementById("numberInput");
    const nameInput = document.getElementById("nameInput");
    const monthInput = document.getElementById("monthInput");
    const yearInput = document.getElementById("yearInput");
    const cvvPass = document.getElementById("cvvPass");

     if (cardDisk && form) {
        cardDisk.addEventListener("click", () => {
            cardDisk.classList.toggle("moved");
            form.classList.toggle("show");
        });
    }

    if (!numberInput) return;

    // Update card number
    numberInput.addEventListener("input", () => {
        try {
            const value = numberInput.value;
            let fmtd = "";
            let count = 0;

            for (let i = 0; i < value.length; i++) {
                const char = value[i];

                if (char >= "0" && char <= "9") {

                    if (count === 16) break;

                    if (count > 0 && count % 4 === 0) {
                        fmtd += " ";
                    };

                    fmtd += char;
                    count++

                } else if (char === " ") {

                    continue;

                } else {
                    throw new Error("Please Enter Numbers only.");
                }

            };

            numberInput.value = fmtd;
            cardNumber.textContent = fmtd || "#### #### #### ####";
            errMsg.textContent = "";
            numberInput.classList.remove("error");


        } catch (error) {
            errMsg.textContent = error.message;
            errMsg.style.color = "red";
            numberInput.classList.add("error");

        }

    });

    // Update card name
    nameInput.addEventListener("input", () => {
        cardName.textContent = nameInput.value.toUpperCase() || "FULL NAME";
    });

    // Update card expiration month
    monthInput.addEventListener("change", () => {
        cardMonth.textContent = monthInput.value !== "MM" ? monthInput.value : "MM";
    });

    // Update card expiration year
    yearInput.addEventListener("change", () => {
        cardYear.textContent = yearInput.value !== "YY" ? yearInput.value : "YY";
    });

    const cardForm = document.querySelector(".card-formss");

    if (cardForm) {
        cardForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if(!validateCard()){
                showError("form-error","Invalid card details. Please check and try again.");
                return;
            }

            showError("form-error","Card validated successfully!", "green");
            form.classList.remove("show");
            cardDisk.classList.remove("moved");


        });
    }

};