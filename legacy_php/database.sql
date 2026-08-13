-- ------------------------------------------------------------
--  Database: basic_cafe
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `basic_cafe` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `basic_cafe`;

-- ------------------------------------------------------------
--  Table: categories
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
    `id`   VARCHAR(50) NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`id`, `name`) VALUES
    ('all',   'All'),
    ('chaat', 'Chaat'),
    ('main',  'Pav Bhaji & More'),
    ('pizza', 'Pizza'),
    ('momos', 'Momos'),
    ('rolls', 'Rolls'),
    ('drinks','Thanda (Drinks)');

-- ------------------------------------------------------------
--  Table: menu_items
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `menu_items` (
    `id`        INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`      VARCHAR(150) NOT NULL,
    `category`  VARCHAR(50) NOT NULL,
    `price`     INT NOT NULL,
    `description` TEXT NOT NULL,
    `image`     VARCHAR(255) NOT NULL,
    `popular`   TINYINT(1) NOT NULL DEFAULT 0,
    CONSTRAINT `fk_category`
        FOREIGN KEY (`category`) REFERENCES `categories`(`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `menu_items`
    (`name`, `category`, `price`, `description`, `image`, `popular`) VALUES
    ('Aloo Tikki Supreme',      'main',   69,  'Crispy spicy potato patty, mint chutney, onion rings, tomato.',      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=80', 1),
    ('Maharaja Paneer Burger',  'main',  129,  'Thick paneer slab marinated in tandoori sauce, jalapenos, cheese.','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', 0),
    ('Mumbai Vada Pav (2pcs)',  'chaat',  50,  'The indian burger! Fried potato dumpling in bun with dry garlic chutney.','https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=80', 1),
    ('Paneer Makhani Pizza',    'pizza', 289,  'Rich makhani sauce, paneer cubes, onion, capsicum, mozzarella.','https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', 1),
    ('Farmhouse Veg Pizza',     'pizza', 249,  'Loaded with corn, olive, red paprika, onion, tomato.',               'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80', 0),
    ('Steamed Veg Momos (8pcs)','momos',  90,  'Served with spicy schezwan chutney and mayo.',                     'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80', 1),
    ('Corn & Cheese Momos',     'momos', 110,  'Stuffed with sweet corn and melting cheese. Kids favorite!',      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80', 0),
    ('Paneer Tikka Roll',       'rolls', 120,  'Smoky paneer cubes wrapped in laccha paratha with onions and mint sauce.','https://images.pexels.com/photos/33430554/pexels-photo-33430554.jpeg', 1),
    ('Masala Chai',             'drinks', 25,  'Kadak adrak elaichi chai served in kulhad.',                       'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=500&q=80', 1),
    ('Mango Lassi',             'drinks', 60,  'Thick yogurt shake blended with alphonso mango pulp.',               'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=500&q=80', 0),
    ('Pani Puri (6pcs)',        'chaat',  40,  'Suji puri with teekha and meetha pani. Self service kit.',          'https://images.pexels.com/photos/13063315/pexels-photo-13063315.jpeg', 1),
    ('Special Pav Bhaji',       'main',  110,  'Butter loaded spicy bhaji served with 2 butter pavs and salad.',   'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=500&q=80', 1);
