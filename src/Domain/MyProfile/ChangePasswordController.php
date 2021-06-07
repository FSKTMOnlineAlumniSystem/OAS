<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

if(isset($_POST['submit']) && isset($_POST['newPassword']) && isset($_POST['oldPassword'])){
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    
    try{
        $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
        if($_POST['oldPassword']==$alumni->getPassword()){
            $alumni->changePassword($_POST['newPassword']);
            return header("Location: /myprofile?updated=true");
        }
    }catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
    
}

header("Location: /myprofile?changepassword=fail");


