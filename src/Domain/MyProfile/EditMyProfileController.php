<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';
include '../src/utilities/uploadImage.php';

if (
    !isset($_POST['submit']) || !isset($_POST['email']) || !isset($_POST['biography'])
) {
    header("Location: /myprofile/edit");
    return;
}

$email = $_POST['email'];
$biography = $_POST['biography'];
$errorExist = false;
$errors = array();

// Check email format
if (!preg_match('/^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z]+$/i', $email)) {
    array_push($errors, 'Email Wrong Format:' . $email);
    $errorExist = true;
}

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
        uploadImage($db->getConnection(),$_FILES["profilePicture"],'AL-1');
    }
    $alumni = new MyProfile($db->getConnection(), 'AL-1');
    $alumni->setUpdatedData($email, $biography);
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}

header("Location: /myprofile?updated=true");
