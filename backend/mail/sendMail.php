<?php

require_once "../config/header.php";
require_once "../loadenv.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

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
        <p style='color: #030390; font-weight: 500; font-size: 17px;'>Hospital name</p>
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
    $mail->Host       = getenv('MAIL_HOST');                     
    $mail->SMTPAuth   = true;                                
    $mail->Username   = getenv('MAIL_USER');              
    $mail->Password   = getenv('MAIL_PASS');  
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         
    $mail->Port       = 465;                                 

    // Recipients
    $mail->setFrom(getenv('MAIL_USER'), 'Hospital name');
    $mail->addAddress("$recipientEmail", "$recipientName");     

    // Content
    $mail->isHTML(true);                                  
    $mail->Subject = 'Hospital Name';
    $mail->Body    = $body;

    $mail->send();
    echo json_encode([
        "message" => "Mail successfully sent",
        "patient_id" => $patient_id
    ]);
} catch (Exception $e) {
    http_response_code(403);
    echo json_encode(["message" => "Mail could not be sent: {$mail->ErrorInfo} {$_ENV['MAIL_HOST']}{$_ENV['MAIL_USER']}{$_ENV['MAIL_PASS']}"]);
    exit;
}
?>
