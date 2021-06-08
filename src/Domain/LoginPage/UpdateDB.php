<?php

include '../src/Domain/Database.php';
// include '../src/Domain/LoginPage/signup_inc.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();


if (isset($_POST["submit"])){

    echo 'done verify';
    
    // session_start();

    $alumniId = $_SESSION['dataAlumni']['alumniId'];
    $approvedBy = $_SESSION['dataAlumni']["approvedBy"];
    $email = $_SESSION['dataAlumni']["email"];
    $Password = $_SESSION['dataAlumni']["Password"];
    $IC = $_SESSION['dataAlumni']["IC"];
    $gender = $_SESSION['dataAlumni']["gender"];
    $name = $_SESSION['dataAlumni']["name"];
    $department = $_SESSION['dataAlumni']["department"];
    $Batch = $_SESSION['dataAlumni']["Batch"];
    $imageId = $_SESSION['dataAlumni']["imageId"];
    $isEmailPublic = $_SESSION['dataAlumni']["isEmailPublic"];
    $biography = $_SESSION['dataAlumni']["biography"];
    
    // insertAlumni($conn,$GLOBALS['alumniId'],$GLOBALS['approvedBy'], $GLOBALS['email'], $GLOBALS['Password'], $GLOBALS['IC'], $GLOBALS['gender'], $GLOBALS['name'], $GLOBALS['department'], $GLOBALS['Batch'], $GLOBALS['imageId'], $GLOBALS['isEmailPublic'], $GLOBALS['biography']);
    insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    
    header("location: /login?signup");
    exit();
}

function insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography){
    $stmt = $conn->prepare("INSERT INTO alumni (alumniId, approvedBy, email, password, icNumber, gender, name, department, graduated, imageId, isEmailPublic, biography) VALUES(:alumniId, :approvedBy, :email, :password, :icNumber, :gender, :name, :department, :graduated, :imageId, :isEmailPublic, :biography)");

    $checkEmail = emailExists($conn,$email);
    if ($checkEmail) {
        header("location: /login?emailExists");
        exit();
    }

    $alumniId = "AL-" . getLength($conn)+1 ;
    $stmt->bindParam(":alumniId", $alumniId);

    $stmt->bindParam(":approvedBy", $approvedBy);
    $stmt->bindParam(":email", $email);

    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
    $stmt->bindParam(":password", $hashedPassword);
    
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

    // try {
    //     //Upload image to database as blob
    //     if($_FILES["profilePicture"]['tmp_name']!=null){
    //         // echo $_FILES[$pic]['tmp_name'];
    //         uploadImage($conn,$_FILES["profilePicture"],$alumniId);
            
    //     }
    //     // $alumni = new MyProfile($db->getConnection(), $alumniId);
    //     // $alumni->setUpdatedData($email, $biography);
    // } catch (Exception $e) {
    //     echo "Exception: " . $e->getMessage();
    // }



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
