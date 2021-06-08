<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

if(isset($_POST['submit'])){
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    
    try{
        $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
        $alumni->deleteAccount();
        header("Location: /");
    }catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
    
}else{
    header("Location: /myprofile?delete=fail");
}