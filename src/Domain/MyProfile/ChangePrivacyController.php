<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
    if (isset($_POST['private'])) {
        $alumni->setIsEmailPublic(0);
        header("Location: /myprofile?private=true");
    } else {
        $alumni->setIsEmailPublic(1);
        header("Location: /myprofile?private=false");
    }
} catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
}



