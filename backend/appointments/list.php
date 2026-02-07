<?php
require_once "../config/header.php";
require_once "../middleware/auth.php";
require_once "../config/db.php";

$role    = $_SESSION['user']['role'];
$user_id = (int) $_SESSION['user']['id'];

$day = $_GET['day'] ?? null;
$today = date('Y-m-d');

/**
 * DOCTOR: default → today
 */
if ($role === 'doctor' && $day == null) {

    $sql = "
        SELECT 
            a.id,
            a.appointment_date,
            a.status,
            p.id AS patient_id,
            p.full_name AS patient_name,
            p.email AS patient_email,
            u.full_name AS doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN users u ON d.user_id = u.id
        WHERE 
            d.user_id = $user_id
            AND DATE(a.appointment_date) = '$today'
        ORDER BY a.appointment_date ASC
    ";

}

/**
 * ADMIN / RECEPTIONIST: today only
 */
else if ($day === 'today') {

    $sql = "
        SELECT 
            a.id,
            a.appointment_date,
            a.status,
            p.id AS patient_id,
            p.full_name AS patient_name,
            p.email AS patient_email,
            u.full_name AS doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN users u ON d.user_id = u.id
        WHERE 
            DATE(a.appointment_date) = '$today'
        ORDER BY a.appointment_date DESC
    ";

}

/**
 * DOCTOR: all appointments
 */
else if ($role === 'doctor' && $day === 'all') {

    $sql = "
        SELECT 
            a.id,
            a.appointment_date,
            a.status,
            p.id AS patient_id,
            p.full_name AS patient_name,
            p.email AS patient_email,
            u.full_name AS doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        JOIN users u ON d.user_id = u.id
        WHERE 
            d.user_id = $user_id
        ORDER BY a.appointment_date ASC
    ";

}

/**
 * ADMIN / RECEPTIONIST: all appointments
 */
else {

    $sql = "
        SELECT 
            a.id,
            a.appointment_date,
            a.status,
            p.id AS patient_id,
            p.full_name AS patient_name,
            p.email AS patient_email,
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
