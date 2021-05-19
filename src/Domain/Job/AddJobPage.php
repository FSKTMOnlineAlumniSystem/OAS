<?php
include '../src/Domain/header.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/AddJobPage.css" />

<title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<div class="container my-md-5 my-3" id='main-body'>
<h3 class="mb-4">Add New Job</h3>
<div id="form"></div>
</div>

<script type="module" src="/js/Alumni/AddJobPage.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>

<?php
// include '../../../config/config.php';
include '../src/Domain/Job/AddJobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);


if(isset($_POST['Submit'])) {
    $addJob_model = new  AddJobModel($db->getConnection());	
    $data = $addJob_model->getMaxId();
    $jobId = "J-" . $data+1;
	$alumniId = "AL-1";         //ned change
    $title = $_POST['title'];
    $description = $_POST['description'];
    $salary = $_POST['salary'];
	$email = $_POST['email'];
    $postedDateTime = '2021-04-04T15:53:53+00:00';      //ned change
    $imageId = $_POST['imageId'];
    $company = $_POST['company'];
    $location = $_POST['location'];

    $addJob_model->addJobs($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location);
    
    header("Location: myjob");

  
}
?>





<?php include '../src/Domain/footer.php' ?>


