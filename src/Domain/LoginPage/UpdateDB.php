<?php

include_once '../src/Domain/Database.php';
// include '../src/Domain/LoginPage/signup_inc.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();


if (isset($_POST["submit"])){

    echo 'done verify';
    
    // session_start();

    // $alumniId = $_SESSION['alumniId'];
    // $approvedBy = $_SESSION["approvedBy"];
    // $email = $_SESSION["email"];
    // $Password = $_SESSION["Password"];
    // $IC = $_SESSION["IC"];
    // $gender = $_SESSION["gender"];
    // $name = $_SESSION["name"];
    // $department = $_SESSION["department"];
    // $Batch = $_SESSION["Batch"];
    // $imageId = $_SESSION["imageId"];
    // $isEmailPublic = $_SESSION["isEmailPublic"];
    // $biography = $_SESSION["biography"];
    
    // insertAlumni($conn,$GLOBALS['alumniId'],$GLOBALS['approvedBy'], $GLOBALS['email'], $GLOBALS['Password'], $GLOBALS['IC'], $GLOBALS['gender'], $GLOBALS['name'], $GLOBALS['department'], $GLOBALS['Batch'], $GLOBALS['imageId'], $GLOBALS['isEmailPublic'], $GLOBALS['biography']);
    // insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    verified($conn,$email);
    header("location: /login?signup");
    exit();
}



function verfied($conn,$email){
    $stmt = $conn->prepare("UPDATE alumni SET isVerified=1 WHERE email=:email");
    $stmt->bindParam(':email',$email);
    $stmt->execute();
}


