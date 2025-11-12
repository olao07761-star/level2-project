// Simple product quick view and cart logic (client-side demo)
(function () {
    const cart = { items: [], total: 0 };

    const updateCartUI = () => {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        cartCount.textContent = cart.items.length;
        if (cart.items.length === 0) {
            cartItems.innerHTML = 'Your cart is empty.';
            cartTotal.textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = '';
        cart.items.forEach((it, idx) => {
            const div = document.createElement('div');
            div.className = 'd-flex justify-content-between align-items-center mb-2';
            div.innerHTML = `<div><strong>${it.name}</strong><div class="small text-muted">${it.qty} × $${it.price}</div></div>
                                     <div>$${(it.qty * it.price).toFixed(2)}</div>`;
            cartItems.appendChild(div);
        });
        cartTotal.textContent = '$' + cart.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
    };

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            const found = cart.items.find(i => i.name === name);
            if (found) found.qty += 1; else cart.items.push({ name, price, qty: 1 });
            // small visual feedback
            btn.classList.add('btn-success');
            setTimeout(() => btn.classList.remove('btn-success'), 350);
            updateCartUI();
        });
    });

    // Quick view buttons
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    let currentModalProduct = null;

    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const img = btn.dataset.img;
            const desc = btn.dataset.desc;
            const price = btn.dataset.price;
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalImg').src = img;
            document.getElementById('modalDesc').textContent = desc;
            document.getElementById('modalPrice').textContent = price;
            currentModalProduct = { name, price: parseFloat(price.replace(/[^0-9.]/g, '')) };
            productModal.show();
        });
    });

    document.getElementById('modalAdd').addEventListener('click', () => {
        if (!currentModalProduct) return;
        const found = cart.items.find(i => i.name === currentModalProduct.name);
        if (found) found.qty += 1; else cart.items.push({ name: currentModalProduct.name, price: currentModalProduct.price, qty: 1 });
        updateCartUI();
        productModal.hide();
    });

    updateCartUI();
})();