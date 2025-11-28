document.addEventListener('DOMContentLoaded', function() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.getElementById('close-modal');
    const cashPayment = document.getElementById('cash-payment');
    const cardPayment = document.getElementById('card-payment');

    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProducts(button.dataset.category);
        });
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        checkoutModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    cashPayment.addEventListener('click', () => {
        const total = cart.calculateTotal();
        const cashAmount = prompt(`Total: $${total.toFixed(2)}\nEnter cash amount:`);
        if (cashAmount && !isNaN(cashAmount)) {
            const change = parseFloat(cashAmount) - total;
            if (change >= 0) {
                alert(`Payment successful!\nChange: $${change.toFixed(2)}`);
                completeSale();
            } else {
                alert('Insufficient cash amount!');
            }
        }
    });

    cardPayment.addEventListener('click', () => {
        alert('Processing card payment...\nPayment successful!');
        completeSale();
    });

    function completeSale() {
        cart.clearCart();
        checkoutModal.style.display = 'none';
        cartSidebar.classList.remove('open');
        alert('Sale completed successfully!');
    }
});