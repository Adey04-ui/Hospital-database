<?php
  require_once "../config/header.php";

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
  }

  session_start();

  if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized"]);
    exit;
  }

  if ($_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["message" => "Forbidden"]);
    exit;
  }
?>