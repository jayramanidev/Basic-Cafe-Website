<?php
// inc/header.php
require_once __DIR__ . '/seo.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php render_seo('Basic Cafe', 'Welcome to Basic Cafe – home of delicious Indian street food.'); ?>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>">
    
    <!-- Premium Fonts: Playfair Display for headings, Plus Jakarta Sans for body -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- AOS Animation CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <!-- Compiled Tailwind CSS (Removes CDN Warning) -->
    <link href="assets/css/style.css" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="font-sans antialiased text-brand-dark bottom-app-bar-padding">
    <!-- Floating Sticky Glassmorphism Header Wrapper -->
    <div class="fixed w-full top-0 z-50 px-4 py-4 pointer-events-none transition-all duration-300 ease-out" id="header-wrapper">
        <header class="glass mx-auto max-w-7xl rounded-full shadow-glass pointer-events-auto transition-all duration-300 ease-out" id="main-header">
            <div class="px-6 flex items-center justify-between h-14">
                <a href="index.php" class="text-2xl font-display font-bold text-brand-green tracking-tight">
                    Basic Cafe<span class="text-brand-gold">.</span>
                </a>
                
                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8">
                    <a href="index.php" class="text-sm font-medium text-gray-600 hover:text-brand-gold transition-colors">Home</a>
                    <a href="about.php" class="text-sm font-medium text-gray-600 hover:text-brand-gold transition-colors">About</a>
                    <a href="gallery.php" class="text-sm font-medium text-gray-600 hover:text-brand-gold transition-colors">Gallery</a>
                    <a href="contact.php" class="text-sm font-medium text-gray-600 hover:text-brand-gold transition-colors">Contact</a>
                </nav>
                
                <!-- Desktop CTA -->
                <div class="hidden md:flex items-center space-x-3">
                    <a href="tel:+1234567890" class="flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-gold transition-colors">
                        <i data-lucide="phone" class="w-4 h-4"></i> Call
                    </a>
                    <a href="digital_menu.php" class="bg-brand-green text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand-gold transition-colors shadow-md hover:shadow-glow active:scale-95">
                        Order Now
                    </a>
                </div>
            </div>
        </header>
    </div>

    <!-- Main Content Wrapper -->
    <main class="pt-24 min-h-screen">
