<?php
include '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

if(!isset($_POST['email']) || !isset($_POST['biography'])){
    header("Location: /myprofile/edit");
    return;
}

$email = $_POST['email'];
$biography = $_POST['biography'];

// Check email format
if(!preg_match('/^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z]$/i',$email)){
    echo 'Email Wrong Format: ',$email;
}
//Check biography length


//Create database connection
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $alumni = new MyProfile($db->getConnection(), 'AL-1');
    $alumni->setUpdatedData($email,$biography);
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}

header("Location: /myprofile");


