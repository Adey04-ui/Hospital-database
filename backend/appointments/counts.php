<?php
  require_once "../config/header.php";
  require_once "../middleware/auth.php";
  require_once "../config/db.php";

  $for = $_GET['for'] ?? null;

  $today = date('Y-m-d');

  if ($for === 'admin') {

    $sql = "
      SELECT
        (SELECT COUNT(*) FROM appointments)     AS total_appointments,
        (SELECT COUNT(*) FROM patients)         AS total_patients,
        (SELECT COUNT(*) FROM receptionists)    AS total_receptionists,
        (SELECT COUNT(*) FROM doctors)          AS total_doctors
    ";

    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    echo json_encode($row);
  }


  if ($for === 'doctor') {

    $doctorUserId = (int) $_SESSION['user']['id'];
    $today = date('Y-m-d');

    $sql = "
      SELECT
        (SELECT COUNT(*) 
        FROM appointments 
        WHERE status = 'completed' 
          AND doctor_id = (SELECT id FROM doctors WHERE user_id = $doctorUserId)
        ) AS completed_appointments,

        (SELECT COUNT(*) 
        FROM appointments 
        WHERE status = 'cancelled' 
          AND doctor_id = (SELECT id FROM doctors WHERE user_id = $doctorUserId)
        ) AS cancelled_appointments,

        (SELECT COUNT(*) 
        FROM appointments 
        WHERE doctor_id = (SELECT id FROM doctors WHERE user_id = $doctorUserId)
          AND DATE(appointment_date) = '$today'
          AND status = 'scheduled'
        ) AS today_appointments,

        (SELECT COUNT(*) 
        FROM appointments 
        WHERE doctor_id = (SELECT id FROM doctors WHERE user_id = $doctorUserId)
          AND DATE(appointment_date) > '$today'
        ) AS upcoming_appointments
    ";

    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);

    echo json_encode($row);
  }
?>