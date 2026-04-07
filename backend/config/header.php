<?php
// header.php - Fixed & Improved CORS for Render + Vite

$allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://hospital-database-omega.vercel.app"
];

// Get the request origin
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");                    // Important for caching
} else {
    // Optional: Block unknown origins in production
    // header("Access-Control-Allow-Origin: null");
}

// Important headers
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, x-requested-with");
header("Content-Type: application/json");

// Handle Preflight (OPTIONS) request - MUST come BEFORE any other logic
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);     // 204 No Content is better than 200
    exit(0);
}

// Session cookie settings for cross-origin
session_set_cookie_params([
    'samesite' => 'None',
    'secure'   => true,      // Must be true when using SameSite=None
    'httponly' => true,
    'path'     => '/'
]);

// Start session (if you're using sessions)
session_start();
?>