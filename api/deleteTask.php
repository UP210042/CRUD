<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        try {
            $sql = "DELETE FROM task WHERE id = ?";
            $statement = $conn->prepare($sql);
            $statement->execute([$id]);
            
            if ($statement->rowCount() > 0) {
                echo json_encode(["success" => "Tarea eliminada correctamente"]);
            } else {
                echo json_encode(["error" => "No se pudo eliminar la tarea"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "ID de tarea no proporcionado"]);
    }
} else {
    echo json_encode(["error" => "La solicitud debe ser de tipo POST"]);
}
?>