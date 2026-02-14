<?php
  require_once "../config/header.php";
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