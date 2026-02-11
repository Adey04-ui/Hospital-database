<?php
$headers = array_change_key_case(getallheaders(), CASE_LOWER);

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (($headers['x-mail-key'] ?? '') !== getenv('MAIL_SERVICE_KEY')) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit;
}
