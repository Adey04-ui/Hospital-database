<?php
require_once "../config/db.php";

$roles = ['admin', 'doctor', 'nurse', 'receptionist'];

foreach ($roles as $role) {
  mysqli_query(
    $conn,
    "INSERT IGNORE INTO roles (name) VALUES ('$role')"
  );
}

echo "Roles seeded";
