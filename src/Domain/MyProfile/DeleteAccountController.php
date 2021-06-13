<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

if (isset($_POST['submit'])) {
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

    try {
        $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
        if (password_verify($_POST['deletePassword'], $alumni->getPassword())) {
            $alumni->deleteAccount();
            session_destroy();
            header("Location: /login");
            exit;
        }
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
}

header("Location: /myprofile?delete=fail");
