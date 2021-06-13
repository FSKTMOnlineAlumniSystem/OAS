<?php

include_once '../src/Domain/Database.php';



$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();

if(isset($_POST["submit"])){

    $email = $_POST["email"];
    $password = $_POST["password"];

    loginUser($conn, $email, $password);

}



function loginUser($conn, $email, $password)
{

    $adminData = emailExists($conn,$email);
    if($adminData == false){
        header("location: /admin-login?emailnotExists");
        exit();
    }

    // $passwordNormal = $alumniData["password"];
    // $checkpassword = passwordCheck($password, $passwordNormal);

    $passwordHashed = $adminData["password"];
    $checkpassword = password_verify($password, $passwordHashed);

    if ($checkpassword === false) {
       
        header("location: /admin-login?passwordWrong");
        exit();

    } else if($checkpassword === true){

            unset($adminData["password"]);
            unset($adminData["icNumber"]);
            session_start();
            $_SESSION["admin"] = $adminData;
            unset($_SESSION["alumni"]);
            header("location: /admin");
            exit();
        
    }

}


function emailExists($conn,$email)
{

    $stmt = $conn->prepare("SELECT * FROM admin WHERE email=?");
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

function passwordCheck($password, $passwordNormal)
{
    if ($password == $passwordNormal) {
        return true;
    }elseif ($password != $passwordNormal) {
        //wrong password
        header("location: /admin-login?password=false");
        return false;
    }
}


