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
$appointment_id = (int) ($data['appointment_id'] ?? 0);
$doctor_name = trim($data['doctor_name'] ??'');
$date = trim($data['date'] ??'');

if ($recipientEmail === '' || $recipientName === '' || $appointment_id === 0) {
    http_response_code(400);
    echo json_encode(["message" => "missing required mail data"]);
    exit;
  }

  $body = "
    <div style='font-family: Arial, sans-serif; line-height: 1.6'>
        <p style='color: #030390; font-weight: 500; font-size: 17px;'>Hospital name</p>
        <p>Good day <strong>{$recipientName}</strong>,</p>

        <p>
        You have successfully been booked for an appointment with {$doctor_name} at <strong>Hospital Name</strong> on {$date}.
        </p>

        <p>
        <strong>Your appointment ID:</strong> {$appointment_id}
        </p>

        <p>
        Please keep this ID safe, as it will be required for you to be attended to.
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
    $mail->Subject = 'Appointment booked successfully';
    $mail->Body    = $body;

    $mail->send();
    echo json_encode([
        "message" => "Mail successfully sent",
        "appointment_id" => $appointment_id
    ]);
} catch (Exception $e) {
    http_response_code(403);
    echo json_encode(["message" => "Mail could not be sent: {$mail->ErrorInfo}"]);
    exit;
}
?>
