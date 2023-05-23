const cartItemsContainer = document.getElementById('cart-items');
const cartCounter = document.getElementById('cart-counter');
const cartPrice = document.getElementById('cart-price');

function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item) => {
        const html = `
            <div class="cart-item">
                <img src="${item.img}" alt="Product Image" class="product-image">
                <h2>${item.name}</h2>
                <button class="remove-item" onclick="removeItem(event)">Удалить</button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', html);
        totalPrice += 10;
    });

    cartCounter.textContent = cartItems.length;
    cartPrice.textContent = totalPrice.toFixed(2);
}

function removeItem(event) {
    const cartItem = event.target.closest('.cart-item');
    const itemName = cartItem.querySelector('h2').textContent;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter((item) => item.name !== itemName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    displayCartItems();
}

displayCartItems();
