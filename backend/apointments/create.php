<?php
  require_once "../middleware/auth.php";
  require_once "../config/db.php";
  require_once "../config/header.php";

  $role = $_SESSION['user']['role'];
  if (!in_array($role, ['admin', 'receptionist'])) {
      http_response_code(403);
      echo json_encode(["message" => "Forbidden"]);
      exit;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  $patient_id = (int)($data['patient_id'] ?? 0);
  $doctor_id  = (int)($data['doctor_id'] ?? 0);
  $appointment_date = $data['appointment_date'] ?? '';

  if ($patient_id === 0 || $doctor_id === 0 || $appointment_date === '') {
      http_response_code(400);
      echo json_encode(["message" => "Missing required fields"]);
      exit;
  }

  $checkPatient = mysqli_query($conn, "SELECT id FROM patients WHERE id = $patient_id");
  if (mysqli_num_rows($checkPatient) === 0) {
      http_response_code(400);
      echo json_encode(["message" => "Invalid patient"]);
      exit;
  }

  $checkDoctor = mysqli_query($conn, "SELECT id FROM doctors WHERE id = $doctor_id");
  if (mysqli_num_rows($checkDoctor) === 0) {
      http_response_code(400);
      echo json_encode(["message" => "Invalid doctor"]);
      exit;
  }

  $sql = "
  INSERT INTO appointments (patient_id, doctor_id, appointment_date)
  VALUES ($patient_id, $doctor_id, '$appointment_date')
  ";

  if (!mysqli_query($conn, $sql)) {
      http_response_code(500);
      echo json_encode(["message" => "Failed to create appointment"]);
      exit;
  }

  echo json_encode([
      "message" => "Appointment booked successfully",
      "appointment_id" => mysqli_insert_id($conn)
  ]);
?>