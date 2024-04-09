<?php
include "./partials/Connection.php";

if(isset($_GET['id'])) {
    $idTask = $_GET['id'];

    try {
        $sql = "DELETE FROM task WHERE id = ?";
        $state = $conn->prepare($sql);
        $state->execute([$idTask]);

        echo json_encode(["deleted_id" => $idTask]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Task ID is missing"]);
}
?>
