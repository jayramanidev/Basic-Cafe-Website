<?php
require_once 'inc/header.php';
?>
<section class="max-w-3xl mx-auto py-16 px-4 mb-16">
    <div class="text-center mb-12" data-aos="fade-up">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">Get in Touch</h1>
        <div class="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"></div>
        <p class="text-gray-500">We'd love to hear from you. Drop us a message below.</p>
    </div>
    
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden" data-aos="fade-up" data-aos-delay="100">
        <div class="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl"></div>
        
        <form action="inc/contact_process.php" method="POST" class="relative z-10 grid gap-6">
            <div class="floating-input">
                <input type="text" name="name" id="name" required placeholder=" " class="w-full" />
                <label for="name" class="floating-label">Full Name</label>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="floating-input">
                    <input type="email" name="email" id="email" required placeholder=" " class="w-full" />
                    <label for="email" class="floating-label">Email Address</label>
                </div>
                
                <div class="floating-input">
                    <input type="tel" name="phone" id="phone" required placeholder=" " class="w-full" />
                    <label for="phone" class="floating-label">Phone Number</label>
                </div>
            </div>
            
            <div class="floating-input">
                <textarea name="message" id="message" rows="5" required placeholder=" " class="w-full resize-none"></textarea>
                <label for="message" class="floating-label">Your Message</label>
            </div>
            
            <div class="mt-4 flex justify-center">
                <button type="submit" class="bg-brand-dark text-brand-gold font-bold px-12 py-4 rounded-full hover:bg-black hover:shadow-lg active:scale-95 transition-all w-full md:w-auto flex justify-center items-center gap-2">
                    <i data-lucide="send" class="w-5 h-5"></i> Send Message
                </button>
            </div>
        </form>
    </div>
</section>
<?php
require_once 'inc/footer.php';
?>
