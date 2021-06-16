<?php

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
        
        return $stmt->execute();
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
}

?>