<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

if (isset($_POST['submit']) && isset($_POST['newPassword']) && isset($_POST['oldPassword'])) {
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    try {
        $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
        if (password_verify($_POST['oldPassword'], $alumni->getPassword())) {
            $alumni->changePassword($_POST['newPassword']);
            return header("Location: /myprofile?changepassword=success");
        }
    } catch (Exception $e) {
        // echo "Exception: " . $e->getMessage();
        error_log("Exception: " . $e->getMessage());
        include_once '../src/templates/header.php';
        include_once '../src/Domain/General_Pages/server_error.php';
        exit();
    }
}

header("Location: /myprofile?changepassword=fail");
