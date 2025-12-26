<?php
require_once "../config/db.php";

$role = mysqli_query($conn, "SELECT id FROM roles WHERE name='doctor'");
$role_id = mysqli_fetch_assoc($role)['id'];

$depts = mysqli_query($conn, "SELECT id, name FROM departments");

while ($dept = mysqli_fetch_assoc($depts)) {
  $name = "Dr. " . $dept['name'];
  $email = strtolower(str_replace(' ', '', $dept['name'])) . "@hospital.com";
  $password = password_hash("doctor123", PASSWORD_DEFAULT);

  mysqli_query(
    $conn,
    "INSERT IGNORE INTO users (role_id, full_name, email, password)
     VALUES ($role_id, '$name', '$email', '$password')"
  );

  $user_id = mysqli_insert_id($conn);

  if ($user_id) {
    mysqli_query(
      $conn,
      "INSERT INTO doctors (user_id, department_id, specialization)
       VALUES ($user_id, {$dept['id']}, '{$dept['name']} Specialist')"
    );
  }
}

echo "Doctors seeded";
