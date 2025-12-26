<?php
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  if ($role === 'doctor') {
      $sql = "
      SELECT a.id, a.appointment_date, a.status,
            p.full_name AS patient_name,
            d.user_id AS doctor_user_id
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE d.user_id = $user_id
      ORDER BY a.appointment_date DESC
      ";
  } else {
      $sql = "
      SELECT a.id, a.appointment_date, a.status,
            p.full_name AS patient_name,
            u.full_name AS doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      ORDER BY a.appointment_date DESC
      ";
  }

  $result = mysqli_query($conn, $sql);
  $appointments = [];
  while ($row = mysqli_fetch_assoc($result)) {
      $appointments[] = $row;
  }

  echo json_encode($appointments);
?>