<?php
include_once '../src/templates/header.php';
include '../src/Domain/Database.php';
include '../src/Domain/Job/EditMyJobModel.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/EditMyJobPage.css" />

<title>Edit Job - Alumni Online System</title>
</head>
<body>

<?php 
// include '../../../config/config.php';
// include '../src/Domain/Job/EditMyJobModel.php';
// include '../src/Domain/Database.php';

include '../src/utilities/uploadImage.php';
$myjobid = $_GET['myjobid'];
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$job_model = new EditMyJobModel($db->getConnection());
if(isset($_POST['Submit'])) {
  // $editJob_model = new  EditMyJobModel($db->getConnection());
  // $myjob = $job_model->getRow($myjobid);	

  // $data = $addJob_model->getMaxId();
  // $jobId = "J-" . $data+1;
  
  date_default_timezone_set('Asia/Kuala_Lumpur');
  $date = date('y-m-d H:i:s');
  $postedDateTime = date(DATE_ATOM, strtotime($date));

  $jobId = $myjobid;
  $alumniId = "AL-1";         //ned change
  $title = $_POST['jobtitle'];
  $description = $_POST['description'];
  $salary = $_POST['salary'];
  $email = $_POST['email'];
  $postedDateTime = $postedDateTime;      //ned change
  $imageId = $myjobid;
  $company = $_POST['company'];
  $location = $_POST['location'];
  // echo("<br>");
  // echo($jobId);
  // echo("<br>");
  // print_r($editjob);
  $job_model->editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location);
  
  try{
    //Upload image to database as blob
    if($_FILES["imageId"]['tmp_name']!=null){
        uploadImage($db->getConnection(),$_FILES["imageId"],$imageId);
    }

  } catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
  }

  header("Location: myjob");
  // exit(header("Location: myjob"));

}


// echo ($myjobid);
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
try {
  $job_model = new EditMyJobModel($db->getConnection());
  $editjob = $job_model->getRow($myjobid);
  $image = $job_model->getProfilePicture($myjobid);
  $editjob['imageId'] = $image[0];
  // print_r($editjob);
} catch (Exception $e) {
  echo "Exception here!";
}
?>

<div class = "container my-5" id="main-body"></div>

<script type="text/javascript">var job_array = <?php echo json_encode($editjob) ?>;</script>
<script type="text/javascript" src="/js/Alumni/EditMyJobPage.js"></script>

<?php
// echo("here");
// include '../src/utilities/uploadImage.php';
// $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

// if(isset($_POST['Submit'])) {
//   // $editJob_model = new  EditMyJobModel($db->getConnection());
//   // $myjob = $job_model->getRow($myjobid);	

//   // $data = $addJob_model->getMaxId();
//   // $jobId = "J-" . $data+1;
  
//   date_default_timezone_set('Asia/Kuala_Lumpur');
//   $date = date('y-m-d H:i:s');
//   $postedDateTime = date(DATE_ATOM, strtotime($date));

//   $jobId = $myjobid;
//   $alumniId = "AL-1";         //ned change
//   $title = $_POST['jobtitle'];
//   $description = $_POST['description'];
//   $salary = $_POST['salary'];
//   $email = $_POST['email'];
//   $postedDateTime = $postedDateTime;      //ned change
//   $imageId = $myjobid;
//   $company = $_POST['company'];
//   $location = $_POST['location'];
//   // echo("<br>");
//   // echo($jobId);
//   // echo("<br>");
//   // print_r($editjob);
//   $job_model->editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location);
  
//   // try{
//   //   //Upload image to database as blob
//   //   if($_FILES["imageId"]['tmp_name']!=null){
//   //       uploadImage($db->getConnection(),$_FILES["imageId"],$imageId);
//   //   }

//   // } catch (Exception $e) {
//   //   echo "Exception: " . $e->getMessage();
//   // }

//   header("Location: myjob");
//   // exit(header("Location: myjob"));

// }
?>
<script type="text/javascript" src="/js/addNavFooter.js"></script>
<?php include_once '../src/templates/footer.php' ?>