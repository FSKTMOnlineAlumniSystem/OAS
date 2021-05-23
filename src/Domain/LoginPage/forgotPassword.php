<?php

use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST["submit"])){

    $email = $_POST["email"];

    require_once '../../../libs/PHPMailer/src/PHPMailer.php';
    require_once '../../../libs/PHPMailer/src/SMTP.php';
    require_once '../../../libs/PHPMailer/src/Exception.php';


$mail = new PHPMailer();

//smtp settings
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'webprog707@gmail.com';
$mail->Password = '123wif2003';
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';


//email settings
$mail->isHTML(true);
$mail->setFrom('no-reply@alumniSystem.com');
$mail->AddAddress($email);
$mail->Subject = 'Change Password';
$mail->Body = 'A test email';

// $mail->send();

if ($mail->send()) {
    $status = 'success';
    $response = 'Email is sent!';
}else{
    $status = 'failed';
    $response = 'error==='. $mail->ErrorInfo;
}

exit(json_encode(array("status" => $status,"response" => $response)));


}