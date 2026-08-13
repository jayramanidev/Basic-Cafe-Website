<?php
// inc/contact_process.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';

    // Simple validation (placeholder)
    $errors = [];
    if (empty($name)) $errors[] = 'Name is required.';
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';
    if (empty($phone)) $errors[] = 'Phone number is required.';
    if (empty($message)) $errors[] = 'Message cannot be empty.';

    if (!empty($errors)) {
        // In a real app, you'd redirect back with errors.
        echo '<h2>There were errors with your submission:</h2><ul>';
        foreach ($errors as $e) {
            echo "<li>{$e}</li>";
        }
        echo '</ul>';        
        exit;
    }

    // Placeholder: send email (adjust settings as needed)
    $to = 'contact@basiccafe.com';
    $subject = "New contact form submission from {$name}";
    $body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nMessage:\n{$message}";
    $headers = "From: {$email}\r\nReply-To: {$email}\r\n";

    // mail() may be disabled in many dev environments; we just simulate.
    // $sent = mail($to, $subject, $body, $headers);
    $sent = true; // assume success for demo

    if ($sent) {
        echo '<h2>Thank you! Your message has been sent.</h2>';
    } else {
        echo '<h2>Sorry, there was a problem sending your message. Please try again later.</h2>';
    }
} else {
    // Not a POST request
    header('Location: ../contact.php');
    exit;
}
?>
