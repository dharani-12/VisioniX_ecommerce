const order = JSON.parse(localStorage.getItem("visionix_last_order"));

if(!order){
window.location.href = "shop.html";
}

// Fill order info
document.getElementById("order-id").textContent = order.id;
document.getElementById("order-payment").textContent = order.paymentMethod.toUpperCase();

const date = new Date(order.date);
document.getElementById("order-date").textContent = date.toLocaleString();

// Items
const itemsContainer = document.getElementById("order-items");

itemsContainer.innerHTML = order.items.map(item => `
<div class="order-item">
<img src="${item.image}">
<div>
<h4>${item.name}</h4>
<p>${formatCurrency(item.price * (item.quantity || 1))}</p>
</div>
</div>
`).join('');

// Total
document.getElementById("order-total").textContent = formatCurrency(order.total);