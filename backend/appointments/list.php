<?php
require_once "../config/header.php";
require_once "../middleware/auth.php";
require_once "../config/db.php";

$role    = $_SESSION['user']['role'];
$user_id = (int) $_SESSION['user']['id'];
$day     = $_GET['day'] ?? 'all';

$today = date('Y-m-d');

$where = [];
$order = "ORDER BY a.appointment_date ASC";

/**
 * Doctor-specific restriction
 */
if ($role === 'doctor') {
    $where[] = "d.user_id = $user_id";
}

/**
 * Day filter
 */
if ($day === 'today') {
    $where[] = "DATE(a.appointment_date) = '$today'";
} elseif ($day === 'upcoming') {
    $where[] = "DATE(a.appointment_date) > '$today'";
} 

$whereSQL = '';
if (!empty($where)) {
    $whereSQL = 'WHERE ' . implode(' AND ', $where);
}

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
    $whereSQL
    $order
";

$result = mysqli_query($conn, $sql);

$appointments = [];
while ($row = mysqli_fetch_assoc($result)) {
    $appointments[] = $row;
}

echo json_encode($appointments);
