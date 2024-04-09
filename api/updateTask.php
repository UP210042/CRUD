<?php
include "./partials/Connection.php"; 

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["task_id"]) && isset($_POST["title"]) && isset($_POST["description"])) {
  $task_id = $_POST["task_id"];
  $title = $_POST["title"];
  $description = $_POST["description"];

  try {
    $stmt = $conn->prepare("UPDATE task SET title = :title, description = :description WHERE id = :task_id");

    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':task_id', $task_id);

    $stmt->execute();

    echo json_encode(["message" => "Task updated successfully"]);
  } catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
  }
} else {
  echo json_encode(["error" => "Incomplete data provided"]);
}
?>
