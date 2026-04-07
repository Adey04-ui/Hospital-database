<?php
// header.php - Final Reliable Version for Render

// ====================== CORS HEADERS ======================
$allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://hospital-database-omega.vercel.app"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, x-requested-with");
header("Content-Type: application/json");

// ====================== HANDLE PREFLIGHT ======================
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);   // No Content
    exit(0);
}

// ====================== SESSION SETUP ======================
// Must be BEFORE session_start()
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'samesite' => 'None',
        'secure'   => true,
        'httponly' => true,
        'path'     => '/'
    ]);
}
?>