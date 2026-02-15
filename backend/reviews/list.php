<?php
  $allowedOrigins = [
      "http://localhost:5174",
      ""
  ];

  if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
      header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
  }

  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, x-requested-with");
  header("Content-Type: application/json");

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(200);
      exit;
  }

  session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true,
    'httponly' => true
  ]);
  require_once "../config/db.php";

      $sql = "
      SELECT r.id, r.full_name, r.stars, r.message, r.created_at
      FROM reviews r
      ";

  $result = mysqli_query($conn, $sql);

  $reviews = [];
  while ($row = mysqli_fetch_assoc($result)) {
      $reviews[] = $row;
  }

  echo json_encode($reviews);
?>
