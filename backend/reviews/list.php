<?php
  require_once "../config/header.php";
  require_once "../config/db.php";

      $sql = "
      SELECT r.id, r.full_name, r.stars, r.message, r.created_at
      FROM reviews r
      ";

  $result = mysqli_query($conn, $sql);

  $reviews = [];
  while ($row = mysqli_fetch_assoc($result)) {
      $reviews[] = $row;
  }

  echo json_encode($reviews);
?>
