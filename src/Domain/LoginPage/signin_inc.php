<?php

include '../src/Domain/Database.php';



$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();

if(isset($_POST["submit"])){

    $email = $_POST["email"];
    $password = $_POST["password"];

    // require_once 'LoginPageModel.php';

    loginUser($conn, $email, $password);

}else{
    header("location: /home");
}


function loginUser($conn, $email, $password){

    $alumniData = emailExists($conn,$email);
    if($alumniData == false){
        header("location: /login?emailnotExists");
        exit();
    }
    // else{
    //     header("location: ./LoginPage.php?emailExists");
    //     exit();
    // }

    $passwordNormal = $alumniData["password"];
    $checkpassword = passwordCheck($password, $passwordNormal);

    $passwordHashed = $emailExists["password"];
    $checkpassword = password_verify($password, $passwordHashed);

    if ($checkpassword === false) {
       
        header("location: /login?passwordWrong");
        exit();

    } else if($checkpassword === true){

        // $active = $alumniData["isActive"];

        // if($active == 1){
            unset($alumniData["password"]);
            unset($alumniData["icNumber"]);
            session_start();
            $_SESSION["alumni"] = $alumniData;
            // $_SESSION["emb"] = "abc";
            header("location: /home");
            exit();
        // }else {
        //     header("location: ./LoginPage.php?account=deleted");
        //     exit();
        // }

        
        
    }

    

}


function emailExists($conn,$email){

    $stmt = $conn->prepare("SELECT * FROM alumni WHERE email=?");
    $stmt->execute(array($email));
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($row['email'] === $email) {
            //email exists
            echo '
            <script type="text/javascript">
            setSuccessFor(#staticEmail);
            </script>
            ';
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
        header("location: /login?password=false");
        return false;
    }
}


