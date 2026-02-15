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

  $data = json_decode(file_get_contents("php://input"), true);

  if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON data"]);
    exit;
  }

  $full_name      = trim(($data['full_name'] ?? 0));
  $stars          = (int) ($data['stars'] ?? 0);
  $message      = trim($data['message'] ?? '');

  if ($full_name === '' || $stars === 0 || $message === '') {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
  }

  if ($stars < 1 || $stars > 5) {
    http_response_code(400);
    echo json_encode(["message" => "Stars must be between 1 and 5", "stars_provided" => $stars, "fullname" => $full_name]);
    exit;
  }

  $sql = "
  INSERT INTO reviews
  (full_name, stars, message)
  VALUES
  ('$full_name', '$stars', '$message')
  ";

  mysqli_query($conn, $sql);

  echo json_encode([
    "message" => "review has been added",
    "record_id" => mysqli_insert_id($conn)
  ]);
?>