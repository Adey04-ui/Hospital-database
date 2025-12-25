<?php
  require_once "../config/db.php";

  $role = mysqli_query($conn, "SELECT id FROM roles WHERE name='admin'");
  $role_id = mysqli_fetch_assoc($role)['id'];

  $password = password_hash("admin123", PASSWORD_DEFAULT);

  $sql = "
  INSERT INTO users (role_id, full_name, email, password)
  VALUES ($role_id, 'System Admin', 'admin@hospital.com', '$password')
  ";

  if(mysqli_query($conn, $sql)) {
    echo "admin created";
  } else {
    echo mysqli_error($conn);
  }

?>