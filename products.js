const products = [
    {id: 1, name: "Burger", price: 8.99, category: "food", image: "🍔"},
    {id: 2, name: "Pizza", price: 12.99, category: "food", image: "🍕"},
    {id: 3, name: "Fries", price: 3.99, category: "food", image: "🍟"},
    {id: 4, name: "Coffee", price: 2.99, category: "drinks", image: "☕"},
    {id: 5, name: "Soda", price: 1.99, category: "drinks", image: "🥤"},
    {id: 6, name: "Cookie", price: 0.99, category: "snacks", image: "🍪"}
];

function displayProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

displayProducts();