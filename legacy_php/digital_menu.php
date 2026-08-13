<?php
require_once 'inc/header.php';
require_once 'inc/menu_data.php';
?>
<!-- Sticky Luxury Category Filter Bar -->
<div class="sticky top-20 z-40 px-4 py-2 pointer-events-none mb-6" data-aos="fade-down">
    <div class="max-w-7xl mx-auto glass-dark p-1.5 rounded-full shadow-2xl pointer-events-auto border border-white/10 backdrop-blur-xl">
        <div id="category-list" class="flex space-x-2 overflow-x-auto no-scrollbar py-0.5 px-2 flex-1 items-center"></div>
    </div>
</div>

<!-- Search and Menu Section -->
<section class="max-w-7xl mx-auto px-4 py-8" id="menu-section">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8" data-aos="fade-up">
        <h1 class="text-3xl font-display font-bold text-brand-dark hidden md:block">Our Menu</h1>
        
        <div class="relative w-full md:max-w-md floating-input">
            <input type="text" id="desktop-search" placeholder=" " class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all" />
            <label class="floating-label !left-12">Search dishes...</label>
            <i data-lucide="search" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
        </div>
        
        <!-- Mobile Search Container (hidden since we use one input now for both) -->
        <input type="hidden" id="mobile-search" /> 
    </div>

    <!-- Menu Grid -->
    <div id="menu-grid" class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
    
    <!-- Empty State -->
    <div id="empty-state" class="hidden flex-col justify-center items-center py-20 text-gray-400">
        <i data-lucide="search-X" class="w-16 h-16 mb-4 text-gray-300"></i>
        <p class="text-xl font-medium">No dishes found.</p>
        <p class="text-sm mt-2">Try adjusting your search or category filter.</p>
    </div>
</section>

<!-- Toast Notification -->
<div id="toast" class="fixed top-20 left-1/2 -translate-x-1/2 bg-brand-dark text-brand-gold px-6 py-3 rounded-full shadow-2xl opacity-0 transition-opacity duration-300 z-50 flex items-center gap-2 font-medium">
    <i data-lucide="check-circle" class="w-5 h-5"></i> Added to cart!
</div>

<!-- Hidden badge element required by cart.js (kept hidden) -->
<span id="cart-badge" class="hidden"></span>

<!-- Floating Action Button (Desktop only as mobile has bottom app bar) -->
<div id="fab-container" class="hidden md:block fixed right-8 bottom-8 transform transition-all duration-500 translate-y-32 z-40">
    <button class="flex items-center gap-3 bg-brand-dark text-brand-gold px-6 py-4 rounded-full shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all group border border-brand-gold/20" onclick="openCart()">
        <div class="relative">
            <i data-lucide="shopping-bag" class="w-6 h-6 group-hover:animate-bounce"></i>
            <span id="fab-count" class="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">0</span>
        </div>
        <span class="font-bold border-l border-brand-gold/30 pl-3">View Cart</span>
        <span id="fab-total" class="font-medium text-white ml-1">₹0</span>
    </button>
</div>

<!-- Premium Cart Drawer/Modal -->
<div id="cart-modal" class="hidden fixed inset-0 z-[60] flex justify-end">
    <div id="cart-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300" onclick="closeCart()"></div>
    <div id="cart-panel" class="relative bg-white w-full md:w-[400px] h-[calc(100vh-4rem)] md:h-full mt-auto md:mt-0 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-2xl transform translate-y-full md:translate-y-0 md:translate-x-full transition-transform duration-300 flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 class="text-2xl font-display font-bold text-brand-dark">Your Order</h2>
            <button onclick="closeCart()" class="text-gray-400 hover:text-brand-dark transition-colors bg-gray-50 p-2 rounded-full hover:bg-gray-100 active:scale-95"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar" id="cart-items">
            <!-- Items injected via JS -->
        </div>
        
        <div class="p-6 bg-gray-50 border-t border-gray-100 rounded-b-3xl md:rounded-bl-3xl md:rounded-br-none">
            <div class="space-y-3 mb-6 text-sm">
                <div class="flex justify-between text-gray-500 font-medium"><span>Subtotal</span><span id="cart-subtotal">₹0</span></div>
                <div class="flex justify-between text-gray-500 font-medium"><span>Taxes & Fees (5%)</span><span id="cart-tax">₹0</span></div>
                <div class="flex justify-between text-lg font-bold text-brand-dark pt-3 border-t border-gray-200"><span>Total to Pay</span><span id="cart-final-total">₹0</span></div>
            </div>
            <button class="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-dark shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group" onclick="checkoutWhatsApp()">
                <i data-lucide="message-circle" class="w-5 h-5 group-hover:animate-pulse"></i> Checkout via WhatsApp
            </button>
        </div>
    </div>
</div>

<?php
require_once 'inc/footer.php';
?>

<!-- Pass PHP data to JavaScript -->
<script>
    const categories = <?php echo json_encode($categories); ?>;
    const menuItems = <?php echo json_encode($menuItems); ?>;
    const businessPhone = "9274556756"; // Replace with actual number
</script>
<script src="assets/js/cart.js"></script>
