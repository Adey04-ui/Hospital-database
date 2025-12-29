<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $data = json_decode(file_get_contents("php://input"), true);

  $patient_id     = (int) ($data['patient_id'] ?? 0);
  $appointment_id = (int) ($data['appointment_id'] ?? 0);
  $diagnosis      = trim($data['diagnosis'] ?? '');
  $symptoms       = trim($data['symptoms'] ?? '');
  $treatment      = trim($data['treatment'] ?? '');
  $prescription   = trim($data['prescription'] ?? '');
  $notes          = trim($data['notes'] ?? '');

  $user_id = $_SESSION['user']['id'];
  $role    = $_SESSION['user']['role'];

  if ($role !== 'doctor') {
    http_response_code(403);
    echo json_encode(["message" => "Only doctors can create records"]);
    exit;
  }

  if ($patient_id === 0 || $appointment_id === 0 || $diagnosis === '') {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
  }

  /* Get doctor ID */
  $doctorQuery = mysqli_query(
    $conn,
    "SELECT id FROM doctors WHERE user_id = $user_id"
  );

  $doctor = mysqli_fetch_assoc($doctorQuery);
  $doctor_id = $doctor['id'] ?? 0;

  if ($doctor_id === 0) {
    http_response_code(403);
    echo json_encode(["message" => "Doctor not found"]);
    exit;
  }

  /* Ensure appointment belongs to doctor */
  $check = mysqli_query(
    $conn,
    "SELECT id FROM appointments 
    WHERE id=$appointment_id 
    AND doctor_id=$doctor_id 
    AND patient_id=$patient_id"
  );

  if (mysqli_num_rows($check) === 0) {
    http_response_code(403);
    echo json_encode(["message" => "Invalid appointment"]);
    exit;
  }

  $sql = "
  INSERT INTO patient_records
  (patient_id, doctor_id, appointment_id, diagnosis, symptoms, treatment, prescription, notes)
  VALUES
  ($patient_id, $doctor_id, $appointment_id, '$diagnosis', '$symptoms', '$treatment', '$prescription', '$notes')
  ";

  mysqli_query($conn, $sql);

  echo json_encode([
    "message" => "Patient record created",
    "record_id" => mysqli_insert_id($conn)
  ]);
?>