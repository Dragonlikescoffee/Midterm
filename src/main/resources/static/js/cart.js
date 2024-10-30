// cart.js
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(gameId) {
  const game = games.find(g => g.id === gameId);
  const cartItem = cart.find(item => item.id === gameId);

  if (cartItem) {
    // If the item already exists in the cart, increase its quantity
    cartItem.quantity += 1;
  } else {
    // If it's a new item, add it to the cart with quantity 1
    cart.push({ ...game, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${game.title} added to cart!`);
  updateCartDisplay();
}

// Remove item from cart
function removeFromCart(gameId) {
  const itemIndex = cart.findIndex(item => item.id === gameId);
  
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
}

// Update item quantity
function updateItemQuantity(gameId, newQuantity) {
  const cartItem = cart.find(item => item.id === gameId);
  
  if (cartItem) {
    cartItem.quantity = newQuantity;
    if (newQuantity <= 0) {
      removeFromCart(gameId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  updateCartDisplay();
}

// Display cart items
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    cartItems.innerHTML += `
      <div class="cart-item">
        <h3>${item.title}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: 
          <input type="number" value="${item.quantity}" min="1" 
                 onchange="updateItemQuantity(${item.id}, this.value)">
        </p>
        <p>Total: $${itemTotal.toFixed(2)}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

function updateCartDisplay() {
  displayCart();
}

// Call displayCart on page load to load items if present
document.addEventListener('DOMContentLoaded', displayCart);

// cart.js
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  
  alert("Thank you for your purchase!");
  localStorage.removeItem('cart');
  cart.length = 0;
  updateCartDisplay();
}
