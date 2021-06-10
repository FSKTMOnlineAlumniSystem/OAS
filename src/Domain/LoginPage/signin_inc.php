<?php

include_once '../src/Domain/Database.php';
include_once '../src/Domain/LoginPage/GeneralLoginFx.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();
echo "hello";
if(isset($_POST["submit"])){

    $email = $_POST["email"];
    $password = $_POST["password"];

    if(adminApproved($conn,$email)){
        loginUser($conn, $email, $password);
    }else{
        header("location: /login?NotApprovedYet");
        exit();
    }
}


function loginUser($conn, $email, $password){
    $alumniData = emailExists($conn,$email);
    if($alumniData == false){
        header("location: /login?emailnotExists");
        exit();
    }
    // $passwordNormal = $alumniData["password"];
    // $checkpassword = passwordCheck($password, $passwordNormal);
    $passwordHashed = $alumniData["password"];
    $checkpassword = password_verify($password, $passwordHashed);
    if ($checkpassword === false) {
        header("location: /login?passwordWrong");
        exit();
    } else if($checkpassword === true){
            unset($alumniData["password"]);
            unset($alumniData["icNumber"]);
            session_start();
            $_SESSION["alumni"] = $alumniData;
            header("location: /home");
            exit();
    }
}

function passwordCheck($password, $passwordNormal){
    if ($password == $passwordNormal) {
        //password true
        return true;
    }elseif ($password != $passwordNormal) {
        //wrong password
        header("location: /login?password=false");
        return false;
    }
}


function adminApproved($conn,$email){
    $stmt = $conn->prepare('SELECT * FROM alumni WHERE email=:email AND approvedBy!=""');
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    $data = $stmt->fetchAll();
    if(!$data){
        return false;
    }else{
        return true;
    }
}


