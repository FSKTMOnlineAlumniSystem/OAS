<?php

if(isset($_POST["submit"])){

// require_once('../../../libs/PHPMailer/PHPMailerAutoload.php');


// $mail = new PHPMailer;
// $mail->isSMTP();
// $mail->SMTPAuth = true;
// $mail->SMTPSecure = 'tls';
// $mail->Host = 'smtp.gmail.com';
// $mail->Port = '587';
// $mail->isHTML(true);
// $mail->Username = 'niclyy2717@gmail.com';
// $mail->Password = 'damnstupid123';
// $mail->SetFrom('no-reply@alumniSystem.com');
// $mail->Subject = 'Change Password';
// $mail->Body = 'A test email';
// $mail->AddAddress('niclyy2717@gmail.com');

// $mail->send();

// if (!$mail->send()) {
//     echo 'notsend';
//     echo 'Error' . $mail->ErrorInfo;
// }else{
//     echo 'sent';
// }

<?php

/**
 * This example shows sending a message using a local sendmail binary.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;

require '../vendor/autoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
//Set PHPMailer to use the sendmail transport
$mail->isSendmail();
//Set who the message is to be sent from
$mail->setFrom('from@example.com', 'First Last');
//Set an alternative reply-to address
$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress('whoto@example.com', 'John Doe');
//Set the subject line
$mail->Subject = 'PHPMailer sendmail test';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('contents.html'), __DIR__);
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}

}