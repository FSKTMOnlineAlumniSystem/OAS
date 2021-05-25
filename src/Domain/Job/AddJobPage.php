<?php
include_once '../src/templates/header.php';
include '../src/Domain/Database.php';
include '../src/Domain/Job/AddJobModel.php';
?>

<link rel="stylesheet" type="text/css" href="/css/Alumni/AddJobPage.css" />
<title>Add Job - Alumni Online System</title>
</head>
<body>

<div class="container my-md-5 my-3" id='main-body'>
<h3 class="mb-4">Add New Job</h3>
<div id="form"></div>
</div>

<script type="text/javascript" src="/js/Alumni/AddJobPage.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>

<?php
include '../src/utilities/uploadImage.php';
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);


if(isset($_POST['Submit'])) {

    date_default_timezone_set('Asia/Kuala_Lumpur');
    $date = date('y-m-d h:i:s');
    $postedDateTime = date(DATE_ATOM, strtotime($date));
    // echo($postedDateTime);

    $addJob_model = new  AddJobModel($db->getConnection());	
    
    $data = $addJob_model->getMaxId();
    $jobId = "J-" . $data+1;
	$alumniId = "AL-1";         //ned change
    $title = $_POST['title'];
    $description = $_POST['description'];
    $salary = $_POST['salary'];
	$email = $_POST['email'];
    $postedDateTime = $postedDateTime;     
    $jobImage = $_FILES['jobImage']['name'];
    $company = $_POST['company'];
    $location = $_POST['location'];
    // $jobImage = basename($_FILES['jobImage']['name']);
    // echo($jobImage);
    $addJob_model->addJobs($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$jobImage,$company,$location);
    
    try{
        //Upload image to database as blob
        if($_FILES["jobImage"]['tmp_name']!=null){
            uploadImage($db->getConnection(),$_FILES["jobImage"],'AL-1');
        }
        
        
    } catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
    }

   


    header("Location: myjob");

  
}
?>

<!-- <script type="module" src="/js/Alumni/AddJobPage.js"></script> -->


<script type="text/javascript" src="/js/addNavFooter.js"></script>
<?php include_once '../src/templates/footer.php' ?>


