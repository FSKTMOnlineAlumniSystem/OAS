<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Job/EditMyJobModel.php';
?>

<?php 

include '../src/utilities/uploadImage.php';
$myjobid = $_GET['myjobid'];
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$job_model = new EditMyJobModel($db->getConnection());
if(isset($_POST['Submit'])) {
  
  date_default_timezone_set('Asia/Kuala_Lumpur');
  $date = date('y-m-d H:i:s');
  $postedDateTime = date(DATE_ATOM, strtotime($date));

  $jobId = $myjobid;
  $alumniId = $_SESSION['alumni']['alumniId'] ;        
  $title = $_POST['jobtitle'];
  $description = $_POST['description'];
  $salary = $_POST['salary'];
  $email = $_POST['email'];
  $postedDateTime = $postedDateTime;    
  $imageId = $myjobid;
  $company = $_POST['company'];
  $location = $_POST['location'];

  $job_model->editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location);
  
  try{
    //Upload image to database as blob
    if($_FILES["imageId"]['tmp_name']!=null){
        uploadImage($db->getConnection(),$_FILES["imageId"],$imageId);
    }

  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
  }

  header("Location: myjob");

}


$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
try {
  $job_model = new EditMyJobModel($db->getConnection());
  $editjob = $job_model->getRow($myjobid);
  $image = $job_model->getJobImage($myjobid);
  $editjob['imageId'] = $image[0];

} catch (Exception $e) {
  // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
}
?>


<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/EditMyJobPage.css',
    'searchBar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>

<div class = "container my-5" id="main-body"></div>

<script type="text/javascript">var job_array = <?php echo json_encode($editjob) ?>;</script>
<script type="text/javascript" src="/js/Alumni/EditMyJobPage.js"></script>
<?php include_once '../src/templates/footer.php' ?>
<?php include_once '../src/templates/GeneralScripts.php' ?>