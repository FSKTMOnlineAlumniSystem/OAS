<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/Admin-MyProfile/AdminModel.php';

if(isset($_POST['submit']) && isset($_POST['newPassword']) && isset($_POST['oldPassword'])){
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    
    try{
        $admin = new AdminMyProfile($db->getConnection(), $_SESSION['admin']['adminId']);
        if(password_verify($_POST['oldPassword'],$admin->getPassword())){
            $admin->changePassword($_POST['newPassword']);
            return header("Location: /adminprofile?updated=true");
        }
    }catch (Exception $e) {
        // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
    }
}

header("Location: /adminprofile?changepassword=fail");


