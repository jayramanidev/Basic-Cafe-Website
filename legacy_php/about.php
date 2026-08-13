<?php
require_once 'inc/header.php';
?>

<!-- Parallax Hero -->
<section class="relative h-[60vh] min-h-[400px] flex items-center justify-center mb-16 overflow-hidden rounded-3xl mx-4 mt-4 shadow-xl">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585325702581-fce7a5b4a2a5?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"></div>
    <div class="absolute inset-0 bg-brand-dark/70"></div>
    <div class="relative z-10 text-center px-4" data-aos="fade-up">
        <h1 class="text-5xl md:text-7xl font-display font-bold text-brand-gold mb-4 drop-shadow-lg">Our Story</h1>
        <div class="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-white font-light tracking-wide">Tradition meets modernity.</p>
    </div>
</section>

<section class="max-w-4xl mx-auto py-8 px-4 mb-20">
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100" data-aos="fade-up" data-aos-delay="100">
        <p class="text-lg text-gray-600 mb-8 leading-relaxed text-center md:text-left">
            Welcome to <strong class="text-brand-dark font-display">Basic Cafe</strong>, where we bring the authentic flavors of Indian street food to your table. Our mission is to serve freshly prepared, high‑quality dishes that capture the vibrant spirit of India, while offering an elevated, premium dining experience.
        </p>
        
        <div class="grid md:grid-cols-2 gap-8 items-center mt-12">
            <div>
                <h3 class="text-2xl font-display font-bold text-brand-dark mb-4">Crafted with Passion</h3>
                <p class="text-gray-600 leading-relaxed mb-6">
                    Founded in 2023, our team is passionate about using traditional recipes, locally sourced ingredients, and a dash of love in every plate. From spicy chaat to cheesy pizzas, we promise a memorable dining experience.
                </p>
                <div class="flex items-center gap-4 text-brand-green font-bold">
                    <i data-lucide="check-circle-2" class="w-6 h-6 text-brand-gold"></i> Premium Ingredients
                </div>
                <div class="flex items-center gap-4 text-brand-green font-bold mt-3">
                    <i data-lucide="check-circle-2" class="w-6 h-6 text-brand-gold"></i> Authentic Recipes
                </div>
            </div>
            <div class="rounded-2xl overflow-hidden shadow-lg h-64 skeleton">
                <img src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80" alt="Cooking" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" onload="this.parentElement.classList.remove('skeleton')" />
            </div>
        </div>
    </div>
</section>

<?php
require_once 'inc/footer.php';
?>
