<?php
  require_once "../config/header.php";
  require_once "../config/db.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $full_name      = (int) ($data['full_name'] ?? 0);
  $stars          = (int) ($data['stars'] ?? 0);
  $message      = trim($data['message'] ?? '');

  if ($full_name === 0 || $stars === 0 || $message === '') {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
  }

  $sql = "
  INSERT INTO reviews
  (full_name, stars, message)
  VALUES
  ('$fullname', '$stars', '$message')
  ";

  mysqli_query($conn, $sql);

  echo json_encode([
    "message" => "review has been added",
    "record_id" => mysqli_insert_id($conn)
  ]);
?>