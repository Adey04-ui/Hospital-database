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

function validateNigerianPhone(string $phone): ?string
{
    $clean = preg_replace('/[^0-9+]/', '', trim($phone));

    if (str_starts_with($clean, '+234')) {
        $clean = '0' . substr($clean, 4);
    } elseif (str_starts_with($clean, '234')) {
        $clean = '0' . substr($clean, 3);
    }

    if (preg_match('/^0[7-9][0-9]{9}$/', $clean)) {
        return $clean;
    }

    return null; 
}

$name = trim($data['name'] ?? '');
$phone  = trim($data['phone'] ?? '');
$patient_id = (int) ($data['patient_id'] ?? 0);
$email    = trim($data['email'] ?? '');

$message    = trim($data['message'] ?? '');

$structuredMessage = nl2br($message);


if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid email address"]);
    exit;
}

$cleanPhone = validateNigerianPhone($phone);

if ($cleanPhone === null) {
    http_response_code(400);
    echo json_encode([
        "message" => "Invalid phone number. Please enter a valid Nigerian number (e.g., 08031234567 or +2348031234567)"
    ]);
    exit;
}

$phone = $cleanPhone;


$patientId = $patient_id > 0 ? $patient_id : 'none';


// Build email body
$body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6'>

        <p style='color: #030390; font-weight: 500; font-size: 17px;'>Hospital Name</p>

        <p>Name: {$name}</p>

        <p>Email: <a href='mailto:{$email}'>{$email}</a></p> 

        <p>Phone Number: {$phone}</p>

        <p>Patient Id: {$patientId}</p>

        <p>Message: </p>

        <div>{$structuredMessage}</div>
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
        $mail->addAddress(getenv('HOSPITAL_MAIL'), 'Hospital Name');

        $mail->isHTML(true);
        $mail->Subject = 'Contact Us Mail';
        $mail->Body    = $body;

        $mail->send();

        // SUCCESS - Send response and STOP execution
        echo json_encode([
            "success" => true,
            "message" => "Mail successfully sent via SMTP"
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
                ['email' => getenv('HOSPITAL_MAIL'), 'name' => 'Hospital Name']
            ],
            'subject'     => 'Contact Us Mail',
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
                "message" => "Mail successfully sent via Brevo"
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