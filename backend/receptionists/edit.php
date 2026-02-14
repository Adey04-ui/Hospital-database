<?php
  require_once "../config/header.php";
  require_once "../middleware/admin_only.php";
  require_once "../config/db.php";

  $role = $_SESSION['user']['role'];
  $user_id = $_SESSION['user']['id'];

  $data = json_decode(file_get_contents("php://input"), true);

  $type = $_SERVER['REQUEST_METHOD'];

  $receptionist_id = $_GET['id'] ?? 0;
  if ($receptionist_id == 0) {
    http_response_code(400);
    echo json_encode(["message" => "receptionist ID is required"]);
    exit;
  }

  if ($type == "GET") {
      $sql = "
      SELECT r.id, u.full_name, u.email, u.phone, r.user_id
      FROM receptionists r
      JOIN users u ON r.user_id = u.id
      WHERE r.id=$receptionist_id
      ";

  $result = mysqli_query($conn, $sql);

  while ($row = mysqli_fetch_assoc($result)) {
      $receptionist = $row;
    if ($receptionist) {
        echo json_encode($receptionist);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Receptionist not found"]);
    }
  }
  } elseif ($type == "POST" || $type == "PUT") {  

    $full_name      = trim($data['full_name'] ?? '');
    $email          = trim($data['email'] ?? '');
    $phone          = $data['phone'] ?? '';
    $password       = $data['password'] ?? '';
    $receptionist_user_id = (int) ($data['receptionist_user_id'] ?? 0);


      $pass = "";
      if (trim($password) !== "") {
          $hashed = password_hash($password, PASSWORD_DEFAULT);
          $pass = ", password = '$hashed'";
      }

      $check = mysqli_query($conn, "SELECT 1 FROM receptionists WHERE id = $receptionist_id");
      if (mysqli_num_rows($check) === 0) {
          http_response_code(404);
          echo json_encode(["message" => "Receptionist not found"]);
          exit;
      }

      $sql = "
      UPDATE users 
      SET full_name = '$full_name', 
          email = '$email',
          phone = '$phone'" . $pass . "
      WHERE id = $receptionist_user_id
      ";

      if (!mysqli_query($conn, $sql)) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to update user table: " . mysqli_error($conn)]);
        exit;
      }

      echo json_encode([
          "message" => "receptionist updated successfully",
          "receptionist_id" => $receptionist_id
      ]);
  } else {
      http_response_code(403);
      echo json_encode(["message" => "Forbidden"]);
      exit;
  }


?>
