<?php
use PHPMailer\PHPMailer\PHPMailer;
include '../src/Domain/Database.php';
include '../src/Domain/LoginPage/class.verifyEmail.php';
// include '../src/utilities/uploadImage.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();

// if (isset($_POST["reset"])){
//     echo 'done verify';
//     insertAlumni($conn,$GLOBALS['alumniId'],$GLOBALS['approvedBy'], $GLOBALS['email'], $GLOBALS['Password'], $GLOBALS['IC'], $GLOBALS['gender'], $GLOBALS['name'], $GLOBALS['department'], $GLOBALS['Batch'], $GLOBALS['imageId'], $GLOBALS['isEmailPublic'], $GLOBALS['biography']);
// }

    // $alumniId = $GLOBALS['alumniId'];
    // $approvedBy = $GLOBALS["approvedBy"];
    // $email = $GLOBALS["email"];
    // $Password = $GLOBALS["Password"];
    // $IC = $GLOBALS["IC"];
    // $gender = $GLOBALS["gender"];
    // $name = $GLOBALS["name"];
    // $department = $GLOBALS["department"];
    // $Batch = $GLOBALS["Batch"];
    // $imageId = $GLOBALS["imageId"];
    // $isEmailPublic = $GLOBALS["isEmailPublic"];
    // $biography = $GLOBALS["biography"];

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
    $isEmailPublic = "";
    $biography = "";
    $pic = "profilePicture";

   
    verifyEmail($email);

    insertData($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    
    // $verify = verify($email);
    // if($verify){
    //     insertAlumni($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography);
    // }else{
    //     header("location: /login?emailFake");
    //     exit();
    // }
    

    header("location: /login?doneSend");
    

    // header("location: LoginPage.php");
    exit();

}

function insertData($conn,$alumniId, $approvedBy, $email, $Password, $IC, $gender, $name, $department, $Batch, $imageId, $isEmailPublic, $biography){
   
    session_start();
    
    $dataArr = array("alumniId" => $alumniId, "approvedBy" => $approvedBy, 
                "email" => $email, "Password" => $Password, "IC" => $IC, "gender" => $gender,
                "name" => $name, "department" => $department, "Batch" => $Batch,
                "imageId" => $imageId, "isEmailPublic" => $isEmailPublic, 
                "biography" => $biography);

    $_SESSION['dataAlumni'] = $dataArr;
    
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
}



function verifyEmail($email){

    $base_url = "http://localhost/login?doneVerify";

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
        $mail->Subject = 'Change Password';
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
            header("location: /login?doneSend");
            exit();
        }else{
            $status = 'failed';
            $response = 'error==='. $mail->ErrorInfo;
        }

        exit(json_encode(array("status" => $status,"response" => $response)));
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

