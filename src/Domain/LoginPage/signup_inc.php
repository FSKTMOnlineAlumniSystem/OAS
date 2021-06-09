<?php
use PHPMailer\PHPMailer\PHPMailer;
include_once '../src/Domain/Database.php';
include_once '../src/Domain/LoginPage/class.verifyEmail.php';
include_once '../src/Domain/LoginPage/GeneralLoginFx.php';
include_once '../src/utilities/uploadImage.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();


if(isset($_POST["submit"])){
    echo "it works";
    $firstname = $_POST["FirstNameID"];
    $lastname = $_POST["LastNameID"];
    $name = $firstname.' '.$lastname;
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

    // $_SESSION["alumniId"] = $alumniId;
    // $_SESSION["approvedBy"] = $approvedBy;
    // $_SESSION["email"] = $email;
    // $_SESSION["Password"] = $Password;
    // $_SESSION["IC"] = $IC;
    // $_SESSION["gender"] = $gender;
    // $_SESSION["name"] = $name;
    // $_SESSION["department"] = $department;
    // $_SESSION["Batch"] = $Batch;
    // $_SESSION["imageId"] = $imageId;
    // $_SESSION["isEmailPublic"] = $isEmailPublic;
    // $_SESSION["biography"] = $biography;
    // $_SESSION["pic"] = $_FILES["profilePicture"];

    $encrypted = Encrypt($email);
    verifyEmail($email,$encrypted);

    insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $isActive, $isVerified, $biography);
    

    header("location: /login?doneSend");
    exit();

}


function insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $isActive, $isVerified, $biography){
    $stmt = $conn->prepare("INSERT INTO alumni (alumniId, approvedBy, email, password, icNumber, gender, name, department, graduated, imageId, isEmailPublic, isActive, isVerified, biography) VALUES(:alumniId, :approvedBy, :email, :password, :icNumber, :gender, :name, :department, :graduated, :imageId, :isEmailPublic, :isActive, :isVerified, :biography)");

    $checkEmail = emailExists($conn,$email);
    if ($checkEmail) {
        header("location: /login?emailExists");
        exit();
    }

    

    $alumniId = "AL-" . getLength($conn)+1 ;
    // $alumniId = $email;
    $imageId = $alumniId;

    $stmt->bindParam(":alumniId", $alumniId);

    $stmt->bindParam(":approvedBy", $approvedBy);
    $stmt->bindParam(":email", $email);

    $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
    $stmt->bindParam(":password", $hashedPassword);
    



    // $stmt->bindParam(":password", $Password);





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
        if($_FILES["profilePicture"]['tmp_name']!=null){
            // echo $_FILES[$pic]['tmp_name'];
            uploadImage($conn,$_FILES["profilePicture"],$alumniId);
            
        }
        // $alumni = new MyProfile($db->getConnection(), $alumniId);
        // $alumni->setUpdatedData($email, $biography);
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }

}

function getLength($conn){
    $stmt = $conn->prepare("SELECT COUNT(*) FROM alumni");
    $stmt->execute();
    $data = $stmt->fetch();
    return $data["COUNT(*)"];
}




function verifyEmail($email,$encrypted){

    $base_url = "http://localhost/login?id=".$encrypted;

    require_once '../libs/PHPMailer/src/PHPMailer.php';
    require_once '../libs/PHPMailer/src/SMTP.php';
    require_once '../libs/PHPMailer/src/Exception.php';

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
        $mail->Subject = 'Verify Your Email';
        $content = str_replace(
            array('%url%', '%to%'),
            array($base_url,$email),
            file_get_contents('../src/Domain/LoginPage/Verify.html')
        );
        $mail->msgHTML(file_get_contents('../src/Domain/LoginPage/Verify.html'), __DIR__);
        $mail->msgHTML($content, dirname(__FILE__));
        $mail->AltBody = 'A test email $newPassword';

        if ($mail->send()) {
            $status = 'success';
            $response = 'Email is sent!';
            // header("location: /login?doneSend");
            // exit();
        }else{
            $status = 'failed';
            $response = 'error==='. $mail->ErrorInfo;
        }

        // exit(json_encode(array("status" => $status,"response" => $response)));
}

// function verify($email){
//     $verifyE = new verifyEmail();
//     $verifyE->setStreamTimeoutWait(20);
//     $verifyE->Debug= TRUE;
//     $verifyE->Debugoutput= 'html';

//     $verifyE->setEmailFrom('webprog707@gmail.com');

//     if ($verifyE->check($email)) {
//         return true;
//         // echo '<h1>email &lt;' . $email . '&gt; exist!</h1>';
//     }else {
//         return false;
//         // echo '<h1>email &lt;' . $email . '&gt; not valid and not exist!</h1>';
//     }
// }

