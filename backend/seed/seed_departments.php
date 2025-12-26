<?php
require_once "../config/db.php";

$departments = [
  ["Cardiology", "Heart-related treatments"],
  ["Neurology", "Brain and nervous system"],
  ["Pediatrics", "Children healthcare"],
  ["Orthopedics", "Bones and joints"],
  ["General Medicine", "General diagnosis"]
];

foreach ($departments as $dept) {
  $name = $dept[0];
  $desc = $dept[1];

  mysqli_query(
    $conn,
    "INSERT IGNORE INTO departments (name, description)
     VALUES ('$name', '$desc')"
  );
}

echo "Departments seeded";
