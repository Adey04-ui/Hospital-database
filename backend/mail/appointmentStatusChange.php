<?php
require_once "../config/header.php";
require_once "../loadenv.php";
function sendMailViaService($payload) {
    $ch = curl_init('https://hospital-database-j5za.onrender.com/appointmentStatusChange.php');

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
        return json_encode([
            "success" => false,
            "message" => "Curl error: " . curl_error($ch)
        ]);
    }

    // Ensure we return valid JSON even if remote server fails
    $decoded = json_decode($res, true);
    if ($decoded === null) {
        return json_encode([
            "success" => false,
            "message" => "Invalid JSON from mail server",
            "raw" => $res
        ]);
    }

    return json_encode($decoded);
}
?>
