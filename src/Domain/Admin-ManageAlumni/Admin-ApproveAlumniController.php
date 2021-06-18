<?php

use PHPMailer\PHPMailer\PHPMailer;

include_once '../src/Domain/MyProfile/MyProfileModel.php';
include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';


if (isset($_POST['alumniId'])) {
  $alumniId = $_POST['alumniId'];
  $adminId = $_SESSION['admin']['adminId'];
  try {
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    $updateApprove = new  UpdateAlumniModel($db->getConnection());
    $updateApprove->updateApprovedby($adminId, $alumniId);
    $alumni = new MyProfile($db->getConnection(), $alumniId);
    sendApprovalEmail($alumni->getEmail());
    echo json_encode($updateApprove);
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
    error_log("Exception: " . $e->getMessage());
    include_once '../src/templates/header.php';
    include_once '../src/Domain/General_Pages/server_error.php';
    exit();
  }
}

function sendApprovalEmail($email)
{

  $base_url = "http://{$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}/login";

  require_once '../libs/PHPMailer/src/PHPMailer.php';
  require_once '../libs/PHPMailer/src/SMTP.php';
  require_once '../libs/PHPMailer/src/Exception.php';

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
  $mail->Subject = 'Your Account Has Been Approved';
  $content = str_replace(
    array('%url%', '%to%'),
    array($base_url, $email),
    file_get_contents('../src/Domain/Admin-ManageAlumni/AdminApprovedEmail.html')
  );
  $mail->msgHTML(file_get_contents('../src/Domain/Admin-ManageAlumni/AdminApprovedEmail.html'), __DIR__);
  $mail->msgHTML($content, dirname(__FILE__));
  $mail->AltBody = 'A test email $newPassword';

  if ($mail->send()) {
    $status = 'success';
    $response = 'Email is sent!';
  } else {
    $status = 'failed';
    $response = 'error===' . $mail->ErrorInfo;
  }
}
