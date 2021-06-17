<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/Admin-MyProfile/AdminModel.php';
include '../src/utilities/uploadImage.php';

if (
    !isset($_POST['submit']) || !isset($_POST['username']) 
) {
    header("Location: /adminprofile/edit");
    return;
}

$username = $_POST['username'];
$errorExist = false;
$errors = array();

//Check biography length
if (strlen($username) < 5) {
    array_push($errors, 'Username must contains at least 5 characters');
    $errorExist = true;
}

if ($errorExist == true) {
    return header("Location: /myprofile/edit?error[]=$errors[0]" . ($errorExist[1] ? "&error[]=$errors[0]" : ""));
}

//Create database connection
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $admin = new AdminMyProfile($db->getConnection(), $_SESSION['admin']['adminId']);
    $admin->setUpdatedData($username);
    //Upload image to database as blob
    if($_FILES["profilePicture"]['tmp_name']!=null){
        uploadImage($db->getConnection(),$_FILES["profilePicture"],$admin->getAdminId());
    }
} catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
}

header("Location: /adminprofile?updated=true");
