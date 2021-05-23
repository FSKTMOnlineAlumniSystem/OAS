<?php

use PHPMailer\PHPMailer\PHPMailer;

if(isset($_POST["submit"])){

    $email = $_POST["email"];

    require_once '../../../libs/PHPMailer/src/PHPMailer.php';
    require_once '../../../libs/PHPMailer/src/SMTP.php';
    require_once '../../../libs/PHPMailer/src/Exception.php';


    $newPassword = randomPassword();
    echo $newPassword;


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
$mail->SetFrom('no-reply@alumniSystem.com', 'Alumni System Admin');
$mail->AddReplyTo('no-reply@alumniSystem.com', 'Alumni System Admin');
$mail->AddAddress($email);
$mail->Subject = 'Change Password';
$content = str_replace(
    array('%password%', '%to%'),
    array($newPassword,    $email),
    file_get_contents('ForgotPasswordEmail.html')
);
$mail->msgHTML(file_get_contents('./ForgotPasswordEmail.html'), __DIR__);
$mail->msgHTML($content, dirname(__FILE__));
$mail->AltBody = 'A test email $newPassword';

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

function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}