<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  $data = json_decode(file_get_contents("php://input"), true);

  $type = $_SERVER['REQUEST_METHOD']; // "get" for fetching doctor info, "post" for updating doctor info

  $doctor_id = $_GET['id'] ?? 0;
  if ($doctor_id == 0) {
    http_response_code(400);
    echo json_encode(["message" => "Doctor ID is required"]);
    exit;
  }

  if ($type == "GET") {
      $sql = "
      SELECT d.id, u.email, u.phone, u.full_name, dep.name AS department, d.specialization, d.shift_start, d.shift_end, d.user_id
      FROM doctors d
      JOIN users u ON d.user_id = u.id
      JOIN departments dep ON d.department_id = dep.id
      WHERE d.id = $doctor_id
      ";

  $result = mysqli_query($conn, $sql);

  while ($row = mysqli_fetch_assoc($result)) {
      $doctor = $row;
    if ($doctor) {
        echo json_encode(["success" => true, "doctor" => $doctor]);
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Doctor not found"]);
    }
  }
  } elseif ($type == "POST" || $type == "PUT") {

    $doctor_id      = (int) $doctor_id;   
    $doctor_user_id = (int) ($data['doctor_user_id'] ?? 0);
    $department_id  = (int) ($data['department_id'] ?? 0);

    $full_name      = mysqli_real_escape_string($conn, trim($data['full_name'] ?? ''));
    $email          = mysqli_real_escape_string($conn, trim($data['email'] ?? ''));
    $phone          = mysqli_real_escape_string($conn, trim($data['phone'] ?? ''));
    $specialization = mysqli_real_escape_string($conn, trim($data['specialization'] ?? ''));
    $shift_start    = mysqli_real_escape_string($conn, trim($data['shift_start'] ?? ''));
    $shift_end      = mysqli_real_escape_string($conn, trim($data['shift_end'] ?? ''));
    $password       = $data['password'] ?? '';

      $pass = "";
      if (trim($password) !== "") {
          $hashed = password_hash($password, PASSWORD_DEFAULT);
          $pass = ", password = '$hashed'";
      }

      $check = mysqli_query($conn, "SELECT 1 FROM doctors WHERE id = $doctor_id");
      if (mysqli_num_rows($check) === 0) {
          http_response_code(404);
          echo json_encode(["message" => "Doctor not found"]);
          exit;
      }

      $sql = "
      UPDATE users 
      SET full_name = '$full_name', 
          email = '$email',
          phone = '$phone'" . $pass . "
      WHERE id = $doctor_user_id
      ";

      if (!mysqli_query($conn, $sql)) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to update user table: " . mysqli_error($conn)]);
        exit;
      }

      $updateDoctor = "
      UPDATE doctors SET shift_start='$shift_start', shift_end='$shift_end'
      WHERE id=$doctor_id
      ";
      if (!mysqli_query($conn, $updateDoctor)) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to update doctor table: " . mysqli_error($conn)]);
        exit;
      }

      echo json_encode([
          "message" => "Doctor updated successfully",
          "doctor_id" => $doctor_id
      ]);
  } else {
      http_response_code(403);
      echo json_encode(["message" => "Forbidden"]);
      exit;
  }


?>
