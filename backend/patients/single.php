<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $patientId = $_GET['patient_id'] ?? null;

  if (!$patientId) {
    http_response_code(400);
    echo json_encode(["message" => "Patient ID required"]);
    exit;
  }

  $role = $_SESSION['user']['role'];

  if (!in_array($role, ['admin', 'receptionist', 'doctor'])) {
    http_response_code(403);
    echo json_encode(["message" => "Forbidden"]);
    exit;
  }

  $result = mysqli_query(
    $conn,
    "SELECT id, full_name, gender, date_of_birth, phone
    FROM patients
    WHERE id = $patientId
    LIMIT 1"
  );

  $patient = mysqli_fetch_assoc($result);

  echo json_encode($patient);
?>