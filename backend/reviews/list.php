<?php
  require_once "../config/header.php";
  require_once "../config/db.php";

  session_start();

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  if ($role === "admin") {
    $sql = "
    SELECT r.id, r.full_name, r.stars, r.message, r.created_at
    FROM reviews r
    ";
  } else {
    $sql = "
    SELECT r.id, r.full_name, r.stars, r.message, r.created_at
    FROM reviews r
    LIMIT 5
    ";
  } 

  $result = mysqli_query($conn, $sql);

  $reviews = [];
  while ($row = mysqli_fetch_assoc($result)) {
      $reviews[] = $row;
  }

  echo json_encode($reviews);
?>
