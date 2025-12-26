<?php
require_once "../config/header.php";
session_start();
session_destroy();

echo json_encode(["message" => "Logged out"]);
?>