<?php
/**
 * Dynamic data source for the Digital Menu.
 *
 * It pulls the categories and menu items from the MySQL database
 * (via inc/db.php) and makes them available as $categories and $menuItems
 * arrays that are later JSON‑encoded for the front‑end JavaScript.
 *
 * The structure is identical to the previous hard‑coded version, so
 * no changes are required in the front‑end files.
 */

require_once __DIR__ . '/db.php';

/* ---------- Fetch categories ---------- */
$stmt = $pdo->query('SELECT `id`, `name` FROM `categories` ORDER BY `name` ASC');
$categories = $stmt->fetchAll();   // e.g. [ ['id'=>'chaat','name'=>'Chaat'], … ]

/* ---------- Fetch menu items ---------- */
$sql = <<<SQL
SELECT
    `id`,
    `name`,
    `category`,
    `price`,
    `description` AS `desc`,
    `image`,
    `popular`
FROM `menu_items`
ORDER BY `name` ASC
SQL;

$stmt = $pdo->query($sql);
$menuItems = [];

while ($row = $stmt->fetch()) {
    // Cast popular (tinyint) to a true boolean value for JSON output
    $row['popular'] = (bool)$row['popular'];
    $menuItems[] = $row;
}

/* The variables $categories and $menuItems are now ready
   for the view layer (digital_menu.php). */
?>
