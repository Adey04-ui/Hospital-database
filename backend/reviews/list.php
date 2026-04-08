<?php
$allowedOrigins = [
    "http://localhost:5174",
    "https://customer-ui-sable.vercel.app",
    "http://localhost:5173",
    "https://hospital-database-omega.vercel.app",
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// ✅ Handle preflight immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Session setup
$isLocal = strpos($_SERVER['HTTP_HOST'], 'localhost') !== false;
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => !$isLocal,
    'httponly' => true
]);
session_start();

require_once "../config/db.php";

// Safe session check
$role = $_SESSION['user']['role'] ?? null;

if ($role === "admin") {
    $sql = "SELECT id, full_name, stars, message, created_at FROM reviews ORDER BY created_at DESC";
} else {
    $limit = intval($_GET['limit'] ?? 5);
    $sql = "SELECT id, full_name, stars, message, created_at FROM reviews ORDER BY created_at DESC LIMIT $limit";
}

$result = mysqli_query($conn, $sql);

$reviews = [];
while ($row = mysqli_fetch_assoc($result)) {
    $reviews[] = $row;
}

echo json_encode([
    "status" => "success",
    "reviews" => $reviews
]);