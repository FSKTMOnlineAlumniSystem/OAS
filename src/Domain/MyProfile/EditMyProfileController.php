<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';
include '../src/utilities/uploadImage.php';

if (
    !isset($_POST['submit']) || !isset($_POST['biography'])
) {
    header("Location: /myprofile/edit");
    return;
}

$biography = $_POST['biography'];
$errorExist = false;
$errors = array();

//Check biography length
if (strlen($biography) == 0) {
    array_push($errors, 'Biography cannot be empty!');
    $errorExist = true;
}

if ($errorExist == true) {
    return header("Location: /myprofile/edit?error[]=$errors[0]" . ($errorExist[1] ? "&error[]=$errors[0]" : ""));
}

//Create database connection
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    //Upload image to database as blob
    if($_FILES["profilePicture"]['tmp_name']!=null){
        uploadImage($db->getConnection(),$_FILES["profilePicture"],$_SESSION["alumni"]['alumniId']);
    }
    $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
    $alumni->setUpdatedData($biography);
} catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
}

header("Location: /myprofile?updated=true");
