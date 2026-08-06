// ========================================
//  اطلاعات محصولات
// ========================================
const products = [
    {
        id: 1,
        name: 'پنل خورشیدی ۴۰۰ وات',
        emoji: '🟦',
        price: 249.99,
        desc: 'پنل مونوکریستال راندمان بالا با گارانتی ۲۵ ساله'
    },
    {
        id: 2,
        name: 'اینورتر هیبریدی ۵ کیلووات',
        emoji: '⚡',
        price: 599.00,
        desc: 'قابل اتصال به شبکه و باتری، مناسب منازل و مغازه‌ها'
    },
    {
        id: 3,
        name: 'باتری لیتیومی ۱۰ کیلووات‌ساعت',
        emoji: '🔋',
        price: 1899.00,
        desc: 'باتری لیتیوم آهن فسفات با عمر چرخه بالا'
    },
    {
        id: 4,
        name: 'کیت کانکتور MC4',
        emoji: '🔌',
        price: 29.95,
        desc: 'مجموعه کانکتورهای ضدآب به همراه ابزار نصب'
    },
    {
        id: 5,
        name: 'میکرو اینورتر ۶۰۰ وات',
        emoji: '🔹',
        price: 189.00,
        desc: 'مناسب برای پنل‌های کوچک و سیستم‌های خانگی'
    },
    {
        id: 6,
        name: 'استراکچر نصب پشت‌بامی',
        emoji: '🏗️',
        price: 149.50,
        desc: 'کیت کامل پایه‌های فلزی برای نصب روی شیروانی'
    }
];

// ========================================
//  وضعیت سبد خرید
// ========================================
let cart = JSON.parse(localStorage.getItem('solarCart')) || [];

// ========================================
//  ارجاع به المان‌های DOM
// ========================================
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

// ========================================
//  نمایش محصولات
// ========================================
function renderProducts() {
    productGrid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="emoji">${p.emoji}</div>
            <h3>${p.name}</h3>
            <div class="price">$${p.price.toFixed(2)}</div>
            <div class="desc">${p.desc}</div>
            <button class="add-btn" data-id="${p.id}">افزودن به سبد خرید</button>
        </div>
    `).join('');

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            addToCart(id);
        });
    });
}

// ========================================
//  عملیات سبد خرید
// ========================================
function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, qty: 1 });
    }
    saveAndRender();

    // بازخورد به کاربر
    const btn = document.querySelector(`[data-id="${productId}"]`);
    if (btn) {
        btn.textContent = '✅ اضافه شد!';
        setTimeout(() => { btn.textContent = 'افزودن به سبد خرید'; }, 800);
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveAndRender();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeItem(productId);
        return;
    }
    saveAndRender();
}

function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getTotalPrice() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ========================================
//  نمایش سبد خرید
// ========================================
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">🛒 سبد خرید خالی است.</p>`;
        cartTotal.textContent = '$۰.۰۰';
        cartCount.textContent = '۰';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} هر عدد</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQty(${item.id}, -1)">−</button>
                <span class="qty">${item.qty}</span>
                <button onclick="updateQty(${item.id}, 1)">+</button>
                <button class="cart-item-remove" onclick="removeItem(${item.id})">✕</button>
            </div>
        </div>
    `).join('');

    cartTotal.textContent = `$${getTotalPrice().toFixed(2)}`;
    cartCount.textContent = getTotalItems();
}

// ========================================
//  ذخیره و هم‌گام‌سازی
// ========================================
function saveAndRender() {
    localStorage.setItem('solarCart', JSON.stringify(cart));
    renderCart();
}

// ========================================
//  باز و بسته کردن سبد خرید
// ========================================
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// بستن با کلید Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// ========================================
//  اجرای اولیه
// ========================================
renderProducts();
renderCart();