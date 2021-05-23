<?php
include_once '../src/templates/header.php';
include '../src/Domain/Database.php';
include '../src/Domain/Job/EditMyJobModel.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/EditMyJobPage.css" />

  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<?php 
// include '../../../config/config.php';
// include '../src/Domain/Job/EditMyJobModel.php';
// include '../src/Domain/Database.php';

$myjobid = $_GET['myjobid'];
// echo ($myjobid);
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
try {
  $job_model = new EditMyJobModel($db->getConnection());
  $editjob = $job_model->getRow($myjobid);
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
if(isset($_POST['Submit'])) {
  // $editJob_model = new  EditMyJobModel($db->getConnection());
  // $myjob = $job_model->getRow($myjobid);	

  // $data = $addJob_model->getMaxId();
  // $jobId = "J-" . $data+1;
  $jobId = $myjobid;
  $alumniId = "AL-1";         //ned change
  $title = $_POST['jobtitle'];
  $description = $_POST['description'];
  $salary = $_POST['salary'];
  $email = $_POST['email'];
  $postedDateTime = '2021-04-04T15:53:53+00:00';      //ned change
  $imageId = $_POST['imageId'];
  $company = $_POST['company'];
  $location = $_POST['location'];
  // echo("<br>");
  // echo($jobId);
  // echo("<br>");
  // print_r($editjob);
  $job_model->editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location);
  
  header("Location: myjob");


}
?>








<script type="text/javascript" src="/js/addNavFooter.js"></script>
<?php include_once '../src/templates/footer.php' ?>