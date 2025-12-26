<?php
  require_once "../middleware/auth.php";
  require_once "../config/db.php";
  require_once "../config/header.php";

  $result = mysqli_query($conn, "SELECT id, name FROM departments");

  $departments = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $departments[] = $row;
  }

  echo json_encode($departments);
?>