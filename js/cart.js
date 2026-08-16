document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyState = document.getElementById('cart-empty-state');
    if (!cartItemsContainer) return;

    const orderSummary = document.querySelector('.order-summary');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryDiscountPercent = document.getElementById('summary-discount-percent');
    const summaryDiscount = document.getElementById('summary-discount');
    const summaryDelivery = document.getElementById('summary-delivery');
    const summaryTotal = document.getElementById('summary-total');
    
    const promoInput = document.getElementById('promo-input');
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const promoMessage = document.getElementById('promo-message');
    const checkoutBtn = document.getElementById('checkout-btn');

    const DELIVERY_FEE = 15.00;
    let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
    let currentDiscountPercent = 0;
    let activeCouponCode = null;

    function renderCart() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.style.display = 'none';
            cartEmptyState.style.display = 'block';
            orderSummary.style.opacity = '0.5';
            checkoutBtn.disabled = true;
            checkoutBtn.style.cursor = 'not-allowed';
            
            summarySubtotal.textContent = '$0';
            summaryDiscount.textContent = '$0';
            summaryDelivery.textContent = '$0';
            summaryTotal.textContent = '$0';
            if(summaryDiscountPercent) summaryDiscountPercent.textContent = '';
            return;
        }

        cartItemsContainer.style.display = 'block';
        cartEmptyState.style.display = 'none';
        orderSummary.style.opacity = '1';
        checkoutBtn.disabled = false;
        checkoutBtn.style.cursor = 'pointer';

        cart.forEach((item, index) => {
            const divider = index > 0 ? `<hr class="cart__divider">` : '';
            
            cartItemsContainer.innerHTML += `
                ${divider}
                <article class="cart-item">
                    <div class="cart-item__image-container" style="background:#F0EAED; border-radius:10px; width:120px; height:120px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                        <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; mix-blend-mode:multiply;">
                    </div>
                    <div class="cart-item__info">
                        <div class="cart-item__header">
                            <h3 class="cart-item__title">${item.name}</h3>
                            <button class="cart-item__delete-btn" onclick="removeCartItem(${index})" style="background:none; border:none; cursor:pointer;">
                                <img src="images/Delete-Dustbin.svg" alt="Delete">
                            </button>
                        </div>
                        <p class="cart-item__meta" style="font-size:14px; margin:4px 0;">Size: <span style="color:rgba(0,0,0,0.6);">${item.size}</span></p>
                        <p class="cart-item__meta" style="font-size:14px; margin:4px 0;">Color: <span style="color:rgba(0,0,0,0.6);">${item.color}</span></p>
                        <div class="cart-item__footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
                            <span class="cart-item__price" style="font-size:24px; font-weight:700;">$${item.price}</span>
                            <div class="quantity quantity--small" style="display:flex; align-items:center; background:#F0F0F0; border-radius:62px; padding:8px 16px;">
                                <button onclick="updateCartItem(${index}, -1)" style="background:none; border:none; font-size:18px; cursor:pointer;">-</button>
                                <input type="number" value="${item.quantity}" readonly style="background:transparent; border:none; width:30px; text-align:center; font-weight:500;">
                                <button onclick="updateCartItem(${index}, 1)" style="background:none; border:none; font-size:18px; cursor:pointer;">+</button>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        });

        calculateTotals();
    }

    window.updateCartItem = (index, change) => {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
            saveAndRender();
        }
    };

    window.removeCartItem = (index) => {
        cart.splice(index, 1);
        saveAndRender();
    };

    function saveAndRender() {
        localStorage.setItem('shopCart', JSON.stringify(cart));
        renderCart();
        if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
    }

    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            const code = promoInput.value.trim().toUpperCase();

            if (code === 'SAVE10') {
                currentDiscountPercent = 0.10;
                activeCouponCode = code;
                promoMessage.innerHTML = '<span style="color:#008000; font-size:14px;">10% Discount Applied!</span>';
            } else if (code === 'SAVE20') {
                currentDiscountPercent = 0.20;
                activeCouponCode = code;
                promoMessage.innerHTML = '<span style="color:#008000; font-size:14px;">20% Discount Applied!</span>';
            } else {
                currentDiscountPercent = 0;
                activeCouponCode = null;
                promoMessage.innerHTML = '<span style="color:#FF3333; font-size:14px;">Invalid coupon code.</span>';
            }
            calculateTotals();
        });
    }

    function calculateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = subtotal * currentDiscountPercent;
        const total = subtotal - discountAmount + DELIVERY_FEE;

        summarySubtotal.textContent = `$${subtotal}`;
        summaryDelivery.textContent = `$${DELIVERY_FEE}`;
        
        if (discountAmount > 0) {
            summaryDiscount.textContent = `-$${Math.round(discountAmount)}`;
            if(summaryDiscountPercent) summaryDiscountPercent.textContent = `(-${currentDiscountPercent * 100}%)`;
            summaryDiscount.parentElement.style.display = 'flex';
        } else {
            summaryDiscount.textContent = `$0`;
            if(summaryDiscountPercent) summaryDiscountPercent.textContent = '';
        }

        summaryTotal.textContent = `$${Math.round(total)}`;
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:9999;';
            modal.innerHTML = `
                <div style="background:#fff; padding:40px; border-radius:20px; text-align:center; max-width:400px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.2);">
                    <div style="background:#008000; color:white; width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; margin:0 auto 24px;">✓</div>
                    <h2 style="font-size:32px; font-weight:900; margin-bottom:16px;">Order Successful!</h2>
                    <p style="color:rgba(0,0,0,0.6); margin-bottom:32px;">Your order has been placed successfully. Thank you!</p>
                    <button id="closeModalBtn" style="background:#000; color:#fff; width:100%; padding:16px; border-radius:62px; font-weight:500; font-size:16px; border:none; cursor:pointer;">OK</button>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('closeModalBtn').addEventListener('click', () => {
                cart = []; 
                localStorage.removeItem('shopCart'); 
                window.location.href = 'index.html'; 
            });
        });
    }

    renderCart();
});