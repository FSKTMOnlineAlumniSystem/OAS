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
    $alumniId = NULL;
    $approvedBy = NULL;
    $imageId = NULL;
    $isEmailPublic = NULL;
    $biography = NULL;

require_once './LoginPageModel.php';

insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);

// header("location: LoginPage.php");
exit();

}else{
    header("location: ../LoginPage.php?error=submitfailed");
}


function insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography){
    $sql = "INSERT INTO alumni (alumniId, approvedBy, email, password, icNumber, gender, name, department, graduated, imageId, isEmailPublic, biography) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        header("location: ../LoginPage.php?error=stmtfailed");
    }

    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt,"ssssssssssss",$alumniId, $approvedBy, $email, $hashedPassword, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    // header("location: ./LoginPage.php");
    header("location: ../LoginPage.php?error=donesubmit");
    exit();

}
