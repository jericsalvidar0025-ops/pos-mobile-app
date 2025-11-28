class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('posCart')) || [];
        this.total = 0;
        this.updateCartDisplay();
    }

    addItem(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToLocalStorage();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartDisplay();
    }

    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveToLocalStorage();
                this.updateCartDisplay();
            }
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return this.total;
    }

    clearCart() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartDisplay();
    }

    saveToLocalStorage() {
        localStorage.setItem('posCart', JSON.stringify(this.items));
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const totalAmount = document.getElementById('total-amount');
        const modalTotal = document.getElementById('modal-total');

        cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, 1)">+</button>
                        <button onclick="cart.removeItem(${item.id})" style="background:#ff4444; color:white; border:none; padding:0.25rem 0.5rem; border-radius:5px; cursor:pointer; margin-left:0.5rem;">Remove</button>
                    </div>
                </div>
            `).join('');
        }

        const total = this.calculateTotal();
        totalAmount.textContent = total.toFixed(2);
        if (modalTotal) {
            modalTotal.textContent = total.toFixed(2);
        }
    }
}

const cart = new Cart();

function addToCart(productId) {
    cart.addItem(productId);
    alert('Product added to cart!');
}