<?php
require_once "../config/header.php";
require_once "../loadenv.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

function sendMailViaService($payload) {
    $ch = curl_init('https://hospital-database-j5za.onrender.com/appointmentMail.php');

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json",
            "X-Mail-Key: " . getenv('MAIL_SERVICE_KEY')
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_RETURNTRANSFER => true
    ]);

    $res = curl_exec($ch);

    if ($res === false) {
        return [
            "success" => false,
            "message" => "Curl error: " . curl_error($ch)
        ];
    }

    $decoded = json_decode($res, true);

    if ($decoded === null) {
        return [
            "success" => false,
            "message" => "Invalid JSON from mail server",
            "raw" => $res
        ];
    }

    return $decoded;
}

$result = sendMailViaService($input);

echo json_encode($result);
