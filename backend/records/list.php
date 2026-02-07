<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  /*
  Expected relationships:
  records.patient_id → patients.id
  records.doctor_id → doctors.id
  doctors.user_id → users.id
  */

  $user_id = $_SESSION['user']['id'];
  $role    = $_SESSION['user']['role'];

  if ($role == 'doctor') {
    $sql = "
  SELECT 
      r.id AS record_id,
      r.diagnosis,
      r.prescription,
      r.created_at,

      p.id AS patient_id,
      p.full_name AS patient_name,
      p.email AS patient_email,

      d.id AS doctor_id,
      u.full_name AS doctor_name
  FROM patient_records r
  JOIN patients p ON r.patient_id = p.id
  JOIN doctors d ON r.doctor_id = d.id
  JOIN users u ON d.user_id = u.id
  WHERE 
    d.user_id = $user_id
  ORDER BY r.created_at DESC
  ";
  } else {
  $sql = "
    SELECT 
        r.id AS record_id,
        r.diagnosis,
        r.prescription,
        r.created_at,

        p.id AS patient_id,
        p.full_name AS patient_name,
        p.email AS patient_email,

        d.id AS doctor_id,
        u.full_name AS doctor_name
    FROM patient_records r
    JOIN patients p ON r.patient_id = p.id
    JOIN doctors d ON r.doctor_id = d.id
    JOIN users u ON d.user_id = u.id
    ORDER BY r.created_at DESC
    ";
  }

  $result = mysqli_query($conn, $sql);

  if (!$result) {
      http_response_code(500);
      echo json_encode([
          "message" => "Failed to fetch records",
          "error" => mysqli_error($conn)
      ]);
      exit;
  }

  $records = [];

  while ($row = mysqli_fetch_assoc($result)) {
      $records[] = $row;
  }

  echo json_encode($records);
?>