<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $full_name      = trim($data['full_name'] ?? '');
  $email          = trim($data['email'] ?? '');
  $password       = $data['password'] ?? '';
  $phone          = $data['phone'] ?? '';

  if ($full_name === '' || $email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
  }

  $roleQuery = mysqli_query($conn, "SELECT id FROM roles WHERE name='receptionist'");
  $role_id = mysqli_fetch_assoc($roleQuery)['id'];

  $hashed = password_hash($password, PASSWORD_DEFAULT);

  $userSql = "
  INSERT INTO users (role_id, full_name, email, password, phone)
  VALUES ($role_id, '$full_name', '$email', '$hashed', '$phone')
  ";

  if (!mysqli_query($conn, $userSql)) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to create doctor user"]);
    exit;
  }

  $user_id = mysqli_insert_id($conn);

  $receptionistSql = "
  INSERT INTO receptionists (user_id)
  VALUES ($user_id)
  ";

  if (!mysqli_query($conn, $receptionistSql)) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to link receptionist"]);
    exit;
  }

  echo json_encode([
    "message" => "Receptionist created successfully",
    "receptionist_id" => mysqli_insert_id($conn)
  ]);
?>