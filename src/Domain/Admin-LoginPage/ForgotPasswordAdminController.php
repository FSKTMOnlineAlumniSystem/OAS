<?php

use PHPMailer\PHPMailer\PHPMailer;
include_once '../src/Domain/Database.php';
try {
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    $conn = $db->getConnection();
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
  }

if(isset($_POST["submit"])){

    $email = $_POST["email"];

    require_once '../libs/PHPMailer/src/PHPMailer.php';
    require_once '../libs/PHPMailer/src/SMTP.php';
    require_once '../libs/PHPMailer/src/Exception.php';

    if(emailExists($conn,$email) == false){
        header("location: /admin-login?fgemailnotExists");
        exit();
    }else{

        $newPassword = randomPassword();
        $hashednewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        setNewPassword($conn,$hashednewPassword,$email);
        // echo $newPassword;

        $mail = new PHPMailer();

        //smtp settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = SYSTEM_EMAIL_USERNAME;
        $mail->Password = SYSTEM_EMAIL_PASSWORD;
        $mail->Port = 465;
        $mail->SMTPSecure = 'ssl';


        //email settings
        $mail->isHTML(true);
        $mail->SetFrom('no-reply@alumniSystem.com', 'Alumni System Admin');
        $mail->AddReplyTo('no-reply@alumniSystem.com', 'Alumni System Admin');
        $mail->AddAddress($email);
        $mail->Subject = 'Change Password';
        $content = str_replace(
            array('%password%', '%to%'),
            array($newPassword,    $email),
            file_get_contents('../src/Domain/LoginPage/ForgotPasswordEmail.html')
        );
        $mail->msgHTML(file_get_contents('../src/Domain/LoginPage/ForgotPasswordEmail.html'), __DIR__);
        $mail->msgHTML($content, dirname(__FILE__));
        $mail->AltBody = 'A test email $newPassword';

        // $mail->send();

        if ($mail->send()) {
            $status = 'success';
            $response = 'Email is sent!';
            header("location: /admin-login?sendPsw");
            exit();
        }else{
            $status = 'failed';
            $response = 'error==='. $mail->ErrorInfo;
        }

        exit(json_encode(array("status" => $status,"response" => $response)));

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

function randomPassword()
{
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

function setNewPassword($conn,$newPassword,$email)
{
    $stmt = $conn->prepare("UPDATE admin SET password=:password WHERE email=:email");
    $stmt->bindParam(":email", $email);
    $stmt->bindParam("password", $newPassword);
    $stmt->execute();
}