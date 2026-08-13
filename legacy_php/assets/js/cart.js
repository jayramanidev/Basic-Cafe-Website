// assets/js/cart.js
// This script powers the Digital Menu: search, filter, cart handling, and WhatsApp checkout.
// It expects global variables `categories`, `menuItems`, and `businessPhone` to be defined before this file is loaded.

let cart = {};
let currentFilter = 'all';
let searchQuery = '';

const els = {
    categoryList: document.getElementById('category-list'),
    menuGrid: document.getElementById('menu-grid'),
    emptyState: document.getElementById('empty-state'),
    fabContainer: document.getElementById('fab-container'),
    cartModal: document.getElementById('cart-modal'),
    cartPanel: document.getElementById('cart-panel'),
    cartBackdrop: document.getElementById('cart-backdrop'),
    cartItems: document.getElementById('cart-items'),
    inputs: {
        desktop: document.getElementById('desktop-search'),
        mobile: document.getElementById('mobile-search')
    }
};

function init() {
    renderCategories();
    renderMenu();
    lucide.createIcons();
    els.inputs.desktop.addEventListener('input', e => handleSearch(e.target.value));
    els.inputs.mobile.addEventListener('input', e => handleSearch(e.target.value));
    // Mobile search toggle button (optional, you can bind it elsewhere)
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            const container = document.getElementById('mobile-search-container');
            container.classList.toggle('hidden');
            if (!container.classList.contains('hidden')) els.inputs.mobile.focus();
        });
    }
}

function getCategoryIcon(cat) {
    const id = (cat.id || '').toLowerCase();
    const name = (cat.name || '').toLowerCase();
    if (id === 'all' || name === 'all') return 'utensils-crossed';
    if (id.includes('chaat') || name.includes('chaat')) return 'flame';
    if (id.includes('momo') || name.includes('momo')) return 'sparkles';
    if (id.includes('pav') || id.includes('bhaji') || name.includes('pav')) return 'soup';
    if (id.includes('pizza') || name.includes('pizza')) return 'pizza';
    if (id.includes('roll') || name.includes('roll')) return 'sandwich';
    if (id.includes('drink') || id.includes('thanda') || name.includes('drink')) return 'cup-soda';
    return 'utensils';
}

function renderCategories() {
    els.categoryList.innerHTML = categories.map(cat => {
        const icon = getCategoryIcon(cat);
        const isActive = currentFilter === cat.id;
        return `
            <button onclick="setFilter('${cat.id}')"
                    class="px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-xs sm:text-sm flex items-center gap-2 flex-shrink-0 active:scale-95
                    ${isActive 
                        ? 'bg-brand-gold text-brand-dark font-bold shadow-glow scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'}">
                <i data-lucide="${icon}" class="w-4 h-4 ${isActive ? 'text-brand-dark' : 'text-brand-gold'}"></i>
                <span>${cat.name}</span>
            </button>
        `;
    }).join('');
    lucide.createIcons();
}

function renderMenu() {
    const filtered = menuItems.filter(item => {
        const matchesCat = currentFilter === 'all' || item.category === currentFilter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });
    if (filtered.length === 0) {
        els.menuGrid.innerHTML = '';
        els.emptyState.classList.remove('hidden');
        els.emptyState.classList.add('flex');
    } else {
        els.emptyState.classList.add('hidden');
        els.emptyState.classList.remove('flex');
        
        // Use timeout to allow DOM to update before applying animation classes if needed, or just let AOS handle it natively if we refresh AOS. 
        // We will just add data-aos dynamically, though AOS might need a refresh. We'll use CSS animations for dynamic content.
        els.menuGrid.innerHTML = filtered.map((item, index) => `
            <div class="bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 group relative animate-slideup" style="animation-delay: ${index * 50}ms;">
                <!-- Veg Mark -->
                <div class="absolute top-6 left-6 z-20 bg-white/90 p-1.5 rounded-md shadow-sm backdrop-blur-sm border border-gray-100">
                    <div class="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-sm">
                        <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                </div>
                
                <div class="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-gray-100 skeleton">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" onload="this.parentElement.classList.remove('skeleton')" />
                    ${item.popular ? '<span class="absolute top-4 right-4 bg-brand-gold text-brand-dark text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md tracking-widest uppercase">Bestseller</span>' : ''}
                    
                    <!-- Add Button Overlay (Desktop) -->
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent p-4 pt-12 flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <button onclick="addToCart(${item.id})" class="bg-brand-gold text-brand-dark p-3 rounded-full shadow-glow hover:scale-110 hover:bg-white active:scale-95 transition-all">
                            <i data-lucide="plus" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
                
                <div class="flex-1 flex flex-col px-2">
                    <h3 class="font-display font-bold text-gray-800 text-lg leading-snug mb-2 group-hover:text-brand-green transition-colors">${item.name}</h3>
                    <p class="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">${item.desc}</p>
                    <div class="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                        <span class="font-bold text-xl text-brand-dark tracking-tight">₹${item.price}</span>
                        <button onclick="addToCart(${item.id})" class="md:hidden text-sm font-bold bg-brand-dark text-brand-gold px-4 py-2 rounded-full shadow-md active:scale-95 transition-transform">ADD</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    lucide.createIcons();
}

function setFilter(catId) {
    currentFilter = catId;
    renderCategories();
    renderMenu();
}

function handleSearch(val) {
    searchQuery = val;
    renderMenu();
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateCartUI();
    showToast();
    if (navigator.vibrate) navigator.vibrate(40);
}

function removeFromCart(id) {
    if (cart[id]) {
        delete cart[id];
        updateCartUI();
    }
}

function changeQty(id, delta) {
    if ((cart[id] + delta) <= 0) {
        removeFromCart(id);
        return;
    }
    cart[id] += delta;
    updateCartUI();
}

function updateCartUI() {
    const items = Object.keys(cart);
    const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);

    // FAB visibility
    if (els.fabContainer) {
        if (totalQty > 0) els.fabContainer.classList.remove('translate-y-32');
        else els.fabContainer.classList.add('translate-y-32');
    }

    // Badge updates
    const badge = document.getElementById('cart-badge');
    const fabCount = document.getElementById('fab-count');
    if(badge) badge.innerText = totalQty;
    if(fabCount) fabCount.innerText = totalQty;

    let subtotal = 0;
    els.cartItems.innerHTML = items.map(id => {
        const item = menuItems.find(i => i.id == id);
        const qty = cart[id];
        subtotal += item.price * qty;
        return `
            <div class="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 animate-[slideup_0.3s_ease-out_forwards]">
                <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 skeleton">
                    <img src="${item.image}" class="w-full h-full object-cover" onload="this.parentElement.classList.remove('skeleton')" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <div class="w-3 h-3 border border-green-600 flex items-center justify-center rounded-sm flex-shrink-0">
                            <div class="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        </div>
                        <p class="text-base font-bold truncate text-brand-dark font-display">${item.name}</p>
                    </div>
                    <p class="text-brand-green font-bold text-sm mb-2">₹${item.price * qty}</p>
                    
                    <div class="inline-flex bg-gray-50 rounded-full items-center p-1 border border-gray-200">
                        <button onclick="changeQty(${id}, -1)" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all">-</button>
                        <span class="font-bold text-sm w-8 text-center text-brand-dark">${qty}</span>
                        <button onclick="changeQty(${id}, 1)" class="w-8 h-8 rounded-full flex items-center justify-center text-brand-green hover:bg-white hover:shadow-sm transition-all">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (items.length === 0) {
        els.cartItems.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-gray-400 opacity-70">
                <i data-lucide="shopping-cart" class="w-16 h-16 mb-4 stroke-1 text-gray-300"></i>
                <p class="font-medium text-lg">Your cart is empty</p>
                <p class="text-sm">Looks like you haven't added anything yet.</p>
            </div>
        `;
    }

    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    const fabTotal = document.getElementById('fab-total');
    if(fabTotal) fabTotal.innerText = `₹${total.toFixed(0)}`;
    
    document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(0)}`;
    document.getElementById('cart-tax').innerText = `₹${tax.toFixed(0)}`;
    document.getElementById('cart-final-total').innerText = `₹${total.toFixed(0)}`;
    lucide.createIcons();
}

function checkoutWhatsApp() {
    if (Object.keys(cart).length === 0) return;
    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    let msg = `*Namaste!* %0AI want to place a order:%0A%0A`;
    let total = 0;
    Object.keys(cart).forEach(id => {
        const item = menuItems.find(i => i.id == id);
        const qty = cart[id];
        const rowTotal = item.price * qty;
        total += rowTotal;
        msg += ` ${qty} x ${item.name} - ₹${rowTotal}%0A`;
    });
    const tax = total * 0.05;
    const final = total + tax;
    msg += `%0A---------------------------%0A*Subtotal:* ₹${total}%0A*GST (5%):* ₹${tax.toFixed(0)}%0A*Total to Pay:* ₹${final.toFixed(0)}%0A---------------------------%0A*Order Time:* ${dateTime}%0A%0APlease confirm time?`;
    window.open(`https://wa.me/${businessPhone}?text=${msg}`, '_blank');
}

function openCart() {
    els.cartModal.classList.remove('hidden');
    setTimeout(() => {
        els.cartBackdrop.classList.remove('opacity-0');
        els.cartPanel.classList.remove('translate-y-full', 'md:translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    els.cartBackdrop.classList.add('opacity-0');
    els.cartPanel.classList.add('translate-y-full', 'md:translate-x-full');
    setTimeout(() => els.cartModal.classList.add('hidden'), 300);
    document.body.style.overflow = 'auto';
}

function showToast() {
    const t = document.getElementById('toast');
    t.classList.remove('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => t.classList.add('opacity-0', 'translate-y-[-20px]'), 2000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
