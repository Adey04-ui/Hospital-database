<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $record_id = $_GET['id'] ?? null;

  if (!$record_id) {
    http_response_code(400);
    echo json_encode(["message" => "Record ID is required"]);
    exit;
  }

  $user = $_SESSION['user'];
  $role = $user['role'];

  /**
   * Doctors can only view their own records
   * Admin can view everything
   */
  $doctorCondition = "";
  // if ($role === "doctor") {
  //   $doctor_id = (int) $user['id'];
  //   $doctorCondition = "AND r.doctor_id = $doctor_id";
  // }

  $sql = "
    SELECT
    r.id,
    r.diagnosis,
    r.symptoms,
    r.treatment,
    r.prescription,
    r.notes,
    r.created_at,

    p.id AS patient_id,
    p.full_name AS patient_name,

    d.id AS doctor_id,
    u.id AS doctor_user_id,
    u.full_name AS doctor_name

  FROM patient_records r
  JOIN patients p ON r.patient_id = p.id
  JOIN doctors d ON r.doctor_id = d.id
  JOIN users u ON d.user_id = u.id

  WHERE r.id = $record_id
  $doctorCondition
  LIMIT 1
  ";

  $result = mysqli_query($conn, $sql);

  if (!$result || mysqli_num_rows($result) === 0) {
    http_response_code(404);
    echo json_encode(["message" => "Record not found"]);
    exit;
  }

  echo json_encode(mysqli_fetch_assoc($result));
?>