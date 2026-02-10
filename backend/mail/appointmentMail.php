<?php
require_once "../config/header.php";
require_once "../loadenv.php";
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
    curl_close($ch);

    return $res;
}
?>
