<?php

include_once '../src/Domain/Database.php';
include_once '../src/Domain/LoginPage/GeneralLoginFx.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();
echo "hello";
if(isset($_POST["submit"])){

    $email = $_POST["email"];
    $password = $_POST["password"];

    loginUser($conn, $email, $password);
    
}


function loginUser($conn, $email, $password)
{
    $alumniData = emailExists($conn,$email);
    if($alumniData == false){
        header("location: /login?emailnotExists");
        exit();
    }
    if(adminApproved($conn,$email) == false){
        header("location: /login?NotApprovedYet");
        exit();
    }
    // $passwordNormal = $alumniData["password"];
    // $checkpassword = passwordCheck($password, $passwordNormal);

    $passwordHashed = $alumniData["password"];
    $checkpassword = password_verify($password, $passwordHashed);
    if ($checkpassword === false) {
        $_SESSION["CorrectEmail"] = $email;
        header("location: /login?passwordWrong");
        exit();
    } else if($checkpassword === true){
            unset($alumniData["password"]);
            unset($alumniData["icNumber"]);
            session_start();
            $_SESSION["alumni"] = $alumniData;
            unset($_SESSION_["admin"]);
            header("location: /home");
            exit();
    }
}

function passwordCheck($password, $passwordNormal)
{
    if ($password == $passwordNormal) {
        //password true
        return true;
    }elseif ($password != $passwordNormal) {
        //wrong password
        header("location: /login?password=false");
        return false;
    }
}
