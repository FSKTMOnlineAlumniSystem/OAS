<?php

use PHPMailer\PHPMailer\PHPMailer;

include_once '../src/Domain/Database.php';
// include_once '../src/Domain/LoginPage/class.verifyEmail.php';
include_once '../src/Domain/LoginPage/GeneralLoginFx.php';
include_once '../src/utilities/uploadImage.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();

if (isset($_POST["submit"])) {
    $firstname = $_POST["FirstNameID"];
    $lastname = $_POST["LastNameID"];
    $name = $firstname . ' ' . $lastname;
    $gender = $_POST["gender"];
    $Batch = $_POST["Batch"];
    $email = $_POST["email"];
    $IC = $_POST["IC"];
    $department = $_POST["department"];
    $Password = $_POST["Password"];
    $alumniId = "";
    $approvedBy = "";
    $imageId = "";
    $isEmailPublic = False;
    $isActive = True;
    $isVerified = False;
    $biography = "";
    $pic = "profilePicture";

    insertAlumni($conn, $alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $isActive, $isVerified, $biography);

    header("location: /login?doneSend");
    exit();
}


function insertAlumni($conn, $alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $isActive, $isVerified, $biography)
{
    $stmt = $conn->prepare("INSERT INTO alumni (alumniId, approvedBy, email, password, icNumber, gender, name, department, graduated, imageId, isEmailPublic, isActive, isVerified, biography) VALUES(:alumniId, :approvedBy, :email, :password, :icNumber, :gender, :name, :department, :graduated, :imageId, :isEmailPublic, :isActive, :isVerified, :biography)");

    $checkEmail = emailExists($conn, $email);
    if ($checkEmail) {
        header("location: /login?emailExists");
        exit();
    }

    $encrypted = Encrypt($email);
    verifyEmail($email, $encrypted);

    $alumniId = "AL-" . (getLength($conn) + 1);
    $imageId = $alumniId;

    $stmt->bindParam(":alumniId", $alumniId);
    $stmt->bindParam(":approvedBy", $approvedBy);
    $stmt->bindParam(":email", $email);

    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

    $stmt->bindParam(":password", $hashedPassword);
    $stmt->bindParam(":icNumber", $IC);
    $stmt->bindParam(":gender", $gender);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":department", $department);
    $stmt->bindParam(":graduated", $Batch);
    $stmt->bindParam(":imageId", $imageId);
    $stmt->bindParam(":isEmailPublic", $isEmailPublic);
    $stmt->bindParam(":isActive", $isActive);
    $stmt->bindParam(":isVerified", $isVerified);
    $stmt->bindParam(":biography", $biography);
    $stmt->execute();

    try {
        //Upload image to database as blob
        if ($_FILES["profilePicture"]['tmp_name'] != null) {
            uploadImage($conn, $_FILES["profilePicture"], $alumniId);
        }
    } catch (Exception $e) {
        // echo "Exception: " . $e->getMessage();
        error_log("Exception: " . $e->getMessage());
        include_once '../src/templates/header.php';
        include_once '../src/Domain/General_Pages/server_error.php';
        exit();
    }
}


function getLength($conn)
{
    $stmt = $conn->prepare("SELECT max( CONVERT ( substring_index(alumniId,'-',-1), UNSIGNED ) ) AS max FROM alumni");
    $stmt->execute();
    $data = $stmt->fetch();
    return $data["max"];
}


function verifyEmail($email, $encrypted)
{

    $base_url = "http://{$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}/login?id=" . $encrypted;

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
    $mail->Subject = 'Verify Your Email';
    $content = str_replace(
        array('%url%', '%to%'),
        array($base_url, $email),
        file_get_contents('../src/Domain/LoginPage/Verify.html')
    );
    $mail->msgHTML(file_get_contents('../src/Domain/LoginPage/Verify.html'), __DIR__);
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
