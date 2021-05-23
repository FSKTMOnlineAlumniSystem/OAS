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

    $checkEmail = emailExists($conn,$email);
    if ($checkEmail) {
        header("location: ./LoginPage.php?emailExists");
        exit();
    }
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

    header("location: ./LoginPage.php?signup=true");
    exit();

}

function getLength($conn){
    $stmt = $conn->prepare("SELECT COUNT(*) FROM alumni");
    $stmt->execute();
    $data = $stmt->fetch();
    return $data["COUNT(*)"];
}

function emailExists($conn,$email){

    $stmt = $conn->prepare("SELECT * FROM alumni WHERE email=?");
    $stmt->execute(array($email));
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($row['email'] === $email) {
            //email exists
            return $row;
        }
    }
        //email not Exists
        return false;
}

