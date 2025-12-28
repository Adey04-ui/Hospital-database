<?php

require_once "../config/header.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$envPath = __DIR__ . "/../.env";

if (!file_exists($envPath)) {
  die(".env file not found");
}

$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($lines as $line) {
  if (str_starts_with(trim($line), '#')) continue;

  [$key, $value] = explode('=', $line, 2);
  $_ENV[trim($key)] = trim($value);
}

$data = json_decode(file_get_contents("php://input"), true);

$mail = new PHPMailer(true);

$recipientEmail = trim($data['email'] ?? '');
$recipientName = trim($data['full_name'] ??'');
$patient_id = (int) ($data['patient_id'] ?? 0);

if ($recipientEmail === '' || $recipientName === '' || $patient_id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "recipient email or mail missing"]);
    exit;
  }

  $body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6'>
        <p>Welcome <strong>{$recipientName}</strong>,</p>

        <p>
        You have been successfully registered at <strong>Hospital Name</strong>.
        </p>

        <p>
        <strong>Your Patient ID:</strong> {$patient_id}
        </p>

        <p>
        Please keep this ID safe, as it will be required for all hospital-related services.
        </p>

        <p>
        Regards,<br>
        Hospital Name
        </p>
    </div>
    ";

try {
    // Server settings
    $mail->isSMTP();                                          
    $mail->Host       = $_ENV['MAIL_HOST'];                     
    $mail->SMTPAuth   = true;                                
    $mail->Username   = $_ENV['MAIL_USER'];              
    $mail->Password   = $_ENV['MAIL_PASS'];  
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         
    $mail->Port       = 465;                                 

    // Recipients
    $mail->setFrom($_ENV['MAIL_USER'], 'Hospital name');
    $mail->addAddress("$recipientEmail", "$recipientName");     

    // Content
    $mail->isHTML(true);                                  
    $mail->Subject = 'Test Email from PHPMailer, patient created';
    $mail->Body    = $body;

    $mail->send();
    echo json_encode([
        "message" => "Mail successfully sent",
        "patient_id" => $patient_id
    ]);
} catch (Exception $e) {
    http_response_code(403);
    echo json_encode(["message" => "Mail could not be sent: {$mail->ErrorInfo}"]);
    exit;
}
?>
