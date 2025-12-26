<?php 
  require_once "../config/db.php";
  
  $data = json_encode(file_get_contents("php://inputs"), true);

  $email = $data['email'] ?? "";
  $password = $data["password"] ?? "";

  $query = "
  SELECT users.*, roles.name AS role
  FROM users
  JOIN roles ON users.role_id = roles.id
  WHERE email = '$email'
  LIMIT 1
  ";

  $result = mysqli_query($conn, $query);

  if (mysqli_num_rows($result) === 0) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
    exit;
  }

  $user = mysqli_fetch_assoc($result);

  if (!password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
    exit;
  }

  $_SESSION['user'] = [
    "id" => $user['id'],
    "role" => $user['role'],
    "name" => $user['full_name']
  ];

  echo json_encode([
    "message" => "Login successful",
    "user" => $_SESSION['user']
  ]);
?>