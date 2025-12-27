<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

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
    ORDER BY created_at DESC"
  );

  $patients = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $patients[] = $row;
  }

  echo json_encode($patients);
?>