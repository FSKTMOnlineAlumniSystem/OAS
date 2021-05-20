<?php

// $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
// $connection = $db->getConnection();

// $filePath = $_GET['filePath'];
// $imageId = $_GET['imageId'];
// uploadImage($filePath,$imageId);
function uploadImage($connection, $image, $imageId)
{
    $imageType = $image["type"];
    $blob = file_get_contents($image["tmp_name"]);

    try {
        $sql = "REPLACE INTO image(imageId,type,imageData) VALUES(:imageId,:type,:blob)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':imageId', $imageId);
        $stmt->bindParam(':type', $imageType);
        $stmt->bindParam(':blob', $blob);
        // $stmt->bindParam(':data', $blob, PDO::PARAM_LOB);

        return $stmt->execute();
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
}

// C:/Users/Forge-15 1650/Documents/VisualCodeStudio/OnlineAlumniSystem/core/uploads/admin
// AD-1
