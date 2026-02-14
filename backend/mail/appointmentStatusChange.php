<?php
require_once "../config/header.php";
require_once "../loadenv.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header("Content-Type: application/json");

$env = getenv("ENV");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid or missing JSON data"]);
    exit;
}

$recipientEmail = trim($data['email'] ?? '');
$recipientName = trim($data['full_name'] ??'');
$appointment_id = (int) ($data['appointment_id'] ?? 0);
$doctor_name = trim($data['doctor_name'] ??'');
$date = trim($data['date'] ??'');
$status = trim($data['status'] ??'');
$prescription = htmlspecialchars(trim($data['prescription'] ?? ''), ENT_QUOTES, 'UTF-8');

if ($recipientEmail === '' || $recipientName === '' || $doctor_name === '') {
    http_response_code(400);
    echo json_encode(["message" => "Required email data missing"]);
    exit;
}

$prescriptioncondition = $prescription ? '<div> '.nl2br($prescription).' </div>' : '';

$body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6'>
        <p style='color: #030390; font-weight: 500; font-size: 17px;'>Hospital name</p>
        <p>Good day <strong>{$recipientName}</strong>,</p>

        <p>
        Your appointment with {$doctor_name} at <strong>Hospital Name</strong> on {$date} has been {$status}.
        </p>
        <p>Prescriptions: </p>
        ".$prescriptioncondition."
        <p>
        <strong>Your appointment ID:</strong> {$appointment_id}
        </p>

        <p>
        Regards,<br>
        Hospital Name
        </p>
    </div>
    ";

$mail = new PHPMailer(true);
if($env == "development") {
    try {
        // ── SMTP Settings ────────────────────────────────────────
        $mail->isSMTP();
        $mail->Host       = getenv('MAIL_HOST');
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('MAIL_USER');
        $mail->Password   = getenv('MAIL_PASS');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom(getenv('MAIL_USER'), 'Hospital Name');
        $mail->addAddress($recipientEmail, $recipientName);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Appointment '.$status.' - Hospital Name';
        $mail->Body    = $body;

        $mail->send();

        // Success via SMTP (local dev)
        echo json_encode([
            "message"     => "Mail successfully sent via SMTP",
            "appointment_id"  => $appointment_id
        ]);

    } catch (Exception $e) {
        $errorMsg = $mail->ErrorInfo;
    }
}

    if ($env == "production") {
        // ── Fallback: Brevo API ─────────────────────────────────
        $apiKey = getenv('BREVO_API_KEY');
        if (!$apiKey) {
            http_response_code(500);
            echo json_encode(["message" => "Brevo API key not configured"]);
            exit;
        }

        $payload = [
            'sender' => [
                'name'  => 'Hospital Name',
                'email' => getenv('MAIL_USER') ?: 'kehindeodukoyaade@gmail.com' 
            ],
            'to' => [
                ['email' => $recipientEmail, 'name' => $recipientName]
            ],
            'subject'     => 'Appointment '.$status.' - Hospital Name',
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
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            echo json_encode([
                "message"    => "Mail successfully sent via Brevo API (SMTP fallback)",
                "appointment_id" => $appointment_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "message" => "Brevo fallback failed (HTTP $httpCode): " . ($response ?: $curlError)
            ]);
        }
    } else {
        // Non-connection SMTP error (bad creds, invalid email, etc.) → don't fallback
        http_response_code(500);
        echo json_encode([
            "message" => "Mail could not be sent via SMTP: " . $errorMsg
        ]);
    }

?>