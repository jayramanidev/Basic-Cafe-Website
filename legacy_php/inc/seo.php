<?php
// inc/seo.php
function render_seo($title, $description) {
    echo "<title>{$title}</title>\n";
    echo "<meta name=\"description\" content=\"{$description}\">\n";
    echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n";
    // Open Graph basic tags
    echo "<meta property=\"og:title\" content=\"{$title}\" />\n";
    echo "<meta property=\"og:description\" content=\"{$description}\" />\n";
    echo "<meta property=\"og:type\" content=\"website\" />\n";
}
?>
