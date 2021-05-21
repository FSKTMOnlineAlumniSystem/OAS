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
    $emailExists = emailExists($conn, $email, $password);

    if($emailExists == false){
        header("location: ../LoginPage.php?error=emailnotExists");
        exit();
    }

    $passwordHashed = $emailExists["password"];
    $checkpassword = password_verify($password, $passwordHashed);

    if ($checkpassword === false) {
        header("location: ../LoginPage.php?error=passwordWrong");
        exit();
    } else if($checkpassword === true){
        $alumniId = getID($conn,$email);
        session_start();
        $_SESSION["alumni"] = $emailExists;
        header("location: ../HomePage/HomePage.php");
        exit();
    }

}


function getID($conn,$email){
    $stmt = $conn->prepare("SELECT * FROM `alumni` WHERE email= $email"); 
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    $getId = $data["alumniId"];
    echo $getId;
    return $getId;
}




function emailExists($conn, $email){
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM `alumni` WHERE email= :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute(array($email));

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $email_count = $row["count"];

        if ($username_count > 0) {
            //emailexists
            return $row;
        }
    }

    if ($username_count == 0) {
        //emailnotExists
    return false;
    }


    // $sql = "SELECT * FROM alumni WHERE email = ?;";
    // $stmt = mysqli_stmt_init($conn);
    // if(!mysqli_stmt_prepare($stmt,$sql)){
    //     header("location: ../LoginPage.php?error=stmtfailed");
    //     exit();
    // }

    // mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    // mysqli_stmt_execute($stmt);

    // $resultData = mysqli_stmt_get_result($stmt);

    // if($row = mysqli_fetch_assoc($resultData)){
    //     return $row;
    // } else{
    //     $result = false;
    //     return $result;
    // }

    // mysqli_stmt_close($stmt);

}

