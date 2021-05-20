<?php

if(isset($_POST["submit"])){
    echo "it works";
    $firstname = $_POST["FirstNameID"];
    $lastname = $_POST["LastNameID"];
    $name = $firstname.' '.$lastname;
    $gender = $_POST["gender"];
    $Batch = $_POST["Batch"];
    $email = $_POST["email"];
    $IC = $_POST["IC"];
    $department = $_POST["department"];
    $Password = $_POST["Password"];

require_once './LoginPageModel.php';
require_once './LoginPage.php';

insertAlumni($conn,$name,$gender,$Batch,$email,$IC,$department,$Password);

// header("location: ../HomePage/HomePage.php");

}


function insertAlumni($conn,$name,$gender,$Batch,$email,$IC,$department,$Password){
    $sql = "INSERT INTO alumni(name,gender,graduated,email,icNumber,department,password) VALUES(?,?,?,?,?,?,?)";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        header("location: ../LoginPage.php?error=stmtfailed");
    }

    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt,"sssssss",$name,$gender,$Batch,$email,$IC,$department,$hashedPassword);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    header("location: ./HomePage.php");
    exit();

}
