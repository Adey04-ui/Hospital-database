<?php
  require_once "../loadenv.php";
  $conn = mysqli_connect(getenv("DB_HOST"),getenv("DB_USER"),getenv("DB_PASS"), getenv("DB_NAME"), getenv("DB_PORT" ?: 3306));

  if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
  }
?>