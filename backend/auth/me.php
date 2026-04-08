<?php
require_once "../config/header.php";
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // MUST be 200
    exit;
}
session_start();

if (!isset($_SESSION['user'])) {
  http_response_code(401);
  echo json_encode([
    "message" => "Not authenticated"
  ]);
  exit;
}

echo json_encode([
  "user" => $_SESSION['user']
]);
