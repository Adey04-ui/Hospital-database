<?php
  require_once "../config/db.php";
  require_once "../config/header.php";

  $departmentId = $_GET['department_id'] ?? null;

  if (!$departmentId) {
    http_response_code(400);
    echo json_encode(["message" => "Department ID required"]);
    exit;
  }

  $departmentId = mysqli_real_escape_string($conn, $departmentId);

  $query = "
    SELECT 
      doctors.id AS doctor_id,
      users.full_name,
      doctors.shift_start,
      doctors.shift_end
    FROM doctors
    JOIN users ON doctors.user_id = users.id
    WHERE doctors.department_id = '$departmentId'
  ";

  $result = mysqli_query($conn, $query);

  if (!$result) {
    http_response_code(500);
    echo json_encode(["message" => "Database query failed"]);
    exit;
  }

  $doctors = [];

  while ($row = mysqli_fetch_assoc($result)) {
    $doctors[] = $row;
  }

  echo json_encode($doctors);
?>