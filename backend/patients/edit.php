<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  $data = json_decode(file_get_contents("php://input"), true);

  $type = $_SERVER['REQUEST_METHOD'];

  $patient_id = $_GET['id'] ?? 0;
  if ($patient_id == 0) {
    http_response_code(400);
    echo json_encode(["message" => "patient ID is required"]);
    exit;
  }

  if ($type == "GET") {
      $sql = "
      SELECT p.id, p.full_name, p.email, p.phone, p.gender, p.date_of_birth, p.address
      FROM patients p
      WHERE p.id=$patient_id
      ";

  $result = mysqli_query($conn, $sql);

  while ($row = mysqli_fetch_assoc($result)) {
      $patient = $row;
    if ($patient) {
        echo json_encode($patient);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "patient not found"]);
    }
  }
  } elseif ($type == "POST" || $type == "PUT") {  

    $full_name      = trim($data['full_name'] ?? '');
    $email          = trim($data['email'] ?? '');
    $phone          = $data['phone'] ?? '';
    $gender         = trim($data['gender'] ?? '');
    $date_of_birth  = trim($data['date_of_birth'] ?? '');
    $address          = trim($data['address'] ?? '');

      $check = mysqli_query($conn, "SELECT 1 FROM patients WHERE id = $patient_id");
      if (mysqli_num_rows($check) === 0) {
          http_response_code(404);
          echo json_encode(["message" => "patient not found"]);
          exit;
      }

      $sql = "
      UPDATE patients 
      SET full_name = '$full_name', 
          email = '$email',
          phone = '$phone',
          gender = '$gender',
          date_of_birth = '$date_of_birth',
          address = '$address'
      WHERE id = $patient_id
      ";

      if (!mysqli_query($conn, $sql)) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to update patient table: " . mysqli_error($conn)]);
        exit;
      }

      echo json_encode([
          "message" => "patient updated successfully",
          "patient_id" => $patient_id
      ]);
  } else {
      http_response_code(403);
      echo json_encode(["message" => "Forbidden"]);
      exit;
  }


?>
