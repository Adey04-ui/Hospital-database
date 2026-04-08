<?php
// 1️⃣ Allowed origins
$allowedOrigins = [
    "http://localhost:5174",
    "https://customer-ui-sable.vercel.app",
    "http://localhost:5173",
    "https://hospital-database-omega.vercel.app",
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization");
}

header("Content-Type: application/json");

// 2️⃣ Handle preflight OPTIONS before anything else
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 3️⃣ Start session for real requests
$isLocal = strpos($_SERVER['HTTP_HOST'], 'localhost') !== false;
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => !$isLocal,
    'httponly' => true
]);
session_start();

// 4️⃣ Check if user is logged in
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not logged in"]);
    exit;
}

require_once "../config/db.php";

// 5️⃣ Fetch reviews
$role = $_SESSION['user']['role'];
$user_id = $_SESSION['user']['id'];

if ($role === "admin") {
    $sql = "SELECT id, full_name, stars, message, created_at FROM reviews ORDER BY created_at DESC";
} else {
    $limit = 5; // or get from query string
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