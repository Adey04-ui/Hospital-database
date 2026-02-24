<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

  if ($id > 0) {
      $stmt = $conn->prepare("DELETE FROM reviews WHERE id = ?");
      $stmt->bind_param("i", $id);
      
      if ($stmt->execute()) {
          echo json_encode([
            "status" => "success",
            "message" => "Review has been deleted",
            "deleted_id" => $id
          ]);
      } else {
          http_response_code(500);
          echo json_encode(["message" => "Database error: Could not delete record"]);
      }
      $stmt->close();
  } else {
      http_response_code(400);
      echo json_encode(["message" => "Invalid ID provided"]);
  }
?>
