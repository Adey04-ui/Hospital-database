<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];


      $sql = "
      SELECT r.id, u.full_name
      FROM receptionists r
      JOIN users u ON r.user_id = u.id
      ";

  $result = mysqli_query($conn, $sql);

  $receptionists = [];
  while ($row = mysqli_fetch_assoc($result)) {
      $receptionists[] = $row;
  }

  echo json_encode($receptionists);
?>
