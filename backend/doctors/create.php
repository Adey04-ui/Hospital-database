<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $full_name      = trim($data['full_name'] ?? '');
  $email          = trim($data['email'] ?? '');
  $password       = $data['password'] ?? '';
  $phone          = $data['phone'] ?? '';
  $department_id  = (int) ($data['department_id'] ?? 0);
  $specialization = trim($data['specialization'] ?? '');
  $shift_start    = $data['shift_start'] ?? '';
  $shift_end      = $data['shift_end'] ?? '';

  if ($full_name === '' || $email === '' || $password === '' || $department_id === 0 || $shift_end === '' || $shift_start === '') {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
  }

  $roleQuery = mysqli_query($conn, "SELECT id FROM roles WHERE name='doctor'");
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

  $checkDept = mysqli_query(
    $conn,
    "SELECT id FROM departments WHERE id = $department_id"
  );

  if (mysqli_num_rows($checkDept) === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid department"]);
    exit;
  }

  $doctorSql = "
  INSERT INTO doctors (user_id, department_id, specialization, shift_start, shift_end)
  VALUES ($user_id, $department_id, '$specialization', '$shift_start', '$shift_end')
  ";

  if (!mysqli_query($conn, $doctorSql)) {
    http_response_code(500);
    echo json_encode(["message" => "Failed to link doctor"]);
    exit;
  }

  echo json_encode([
    "message" => "Doctor created successfully",
    "doctor_id" => mysqli_insert_id($conn)
  ]);
?>