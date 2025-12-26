<?php
  require_once "../middleware/auth.php";
  require_once "../config/db.php";
  require_once "../config/header.php";

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  if ($role === 'doctor') {
    $sql = "
    SELECT d.id, u.full_name, dep.name AS department, d.specialization
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
    WHERE u.id = $user_id
    ";
  } elseif (in_array($role, ['admin', 'receptionist'])) {
    $sql = "
    SELECT d.id, u.full_name, dep.name AS department, d.specialization
    FROM doctors d
    JOIN users u ON d.user_id = u.id
    JOIN departments dep ON d.department_id = dep.id
    ORDER BY u.full_name
    ";
  } else {
    http_response_code(403);
    echo json_encode(["message" => "Forbidden"]);
    exit;
  }

  $result = mysqli_query($conn, $sql);

  $doctors = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $doctors[] = $row;
  }

  echo json_encode($doctors);
?>