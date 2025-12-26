<?php
  require_once "/auth.php";
  require_once "../config/header.php";

  $role = $_SESSION['user']['role'];

  if (!in_array($role, ['admin', 'receptionist'])) {
    http_response_code(403);
    echo json_encode(["message" => "Forbidden"]);
    exit;
  }
?>