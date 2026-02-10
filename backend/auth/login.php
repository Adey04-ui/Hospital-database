<?php 
  require_once "../config/db.php";
  require_once "../config/header.php";
  require_once "../middleware/errorMiddleware.php";
  session_start();
  
  $data = json_decode(file_get_contents("php://input"), true);

  $email = mysqli_real_escape_string($conn, $data['email']) ?? "";
  $password = mysqli_real_escape_string($conn, $data["password"]) ?? "";

  $query = "
  SELECT users.*, roles.name AS role
  FROM users
  JOIN roles ON users.role_id = roles.id
  WHERE email = '$email'
  LIMIT 1
  ";

  $result = mysqli_query($conn, $query);

  if($email == null) {
    http_response_code(401);
    echo json_encode(["message" => "no email"]);
    exit;
  }

  if (mysqli_num_rows($result) === 0) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials, email doesnt exist '$email'"]);
    exit;
  }

  $user = mysqli_fetch_assoc($result);

  if (!password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials, wrong password"]);
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