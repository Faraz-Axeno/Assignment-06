document.addEventListener('DOMContentLoaded', () => {
    
    const topBanner = document.querySelector('.top-banner');
    const closeBtn = document.querySelector('.top-banner__close');
    
    if (closeBtn && topBanner) {
        closeBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
        });
    }

    const navbar = document.querySelector('.header__navbar');
    const logo = document.querySelector('.header__logo');
    const navMenu = document.querySelector('.header__nav');

    if (navbar && logo && navMenu) {
        let hamburgerBtn = document.getElementById('hamburger-btn');
        if (!hamburgerBtn) {
            hamburgerBtn = document.createElement('button');
            hamburgerBtn.id = 'hamburger-btn';
            hamburgerBtn.className = 'header__hamburger';
            hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
            hamburgerBtn.innerHTML = `<img src="images/Hamurger.svg" alt="Menu">`;
            navbar.insertBefore(hamburgerBtn, logo);
        }

        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('is-active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                navMenu.classList.remove('is-active');
            }
        });
    }

    function updateCartBadge() {
        const cartLink = document.querySelector('.header__action-btn[href="cart.html"]');
        if (!cartLink) return;

        const cart = JSON.parse(localStorage.getItem('shopCart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        const existingBadge = document.getElementById('cart-counter-badge');
        if (existingBadge) existingBadge.remove();

        if (totalItems > 0) {
            cartLink.style.position = 'relative';
            const badge = document.createElement('span');
            badge.id = 'cart-counter-badge';
            badge.textContent = totalItems;
            badge.style.cssText = 'position:absolute; top:-5px; right:-10px; background-color:black; color:white; border-radius:50%; width:18px; height:18px; display:flex; justify-content:center; align-items:center; font-size:10px; font-weight:700;';
            cartLink.appendChild(badge);
        }
    }
    
    updateCartBadge();
    window.updateCartBadge = updateCartBadge; 

    const newArrivalsGrid = document.getElementById('new-arrivals-grid');
    const topSellingGrid = document.getElementById('top-selling-grid');

    if (newArrivalsGrid && typeof products !== 'undefined') {
        const newArrivals = products.filter(p => p.category === "New Arrivals");
        newArrivalsGrid.innerHTML = newArrivals.map(createProductCard).join('');
    }

    if (topSellingGrid && typeof products !== 'undefined') {
        const topSelling = products.filter(p => p.category === "Top Selling");
        topSellingGrid.innerHTML = topSelling.map(createProductCard).join('');
    }
});