<?php
require_once 'inc/header.php';
?>
<section class="max-w-7xl mx-auto py-16 px-4 mb-16">
    <div class="text-center mb-12" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">Gallery</h1>
        <div class="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"></div>
        <p class="text-gray-500">A visual feast of our culinary creations and cafe ambiance.</p>
    </div>
    
    <div class="masonry-grid">
        <?php
        // Simple static array of image URLs
        $images = [
            "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
            "https://images.pexels.com/photos/33430554/pexels-photo-33430554.jpeg?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=600&q=80",
            "https://images.pexels.com/photos/13063315/pexels-photo-13063315.jpeg?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1585325702581-fce7a5b4a2a5?auto=format&fit=crop&w=800&q=80",
        ];
        
        $delay = 0;
        foreach ($images as $src) {
            echo "<div class=\"masonry-item relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 skeleton\" data-aos=\"fade-up\" data-aos-delay=\"{$delay}\">
                    <img src=\"{$src}\" alt=\"Gallery image\" class=\"w-full h-auto object-cover hover:scale-110 transform transition-transform duration-700 ease-out\" onload=\"this.parentElement.classList.remove('skeleton')\" />
                  </div>";
            $delay += 50;
            if($delay > 300) $delay = 0; // Reset delay so it doesn't get too long
        }
        ?>
    </div>
</section>
<?php
require_once 'inc/footer.php';
?>
