<?php

require_once "../config/header.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (getenv('DB_HOST') || getenv('MAIL_HOST')) {
    return;
}

$envPath = __DIR__ . '/../.env';

if (!file_exists($envPath)) {
    return;
}

$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

foreach ($lines as $line) {
    $line = trim($line);

    if ($line === '' || str_starts_with($line, '#')) {
        continue;
    }

    [$key, $value] = explode('=', $line, 2);

    putenv(trim($key) . '=' . trim($value));
}

$data = json_decode(file_get_contents("php://input"), true);

$mail = new PHPMailer(true);

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

try {
    // Server settings
    $mail->isSMTP();                                          
    $mail->Host       = getenv('MAIL_HOST');                     
    $mail->SMTPAuth   = true;                                
    $mail->Username   = getenv('MAIL_USER');              
    $mail->Password   = getenv('MAIL_PASS');  
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         
    $mail->Port       = 465;                                 

    // Recipients
    $mail->setFrom(get_browser('MAIL_USER'), 'Hospital name');
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
    echo json_encode(["message" => "Mail could not be sent"]);
    exit;
}
?>
