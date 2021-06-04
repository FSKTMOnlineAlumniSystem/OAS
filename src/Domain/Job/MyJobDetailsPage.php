<?php
include_once '../src/templates/header.php';
include '../src/Domain/Database.php';
include '../src/Domain/Job/MyJobDetailsModel.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/MyJobDetailsPage.css" />

<title>My Job Details - Alumni Onlune System</title>
</head>
<body>

<?php

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myjobid = $_GET['myjobid'];

try {
    $myjob_model = new MyJobDetailsModel($db->getConnection());
    $myjobdetails = $myjob_model->getRow($myjobid);
    $image = $myjob_model->getJobImage($myjobid);
    $myjobdetails['imageId'] = $image[0];

} catch (Exception $e) {
    echo "Exception here!";
}
?>

<div class = "container my-5" id='main-body'></div>
<br>

<script type="text/javascript">var job_array = <?php echo json_encode( $myjobdetails) ?>;</script>
<script type="module" src="/js/Alumni/MyJobDetailsPage.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>
<?php include_once '../src/templates/footer.php' ?>