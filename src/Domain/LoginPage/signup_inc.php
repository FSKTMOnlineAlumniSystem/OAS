<?php

include '../src/Domain/Database.php';
include '../src/Domain/LoginPage/class.verifyEmail.php';
include '../src/utilities/uploadImage.php';

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
    $pic = "profilePicture";

   
    
    
    $verify = verify($email);
    if($verify){
        insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    }else{
        header("location: /login?emailFake");
        exit();
    }
    
    // insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);

    // header("location: LoginPage.php");
    exit();

}else{
    header("location: /login?error=submitfailed");
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

    try {
        //Upload image to database as blob
        if($_FILES["profilePicture"]['tmp_name']!=null){
            // echo $_FILES[$pic]['tmp_name'];
            uploadImage($conn,$_FILES["profilePicture"],$alumniId);
            
        }
        // $alumni = new MyProfile($db->getConnection(), $alumniId);
        // $alumni->setUpdatedData($email, $biography);
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }

    header("location: /login?signup=true");
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

function verify($email){
    $verifyE = new verifyEmail();
    $verifyE->setStreamTimeoutWait(20);
    $verifyE->Debug= TRUE;
    $verifyE->Debugoutput= 'html';

    $verifyE->setEmailFrom('webprog707@gmail.com');

    if ($verifyE->check($email)) {
        return true;
        // echo '<h1>email &lt;' . $email . '&gt; exist!</h1>';
    }else {
        return false;
        // echo '<h1>email &lt;' . $email . '&gt; not valid and not exist!</h1>';
    }
}

