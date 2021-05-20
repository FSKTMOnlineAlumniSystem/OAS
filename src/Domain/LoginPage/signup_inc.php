<?php

include '../../../config/config.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();



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
    $alumniId = "";
    $approvedBy = "";
    $imageId = "";
    $isEmailPublic = "";
    $biography = "";

// require_once './LoginPageModel.php';

insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);

// header("location: LoginPage.php");
exit();

}else{
    header("location: ../LoginPage.php?error=submitfailed");
}


function insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography){
    $stmt = $conn->prepare("INSERT INTO alumni (alumniId, approvedBy, email, password, icNumber, gender, name, department, graduated, imageId, isEmailPublic, biography) VALUES(:alumniId, :approvedBy, :email, :password, :icNumber, :gender, :name, :department, :graduated, :imageId, :isEmailPublic, :biography)");
    
   

    $alumniId = "AL-" . getLength($conn)+1 ;
    $stmt->bindParam(":alumniId", $alumniId);

    $stmt->bindParam(":approvedBy", $approvedBy);
    $stmt->bindParam(":email", $email);

    // $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
    // $stmt->bindParam(":password", $hashedPassword);
    
    $stmt->bindParam(":password", $Password);

    $stmt->bindParam(":icNumber", $IC);
    $stmt->bindParam(":gender", $gender);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":department", $department);
    $stmt->bindParam(":graduated", $Batch);
    $stmt->bindParam(":imageId", $imageId);
    $stmt->bindParam(":isEmailPublic", $isEmailPublic);
    $stmt->bindParam(":biography", $biography);
    $stmt->execute();
    // $stmt->close();

    // $sql = "INSERT INTO alumni (alumniId, approvedBy, email, password, icNumber, gender, name, department, graduated, imageId, isEmailPublic, biography) VALUES(:alumniId, :approvedBy, :email, :password, :icNumber, :gender, :name, :department, :graduated, :imageId, :isEmailPublic, :biography);";
    // $stmt = mysqli_stmt_init($conn);
    // if (!mysqli_stmt_prepare($stmt,$sql)) {
    //     header("location: ../LoginPage.php?error=stmtfailed");
    // }

    // $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

    // mysqli_stmt_bind_param($stmt,"ssssssssssss",$alumniId, $approvedBy, $email, $hashedPassword, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    // mysqli_stmt_execute($stmt);
    // mysqli_stmt_close($stmt);

    // header("location: ./LoginPage.php");
    // header("location: ../LoginPage.php?error=donesubmit");
    header("location: ../LoginPage.php?signup=true");
    exit();

}

function getLength($conn){
    $stmt = $conn->prepare("SELECT COUNT(*) FROM alumni");
    $stmt->execute();
    $data = $stmt->fetch();
    return $data["COUNT(*)"];
}

