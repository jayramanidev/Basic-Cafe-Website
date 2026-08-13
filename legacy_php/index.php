<?php
require_once 'inc/header.php';
?>

<!-- Cinematic Hero Section -->
<section class="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl mx-4 mt-4 shadow-2xl">
    <!-- Background Image with Parallax & Gradient Overlay -->
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent"></div>
    
    <!-- Hero Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="1000">
        <span class="inline-block py-1.5 px-5 rounded-full bg-black/90 border-2 border-brand-gold text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-6 shadow-2xl">
            <span class="text-brand-gold">✨</span> Experience Authenticity
        </span>
        <h1 class="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
            A Symphony of <br/><span class="text-brand-gold italic">Indian Flavors</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-200 mb-10 font-light max-w-2xl mx-auto drop-shadow">
            Elevating traditional street food into a fine culinary experience. Freshly prepared, passionately served.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="digital_menu.php" class="bg-brand-gold text-brand-dark font-bold px-8 py-4 rounded-full hover:bg-white transition-colors shadow-glow active:scale-95 text-lg">
                Explore Menu
            </a>
            <a href="about.php" class="glass text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-colors active:scale-95 text-lg">
                Our Story
            </a>
        </div>
    </div>
</section>

<!-- Animated Marquee -->
<div class="bg-brand-green text-brand-gold py-4 overflow-hidden my-16 border-y border-brand-green/20 shadow-sm relative">
    <div class="whitespace-nowrap animate-marquee inline-block font-display text-xl tracking-wider">
        🔥 100% PURE VEG &nbsp;•&nbsp; FRESHLY BAKED &nbsp;•&nbsp; AUTHENTIC SPICES &nbsp;•&nbsp; PREMIUM QUALITY &nbsp;•&nbsp; 🔥 100% PURE VEG &nbsp;•&nbsp; FRESHLY BAKED &nbsp;•&nbsp; AUTHENTIC SPICES &nbsp;•&nbsp; PREMIUM QUALITY &nbsp;•&nbsp;
        🔥 100% PURE VEG &nbsp;•&nbsp; FRESHLY BAKED &nbsp;•&nbsp; AUTHENTIC SPICES &nbsp;•&nbsp; PREMIUM QUALITY &nbsp;•&nbsp; 🔥 100% PURE VEG &nbsp;•&nbsp; FRESHLY BAKED &nbsp;•&nbsp; AUTHENTIC SPICES &nbsp;•&nbsp; PREMIUM QUALITY
    </div>
</div>

<!-- Premium Features Section -->
<section class="max-w-7xl mx-auto py-16 px-4">
    <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-4">Why Choose Us</h2>
        <div class="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden" data-aos="fade-up" data-aos-delay="100">
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-colors"></div>
            <div class="relative z-10">
                <div class="w-14 h-14 bg-brand-green text-brand-gold rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <i data-lucide="star" class="w-7 h-7"></i>
                </div>
                <h3 class="text-2xl font-display font-bold mb-3 text-brand-dark group-hover:text-brand-green transition-colors">Authentic Flavors</h3>
                <p class="text-gray-600 leading-relaxed">Crafted with traditional recipes, hand-picked spices, and fresh ingredients that transport you straight to the streets of India.</p>
            </div>
        </div>

        <!-- Feature 2 -->
        <div class="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl group-hover:bg-brand-accent/20 transition-colors"></div>
            <div class="relative z-10">
                <div class="w-14 h-14 bg-brand-green text-brand-accent rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <i data-lucide="truck" class="w-7 h-7"></i>
                </div>
                <h3 class="text-2xl font-display font-bold mb-3 text-brand-dark group-hover:text-brand-green transition-colors">Lightning Fast</h3>
                <p class="text-gray-600 leading-relaxed">Experience seamless ordering with our native-feel web app. Your favorite dishes, prepared hot and ready when you are.</p>
            </div>
        </div>

        <!-- Feature 3 -->
        <div class="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden" data-aos="fade-up" data-aos-delay="300">
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-green/10 rounded-full blur-2xl group-hover:bg-brand-green/20 transition-colors"></div>
            <div class="relative z-10">
                <div class="w-14 h-14 bg-brand-green text-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <i data-lucide="heart" class="w-7 h-7"></i>
                </div>
                <h3 class="text-2xl font-display font-bold mb-3 text-brand-dark group-hover:text-brand-green transition-colors">Customer Love</h3>
                <p class="text-gray-600 leading-relaxed">Join thousands of our delighted regulars. We serve every plate with a dash of passion and unparalleled hospitality.</p>
            </div>
        </div>
    </div>
</section>

<?php
require_once 'inc/footer.php';
?>