<?php
/**
 * Admin panel – simple CRUD for menu items.
 *
 * NOTE: No authentication is implemented yet.
 * Add your own login / session checks where the comment indicates.
 */
require_once __DIR__ . '/inc/db.php';

// ---------- HANDLE DELETIONS ----------
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $deleteId = (int)$_GET['delete'];
    $stmt = $pdo->prepare('DELETE FROM `menu_items` WHERE `id` = ?');
    $stmt->execute([$deleteId]);
    header('Location: admin.php?msg=deleted');
    exit;
}

// ---------- HANDLE INSERTIONS ----------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Basic sanitisation – you can extend validation as needed
    $name        = trim($_POST['name'] ?? '');
    $category    = trim($_POST['category'] ?? '');
    $price       = (int)($_POST['price'] ?? 0);
    $image       = trim($_POST['image'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $popular     = isset($_POST['popular']) ? 1 : 0;

    // Simple required‑field check
    if ($name && $category && $price && $image && $description) {
        $stmt = $pdo->prepare('
            INSERT INTO `menu_items`
                (`name`,`category`,`price`,`description`,`image`,`popular`)
            VALUES
                (?,?,?,?,?,?)
        ');
        $stmt->execute([$name, $category, $price, $description, $image, $popular]);

        header('Location: admin.php?msg=added');
        exit;
    } else {
        header('Location: admin.php?msg=error');
        exit;
    }
}

/* ---------- FETCH DATA FOR DISPLAY ---------- */
$itemsStmt = $pdo->query('
    SELECT mi.`id`, mi.`name`, mi.`category`, c.`name` AS cat_name,
           mi.`price`, mi.`image`, mi.`popular`
    FROM `menu_items` mi
    LEFT JOIN `categories` c ON mi.`category` = c.`id`
    ORDER BY mi.`id` ASC
');
$menuItems = $itemsStmt->fetchAll();

$catStmt = $pdo->query('SELECT `id`, `name` FROM `categories` WHERE `id` <> "all" ORDER BY `name` ASC');
$categories = $catStmt->fetchAll();

/* ---------- UI HELPERS ---------- */
function flashMessage()
{
    if (!isset($_GET['msg'])) return '';

    $msg = $_GET['msg'];
    $map = [
        'added'   => ['Item added successfully.',      'bg-green-100 text-green-800'],
        'deleted' => ['Item deleted successfully.',    'bg-red-100 text-red-800'],
        'error'   => ['Please fill out all fields.',   'bg-yellow-100 text-yellow-800'],
    ];

    if (!isset($map[$msg])) return '';

    [$text, $class] = $map[$msg];
    return "<div class=\"p-4 mb-4 rounded {$class}\">{$text}</div>";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Basic Cafe – Admin Panel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CDN – you can replace with a compiled build if desired -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-green': '#38a169',
                        'brand-orange': '#ed8936',
                        'brand-yellow': '#ecc94b',
                    },
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif'],
                        display: ['Fredoka One', 'cursive'],
                    },
                },
            },
        };
    </script>
</head>
<body class="bg-gray-50 font-sans min-h-screen">

    <header class="bg-white shadow-md py-4">
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <h1 class="text-2xl font-display text-brand-green">Basic Cafe – Admin</h1>
            <a href="index.php" class="text-brand-green hover:underline">← Back to Website</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">

        <?= flashMessage(); ?>

        <!-- ==== MENU ITEMS TABLE ==== -->
        <section class="mb-12">
            <h2 class="text-xl font-display text-gray-800 mb-4">Current Menu Items</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-200 rounded">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-4 py-2 text-left">ID</th>
                            <th class="px-4 py-2 text-left">Image</th>
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">Category</th>
                            <th class="px-4 py-2 text-left">Price (₹)</th>
                            <th class="px-4 py-2 text-left">Bestseller</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($menuItems as $item): ?>
                            <tr class="border-t">
                                <td class="px-4 py-2"><?= htmlspecialchars($item['id']) ?></td>
                                <td class="px-4 py-2">
                                    <img src="<?= htmlspecialchars($item['image']) ?>"
                                         alt="<?= htmlspecialchars($item['name']) ?>"
                                         class="w-16 h-16 object-cover rounded"/>
                                </td>
                                <td class="px-4 py-2"><?= htmlspecialchars($item['name']) ?></td>
                                <td class="px-4 py-2"><?= htmlspecialchars($item['cat_name'] ?? $item['category']) ?></td>
                                <td class="px-4 py-2"><?= htmlspecialchars($item['price']) ?></td>
                                <td class="px-4 py-2">
                                    <?php if ($item['popular']): ?>
                                        <span class="inline-block bg-brand-yellow text-brand-dark text-xs font-bold px-2 py-1 rounded">YES</span>
                                    <?php else: ?>
                                        <span class="text-gray-500 text-sm">‑</span>
                                    <?php endif; ?>
                                </td>
                                <td class="px-4 py-2">
                                    <a href="admin.php?delete=<?= $item['id'] ?>"
                                       class="text-red-600 hover:underline"
                                       onclick="return confirm('Delete this item?');">
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        <?php if (empty($menuItems)): ?>
                            <tr><td colspan="7" class="p-4 text-center text-gray-500">No menu items found.</td></tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ==== ADD NEW ITEM FORM ==== -->
        <section class="bg-white rounded shadow-md p-6">
            <h2 class="text-xl font-display text-gray-800 mb-6">Add New Menu Item</h2>
            <form method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" required
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"/>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green">
                        <option value="">Select category</option>
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= htmlspecialchars($cat['id']) ?>">
                                <?= htmlspecialchars($cat['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input type="number" name="price" min="0" required
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"/>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="url" name="image" required
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"/>
                </div>

                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows="4" required
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green"></textarea>
                </div>

                <div class="flex items-center mt-2">
                    <input type="checkbox" name="popular" id="popular" value="1"
                           class="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"/>
                    <label for="popular" class="ml-2 block text-sm text-gray-700">Mark as Bestseller (Popular)</label>
                </div>

                <div class="md:col-span-2 flex justify-end">
                    <button type="submit"
                            class="bg-brand-green hover:bg-brand-orange text-white font-bold py-2 px-4 rounded transition">
                        Add Item
                    </button>
                </div>
            </form>
        </section>

    </main>

    <footer class="bg-gray-800 text-white py-4 mt-12">
        <div class="max-w-7xl mx-auto text-center">
            &copy; <?= date('Y'); ?> Basic Cafe – Admin Panel
        </div>
    </footer>

</body>
</html>
