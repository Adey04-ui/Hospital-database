<?php
// patientWelcomeMail.php - Clean & Fixed Version

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
$patient_id     = (int) ($data['patient_id'] ?? 0);

if (empty($recipientEmail) || empty($recipientName) || $patient_id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "Recipient email, name or patient_id is missing"]);
    exit;
}

// Build clean HTML email body
$body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <p style='color: #030390; font-weight: 600; font-size: 18px;'>Hospital Name</p>
        <p>Welcome <strong>{$recipientName}</strong>,</p>

        <p>You have been successfully registered at <strong>Hospital Name</strong>.</p>
        
        <p><strong>Your Patient ID:</strong> {$patient_id}</p>

        <p>Please keep this ID safe, as it will be required for all hospital-related services.</p>

        <p>Regards,<br>
        Hospital Name Team</p>
    </div>
";

$env = getenv("ENV") ?: "development";

$mail = new PHPMailer(true);

try {
    if ($env === "development") {
        // ====================== DEVELOPMENT: SMTP ======================
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
        $mail->Subject = 'Welcome to Hospital Name - Your Patient Registration';
        $mail->Body    = $body;

        $mail->send();

        // SUCCESS RESPONSE
        echo json_encode([
            "success"    => true,
            "message"    => "Welcome mail successfully sent via SMTP",
            "patient_id" => $patient_id
        ]);
        exit;

    } 
    else {
        // ====================== PRODUCTION: Brevo API ======================
        $apiKey = getenv('BREVO_API_KEY');
        if (empty($apiKey)) {
            throw new Exception("Brevo API key is not configured");
        }

        $payload = [
            'sender' => [
                'name'  => 'Hospital Name',
                'email' => getenv('MAIL_USER') ?: 'kehindeodukoyaade@gmail.com'
            ],
            'to' => [
                ['email' => $recipientEmail, 'name' => $recipientName]
            ],
            'subject'     => 'Welcome to Hospital Name - Your Patient Registration',
            'htmlContent' => $body,
        ];

        $ch = curl_init('https://api.brevo.com/v3/smtp/email');
        curl_setopt_array($ch, [
            CURLOPT_HTTPHEADER => [
                'accept: application/json',
                'api-key: ' . $apiKey,
                'content-type: application/json'
            ],
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => json_encode($payload),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 15,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($httpCode >= 200 && $httpCode < 300) {
            echo json_encode([
                "success"    => true,
                "message"    => "Welcome mail successfully sent via Brevo",
                "patient_id" => $patient_id
            ]);
            exit;
        } else {
            throw new Exception("Brevo API returned HTTP $httpCode");
        }
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send welcome email: " . $e->getMessage()
    ]);
    exit;
}
?>