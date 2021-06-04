<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/Admin-MyProfile/AdminModel.php';
include '../src/utilities/uploadImage.php';

if (
    !isset($_POST['submit']) || !isset($_POST['username']) || !isset($_POST['email'])
) {
    header("Location: /adminprofile/edit");
    return;
}

$username = $_POST['username'];
$email = $_POST['email'];
$errorExist = false;
$errors = array();

// Check email format
if (!preg_match('/^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z]+$/i', $email)) {
    array_push($errors, 'Email Wrong Format:' . $email);
    $errorExist = true;
}

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
    $admin = new AdminMyProfile($db->getConnection(), 'AD-1');
    $admin->setUpdatedData($username, $email);
    //Upload image to database as blob
    if($_FILES["profilePicture"]['tmp_name']!=null){
        uploadImage($db->getConnection(),$_FILES["profilePicture"],$admin->getAdminId());
    }
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}

header("Location: /adminprofile?updated=true");
