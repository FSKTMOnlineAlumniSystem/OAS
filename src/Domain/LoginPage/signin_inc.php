<?php

include '../../../config/config.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();

if(isset($_POST["submit"])){

    $email = $_POST["email"];
    $password = $_POST["password"];

    // require_once 'LoginPageModel.php';

    loginUser($conn, $email, $password);

}else{
    header("location: ../LoginPage.php?error=loginfailed");
}


function loginUser($conn, $email, $password){

    $alumniData = emailExists($conn,$email);
    if($alumniData == false){
        header("location: ./LoginPage.php?error=emailnotExists");
        exit();
    }
    // else{
    //     header("location: ./LoginPage.php?error=emailExists");
    //     exit();
    // }

    $passwordNormal = $alumniData["password"];
    $checkpassword = passwordCheck($password, $passwordNormal);

    // $passwordHashed = $emailExists["password"];
    // $checkpassword = password_verify($password, $passwordHashed);

    if ($checkpassword === false) {
       
        header("location: ./LoginPage.php?error=passwordWrong");
        exit();

    } else if($checkpassword === true){
        
        unset($alumniData["password"]);
        unset($alumniData["icNumber"]);
        session_start();
        $_SESSION["alumniData"] = $alumniData;
        $_SESSION["alumniID"] = $alumniData;
        header("location: ../HomePage/HomePage.php");
        exit();
    }

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

function passwordCheck($password, $passwordNormal){
    if ($password == $passwordNormal) {
        //password true
        // header("location: ./LoginPage.php?password=true");
        return true;
    }elseif ($password != $passwordNormal) {
        //wrong password
        header("location: ./LoginPage.php?password=false");
        return false;
    }
}



