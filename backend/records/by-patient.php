<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $patient_id = (int) ($_GET['patient_id'] ?? 0);
  $user_id = $_SESSION['user']['id'];
  $role = $_SESSION['user']['role'];

  if ($patient_id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Patient ID required"]);
    exit;
  }

  if ($role !== 'doctor') {
    http_response_code(403);
    echo json_encode(["message" => "Only doctors can view records"]);
    exit;
  }

  $doctorRes = mysqli_query(
    $conn,
    "SELECT id FROM doctors WHERE user_id = $user_id LIMIT 1"
  );

  $doctor = mysqli_fetch_assoc($doctorRes);

  if (!$doctor) {
    http_response_code(404);
    echo json_encode(["message" => "Doctor profile not found"]);
    exit;
  }

  $doctor_id = $doctor['id'];

  $sql = "
    SELECT
      r.id,
      r.diagnosis,
      r.symptoms,
      r.treatment,
      r.prescription,
      r.notes,
      r.created_at,
      a.appointment_date
    FROM patient_records r
    JOIN appointments a ON r.appointment_id = a.id
    WHERE
      r.patient_id = $patient_id
      AND r.doctor_id = $doctor_id
    ORDER BY r.created_at DESC
  ";

  $result = mysqli_query($conn, $sql);

  $records = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $records[] = $row;
  }

  echo json_encode($records);
?>