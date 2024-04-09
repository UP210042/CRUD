<?php
include "./partials/Connection.php";

if(isset($_GET['id'])) {
    $idUser = $_GET['id'];

    try {
        $sql = "SELECT t.*, u.firstname FROM task t INNER JOIN user u ON u.id = t.idUser WHERE t.idUser = ?";
        $state = $conn->prepare($sql);
        $state->execute([$idUser]);

        $tasks = [];
        while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
            $tasks[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'completed' => $row['completed'],
                'idUser' => $row['idUser'],
                'firstname' => $row['firstname']
            ];
        }

        echo json_encode($tasks);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "User ID is missing"]);
}
?>
