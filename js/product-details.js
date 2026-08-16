document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof products === 'undefined') {
        console.error("CRITICAL: products.js is not loaded. Please check your script tags in product.html.");
        alert("Database missing! Please add products.js to your HTML.");
        return;
    }

    const titleEl = document.getElementById('product-title');
    if (!titleEl) return; 

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.querySelector('.product__container').innerHTML = `
            <div style="text-align: center; padding: 100px 20px; width: 100%;">
                <h2 style="font-size: 32px; margin-bottom: 20px; font-weight: 900;">Product Not Found</h2>
                <p style="color: rgba(0,0,0,0.6); margin-bottom: 30px;">Sorry, this item doesn't exist or has been removed.</p>
                <a href="index.html" class="product__add-to-cart" style="display:inline-block; width:200px; text-decoration:none; text-align:center; padding: 16px; border-radius: 62px; background: black; color: white; font-weight: 500;">Return to Shop</a>
            </div>
        `;
        return;
    }

    document.getElementById('breadcrumb-title').textContent = product.name;
    titleEl.textContent = product.name;
    
    const mainImg = document.getElementById('main-product-image');
    if(mainImg) {
        mainImg.src = product.image;
        mainImg.alt = product.name;
    }
    
    const thumb1 = document.getElementById('thumbnail-1');
    const thumb2 = document.getElementById('thumbnail-2');
    const thumb3 = document.getElementById('thumbnail-3');
    if(thumb1) thumb1.src = product.image;
    if(thumb2) thumb2.src = product.image; 
    if(thumb3) thumb3.src = product.image; 
    
    document.getElementById('product-rating').textContent = `${product.rating.toFixed(1)}/5`;
    
    document.getElementById('product-current-price').textContent = `$${product.price}`;
    const oldPriceEl = document.getElementById('product-old-price');
    const discountEl = document.getElementById('product-discount');
    
    if (product.originalPrice) {
        oldPriceEl.textContent = `$${product.originalPrice}`;
        oldPriceEl.style.display = 'inline-block';
        oldPriceEl.style.textDecoration = 'line-through';
        oldPriceEl.style.color = 'rgba(0,0,0,0.3)';
        
        const badgeText = product.discountBadge || `-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`;
        discountEl.textContent = badgeText;
        discountEl.style.display = 'inline-block';
        discountEl.style.background = '#FF33331A';
        discountEl.style.color = '#FF3333';
        discountEl.style.padding = '6px 14px';
        discountEl.style.borderRadius = '62px';
        discountEl.style.fontSize = '14px';
        discountEl.style.fontWeight = '500';
    } else {
        oldPriceEl.style.display = 'none';
        discountEl.style.display = 'none';
    }

    document.getElementById('product-description').textContent = product.description;

    let selectedColor = 'Olive Green'; 
    let selectedSize = 'Large'; 

    const colorBtns = document.querySelectorAll('.product__color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            colorBtns.forEach(b => b.classList.remove('product__color-btn--active'));
            e.target.classList.add('product__color-btn--active');
            selectedColor = e.target.getAttribute('aria-label');
        });
    });

    const sizeBtns = document.querySelectorAll('.product__size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            sizeBtns.forEach(b => b.classList.remove('product__size-btn--active'));
            e.target.classList.add('product__size-btn--active');
            selectedSize = e.target.textContent.trim();
        });
    });

    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const qtyInput = document.getElementById('product-qty');

    decreaseBtn.addEventListener('click', () => {
        let currentVal = parseInt(qtyInput.value);
        if (currentVal > 1) {
            qtyInput.value = currentVal - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        let currentVal = parseInt(qtyInput.value);
        qtyInput.value = currentVal + 1;
    });

    qtyInput.addEventListener('change', () => {
        if (parseInt(qtyInput.value) < 1 || isNaN(qtyInput.value)) {
            qtyInput.value = 1;
        }
    });

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(qtyInput.value);
        let cart = JSON.parse(localStorage.getItem('shopCart')) || [];
        
        const existingItemIndex = cart.findIndex(item => 
            item.id === product.id && 
            item.size === selectedSize && 
            item.color === selectedColor
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                size: selectedSize,
                color: selectedColor
            });
        }

        localStorage.setItem('shopCart', JSON.stringify(cart));
        
        if(typeof window.updateCartBadge === 'function') {
            window.updateCartBadge();
        }
        
        alert(`Successfully added ${quantity}x ${product.name} to your cart!`);
    });
});