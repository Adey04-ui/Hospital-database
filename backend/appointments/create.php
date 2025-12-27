<?php
require_once "../config/header.php";
require_once "../config/db.php";


// Read JSON body
$data = json_decode(file_get_contents("php://input"), true);

$patient_id = $data['patient_id'] ?? null;
$doctor_id = $data['doctor_id'] ?? null;
$appointment_date = $data['appointment_date'] ?? null;

// Basic validation
if (!$patient_id || !$doctor_id || !$appointment_date) {
  http_response_code(400);
  echo json_encode(["message" => "Missing required fields"]);
  exit;
}

// 1️⃣ Get doctor shift
$doctorQuery = "
  SELECT shift_start, shift_end
  FROM doctors
  WHERE id = '$doctor_id'
  LIMIT 1
";

$doctorResult = mysqli_query($conn, $doctorQuery);

if (mysqli_num_rows($doctorResult) === 0) {
  http_response_code(404);
  echo json_encode(["message" => "Doctor not found"]);
  exit;
}

$doctor = mysqli_fetch_assoc($doctorResult);

$window_start = $doctor['shift_start'];
$window_end = $doctor['shift_end'];

// 2️⃣ Insert appointment
$insertQuery = "
  INSERT INTO appointments (
    patient_id,
    doctor_id,
    appointment_date,
    window_start,
    window_end,
    status
  ) VALUES (
    '$patient_id',
    '$doctor_id',
    '$appointment_date',
    '$window_start',
    '$window_end',
    'scheduled'
  )
";

if (!mysqli_query($conn, $insertQuery)) {
  http_response_code(500);
  echo json_encode(["message" => "Failed to book appointment"]);
  exit;
}

// 3️⃣ Success response
echo json_encode([
  "message" => "Appointment booked successfully",
  "appointment" => [
    "date" => $appointment_date,
    "window" => "$window_start - $window_end"
  ]
]);
