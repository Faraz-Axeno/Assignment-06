const products = [
    {
        id: 1,
        name: "T-shirt with Tape Details",
        price: 120,
        originalPrice: null,
        discountBadge: null,
        rating: 4.5,
        image: "images/product-1.png",
        description: "Browse through our diverse range of meticulously crafted garments.",
        category: "New Arrivals"
    },
    {
        id: 2,
        name: "Skinny Fit Jeans",
        price: 240,
        originalPrice: 260,
        discountBadge: "-20%",
        rating: 3.5,
        image: "images/product-2.png",
        description: "Comfortable skinny fit jeans perfect for everyday casual wear.",
        category: "New Arrivals"
    },
    {
        id: 3,
        name: "Checkered Shirt",
        price: 180,
        originalPrice: null,
        discountBadge: null,
        rating: 4.5,
        image: "images/product-3.png",
        description: "A classic red and blue checkered shirt.",
        category: "New Arrivals"
    },
    {
        id: 4,
        name: "Sleeve Striped T-shirt",
        price: 130,
        originalPrice: 160,
        discountBadge: "-30%",
        rating: 4.5,
        image: "images/product-4.png",
        description: "Orange t-shirt with bold black stripes on the sleeves.",
        category: "New Arrivals"
    },

    {
        id: 5,
        name: "Vertical Striped Shirt",
        price: 212,
        originalPrice: 232,
        discountBadge: "-20%",
        rating: 5.0,
        image: "images/product-5.png", 
        description: "A classic green vertical striped shirt for formal or semi-formal occasions.",
        category: "Top Selling"
    },
    {
        id: 6,
        name: "Courage Graphic T-shirt",
        price: 145,
        originalPrice: null,
        discountBadge: null,
        rating: 4.0,
        image: "images/product-6.png",
        description: "Express yourself with this bold courage graphic t-shirt.",
        category: "Top Selling"
    },
    {
        id: 7,
        name: "Loose Fit Bermuda Shorts",
        price: 80,
        originalPrice: null,
        discountBadge: null,
        rating: 3.0,
        image: "images/product-7.png",
        description: "Comfortable loose fit denim bermuda shorts for summer.",
        category: "Top Selling"
    },
    {
        id: 8,
        name: "Faded Skinny Jeans",
        price: 210,
        originalPrice: null,
        discountBadge: null,
        rating: 4.5,
        image: "images/product-8.png",
        description: "Dark faded skinny jeans with a sleek, modern look.",
        category: "Top Selling"
    }
];

function createProductCard(product) {
    const hasDiscount = product.originalPrice ? true : false;

    const badgeText = product.discountBadge 
        ? product.discountBadge 
        : (hasDiscount ? `-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%` : '');

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
            starsHtml += '★';
        } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
            starsHtml += '★';
        } else {
            starsHtml += '☆';
        }
    }

    return `
        <article class="product-card" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
            <div class="product-card__image-container" style="background:#F0EEED; border-radius:20px; padding:20px; margin-bottom:16px; aspect-ratio: 1/1; display:flex; justify-content:center; align-items:center; overflow:hidden;">
                <img class="product-card__image" src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;">
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title" style="margin: 0 0 8px 0; font-size:20px; font-weight:700; color:#000;">${product.name}</h3>
                
                <div class="product-card__rating" style="display:flex; align-items:center; gap:8px; margin-bottom: 8px;">
                    <span style="color:#FFC633; font-size:18px; letter-spacing: 2px;">${starsHtml}</span>
                    <span style="font-size:14px; color:rgba(0,0,0,0.6);">${product.rating.toFixed(1)}/5</span>
                </div>

                <div class="product-card__price-row" style="display:flex; align-items:center; gap:12px;">
                    <span class="product-card__price" style="font-size:24px; font-weight:700; color:#000;">$${product.price}</span>
                    ${hasDiscount ? `
                        <span class="product-card__original-price" style="font-size:24px; font-weight:700; color:rgba(0,0,0,0.3); text-decoration:line-through;">$${product.originalPrice}</span>
                        <span class="product-card__discount" style="background:#FF33331A; color:#FF3333; padding:4px 12px; border-radius:62px; font-size:12px; font-weight:500;">${badgeText}</span>
                    ` : ''}
                </div>
            </div>
        </article>
    `;
}