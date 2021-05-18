<?php
include './Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$connection = $db->getConnection();

$filePath = $_GET['filePath'];
$imageId = $_GET['imageId'];
uploadImage($filePath,$imageId);
function uploadImage($filePath, $imageId)
{
    $connection = $GLOBALS['connection'];
    try {
        $blob = fopen($filePath, 'rb');
        $sql = "INSERT INTO image(imageId,data) VALUES(:imageId,:data)";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':imageId', $imageId);
        $stmt->bindParam(':data', $blob, PDO::PARAM_LOB);

        return $stmt->execute();
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
}

// C:/Users/Forge-15 1650/Documents/VisualCodeStudio/OnlineAlumniSystem/core/uploads/admin
// AD-1

