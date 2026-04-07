<?php
// appointmentMail.php

require_once "../config/header.php";
require_once "../loadenv.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid or missing JSON data"]);
    exit;
}

$recipientEmail = trim($data['email'] ?? '');
$recipientName  = trim($data['full_name'] ?? '');
$appointment_id = (int) ($data['appointment_id'] ?? 0);
$doctor_name    = trim($data['doctor_name'] ?? '');
$date           = trim($data['date'] ?? '');

if (empty($recipientEmail) || empty($recipientName) || $appointment_id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required mail data"]);
    exit;
}

// Build email body
$body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6'>

        <p style='color: #030390; font-weight: 500; font-size: 17px;'>Hospital Name</p>

        <p>Good day <strong>{$recipientName}</strong>,</p>

        <p>You have successfully been booked for an appointment with <strong>{$doctor_name}</strong> on <strong>{$date}</strong>.</p>

        <p><strong>Your appointment ID:</strong> {$appointment_id}</p>

        <p>Please keep this ID safe.</p>
        
        <p>Regards,<br>Hospital Name</p>
    </div>
";

$env = getenv("ENV") ?: "development";

$mail = new PHPMailer(true);

try {
    if ($env === "development") {
        // ==================== DEVELOPMENT: SMTP ====================
        $mail->isSMTP();
        $mail->Host       = getenv('MAIL_HOST');
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('MAIL_USER');
        $mail->Password   = getenv('MAIL_PASS');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom(getenv('MAIL_USER'), 'Hospital Name');
        $mail->addAddress($recipientEmail, $recipientName);

        $mail->isHTML(true);
        $mail->Subject = 'Appointment booked successfully';
        $mail->Body    = $body;

        $mail->send();

        // SUCCESS - Send response and STOP execution
        echo json_encode([
            "success" => true,
            "message" => "Mail successfully sent via SMTP",
            "appointment_id" => $appointment_id
        ]);
        exit;   // ← VERY IMPORTANT

    } 
    else {
        // ==================== PRODUCTION: Brevo API ====================
        $apiKey = getenv('BREVO_API_KEY');
        if (!$apiKey) {
            throw new Exception("Brevo API key not configured");
        }

        $payload = [
            'sender' => [
                'name'  => 'Hospital Name',
                'email' => getenv('MAIL_USER') ?: 'kehindeodukoyaade@gmail.com'
            ],
            'to' => [
                ['email' => $recipientEmail, 'name' => $recipientName]
            ],
            'subject'     => 'Appointment booked successfully',
            'htmlContent' => $body,
        ];

        $ch = curl_init('https://api.brevo.com/v3/smtp/email');
        curl_setopt_array($ch, [
            CURLOPT_HTTPHEADER => [
                'accept: application/json',
                'api-key: ' . $apiKey,
                'content-type: application/json'
            ],
            CURLOPT_POST       => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT    => 15,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            echo json_encode([
                "success" => true,
                "message" => "Mail successfully sent via Brevo",
                "appointment_id" => $appointment_id
            ]);
            exit;
        } else {
            throw new Exception("Brevo API failed with code: " . $httpCode);
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send email: " . $e->getMessage()
    ]);
    exit;
}
?>