<?php
/**
 * PDO database connection.
 *
 * Edit the credentials below to match your local MySQL configuration.
 * For production you should move these values to environment variables
 * and enable proper error handling.
 */

$host = 'localhost:3307';      // usually localhost
$db   = 'basic_cafe';     // database name created by database.sql
$user = 'root';           // <-- change if you use a different MySQL user
$pass = '';               // <-- add password if your MySQL user has one
$charset = 'utf8mb4';

$dsn = "mysql:host={$host};dbname={$db};charset={$charset}";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // throw exceptions on errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // fetch associative arrays
    PDO::ATTR_EMULATE_PREPARES   => false,                  // use native prepares if possible
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // In a real app you would log this error instead of echoing it.
    exit('Database connection failed: ' . $e->getMessage());
}
?>
