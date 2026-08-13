tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'display': ['Fredoka One', 'cursive'],
                'body': ['Poppins', 'sans-serif'],
            },
            colors: {
                brand: {
                    red: '#e11d48', // Accent Red
                    orange: '#f97316', // Saffron
                    yellow: '#fbbf24',
                    green: '#16a34a', // Veg Green
                    dark: '#1f2937',
                    light: '#fff7ed' // Warm background
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        }
    }
}
// --- Configuration & Data ---
const businessPhone = "919664804600";

// Data injected from PHP


// --- State ---
let cart = {};
let currentFilter = 'all';
let searchQuery = '';

// --- Elements ---
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

// --- Initialization ---
function init() {
    // renderCategories();
    // renderMenu();
    lucide.createIcons();

    els.inputs.desktop.addEventListener('input', (e) => handleSearch(e.target.value));
    els.inputs.mobile.addEventListener('input', (e) => handleSearch(e.target.value));
}

// --- Render Functions ---
function renderCategories() {
    els.categoryList.innerHTML = categories.map(cat => `
                <button onclick="setFilter('${cat.id}')" 
                        class="px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 font-medium text-sm flex-shrink-0
                        ${currentFilter === cat.id
            ? 'bg-brand-green text-white shadow-lg shadow-green-500/20 scale-105'
            : 'bg-white text-gray-600 border border-gray-100 hover:border-brand-orange hover:text-brand-orange shadow-sm'}">
                    ${cat.name}
                </button>
            `).join('');
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

        els.menuGrid.innerHTML = filtered.map(item => `
                    <div class="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group relative">
                        <!-- Veg Mark -->
                        <div class="absolute top-4 left-4 z-20 bg-white/90 p-0.5 rounded shadow-sm">
                            <div class="veg-mark">
                                <div class="veg-dot"></div>
                            </div>
                        </div>

                        <div class="relative overflow-hidden rounded-xl mb-3 aspect-[4/3] bg-gray-100">
                            <img src="${item.image}" alt="${item.name}" loading="lazy" 
                                 class="food-card-img w-full h-full object-cover">
                            
                            ${item.popular ? '<span class="absolute top-2 right-2 bg-brand-yellow text-brand-dark text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide">BESTSELLER</span>' : ''}
                            
                            <!-- Add Button Overlay -->
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8 flex justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button onclick="addToCart(${item.id})" class="bg-white text-brand-green p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform">
                                    <i data-lucide="plus" class="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="flex-1 flex flex-col">
                            <h3 class="font-bold text-gray-800 text-base leading-snug mb-1">${item.name}</h3>
                            <p class="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">${item.desc}</p>
                            
                            <div class="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
                                <span class="font-display text-lg text-brand-dark">₹${item.price}</span>
                                <button onclick="addToCart(${item.id})" class="sm:hidden text-xs font-bold bg-green-50 text-brand-green px-3 py-1.5 rounded-lg border border-green-200">
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');

        lucide.createIcons();
    }
}

// --- Logic ---
function setFilter(catId) {
    currentFilter = catId;
    renderCategories();
    renderMenu();
}

function handleSearch(val) {
    searchQuery = val;
    renderMenu();
}

function toggleSearch() {
    const container = document.getElementById('mobile-search-container');
    container.classList.toggle('hidden');
    if (!container.classList.contains('hidden')) els.inputs.mobile.focus();
}

function scrollToMenu() {
    document.getElementById('menu-section').scrollIntoView({ behavior: 'smooth' });
}

// --- Cart Functions ---
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

    // Fab Logic
    if (totalQty > 0) els.fabContainer.classList.remove('translate-y-32');
    else els.fabContainer.classList.add('translate-y-32');

    // Badge
    document.getElementById('cart-badge').innerText = totalQty;
    document.getElementById('cart-badge').classList.remove('scale-0');
    document.getElementById('fab-count').innerText = totalQty;

    let subtotal = 0;

    els.cartItems.innerHTML = items.map(id => {
        const item = menuItems.find(i => i.id == id);
        const qty = cart[id];
        subtotal += item.price * qty;

        return `
                    <div class="flex gap-3 items-center bg-gray-800/40 p-2 rounded-xl animate-slide-up border border-gray-700/50">
                        <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src="${item.image}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-1 mb-0.5">
                                <div class="veg-mark !w-3 !h-3 !p-[1px] !border-[1px]">
                                    <div class="veg-dot !w-1.5 !h-1.5"></div>
                                </div>
                                <p class="text-sm font-bold truncate text-gray-200">${item.name}</p>
                            </div>
                            <p class="text-brand-yellow font-mono text-sm">₹${item.price * qty}</p>
                        </div>
                        <div class="bg-gray-700 rounded-lg flex items-center p-1 gap-3 border border-gray-600">
                            <button onclick="changeQty(${id}, -1)" class="text-gray-400 hover:text-white px-1">-</button>
                            <span class="font-bold text-sm w-4 text-center">${qty}</span>
                            <button onclick="changeQty(${id}, 1)" class="text-green-400 hover:text-white px-1">+</button>
                        </div>
                    </div>
                `;
    }).join('');

    if (items.length === 0) {
        els.cartItems.innerHTML = `
                    <div class="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                        <i data-lucide="shopping-bag" class="w-12 h-12 mb-2"></i>
                        <p>Cart is empty</p>
                    </div>
                 `;
    }

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById('fab-total').innerText = `₹${total.toFixed(0)}`;
    document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(0)}`;
    document.getElementById('cart-tax').innerText = `₹${tax.toFixed(0)}`;
    document.getElementById('cart-final-total').innerText = `₹${total.toFixed(0)}`;

    lucide.createIcons();
}

function checkoutWhatsApp() {
    if (Object.keys(cart).length === 0) return;

    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
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

    msg += `%0A---------------------------%0A*Subtotal:* ₹${total}%0A*GST (5%):* ₹${tax.toFixed(0)}%0A*Total to Pay: ₹${final.toFixed(0)}*%0A---------------------------%0A*Order Time:* ${dateTime}%0A%0APlease confirm time?`;

    window.open(`https://wa.me/${businessPhone}?text=${msg}`, '_blank');
}

// --- UI Interactions ---
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

window.addEventListener('DOMContentLoaded', init);