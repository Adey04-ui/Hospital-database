<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $full_name     = trim($data['full_name'] ?? '');
  $gender        = $data['gender'] ?? '';
  $date_of_birth = $data['date_of_birth'] ?? '';
  $phone         = $data['phone'] ?? '';
  $address       = $data['address'] ?? '';

  if ($full_name === '' || $gender === '' || $date_of_birth === '') {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
  }

  $allowed_genders = ['male', 'female', 'other'];
  if (!in_array($gender, $allowed_genders)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid gender"]);
    exit;
  }

  $sql = "
  INSERT INTO patients (full_name, gender, date_of_birth, phone, address)
  VALUES ('$full_name', '$gender', '$date_of_birth', '$phone', '$address')
  ";

  if (!mysqli_query($conn, $sql)) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to register patient"]);
    exit;
  }

  echo json_encode([
    "message" => "Patient registered successfully",
    "patient_id" => mysqli_insert_id($conn)
  ]);
?>