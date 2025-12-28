<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $appointment_id = (int)($data['appointment_id'] ?? 0);
  $status = $data['status'] ?? '';

  $allowed = ['scheduled', 'completed', 'cancelled'];

  if ($appointment_id === 0 || !in_array($status, $allowed)) {
      http_response_code(400);
      echo json_encode(["message" => "Invalid input"]);
      exit;
  }

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  if ($role === 'doctor') {
      $check = mysqli_query($conn, "SELECT a.id FROM appointments a JOIN doctors d ON a.doctor_id=d.id WHERE a.id=$appointment_id AND d.user_id=$user_id");
      if (mysqli_num_rows($check) === 0) {
          http_response_code(403);
          echo json_encode(["message" => "Forbidden"]);
          exit;
      }
  }

  $sql = "UPDATE appointments SET status='$status' WHERE id=$appointment_id";
  mysqli_query($conn, $sql);

  echo json_encode(["message" => "Appointment status updated"]);
?>
