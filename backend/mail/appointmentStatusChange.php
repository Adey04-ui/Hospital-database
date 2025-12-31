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
$appointment_id = (int) ($data['appointment_id'] ?? 0);
$doctor_name = trim($data['doctor_name'] ??'');
$date = trim($data['date'] ??'');
$status = trim($data['status'] ??'');

if ($recipientEmail === '' || $recipientName === '' || $doctor_name === '') {
    http_response_code(400);
    echo json_encode(["message" => "recipient email or mail missing"]);
    exit;
  }

  $body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6'>
        <p style='color: #030390; font-weight: 500; font-size: 17px;'>Hospital name</p>
        <p>Good day <strong>{$recipientName}</strong>,</p>

        <p>
        Your appointment with {$doctor_name} at <strong>Hospital Name</strong> on {$date} has been {$status}.
        </p>

        <p>
        <strong>Your appointment ID:</strong> {$appointment_id}
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
    $mail->addReplyTo('support@hospital.com', 'Hospital Support');  

    // Content
    $mail->isHTML(true);                                  
    $mail->Subject = 'Appointment '.$status.' - Hospital Name';
    $mail->Body    = $body;

    $mail->send();
    echo json_encode([
        "message" => "Mail successfully sent",
        "status" => $status
    ]);
} catch (Exception $e) {
    http_response_code(403);
    echo json_encode(["message" => "Mail could not be sent: {$mail->ErrorInfo} {$_ENV['MAIL_HOST']}{$_ENV['MAIL_USER']}{$_ENV['MAIL_PASS']}"]);
    exit;
}
?>
