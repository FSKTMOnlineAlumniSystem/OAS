<?php
include_once '../src/templates/header.php';
include '../src/Domain/Database.php';
include '../src/Domain/Job/JobDetailsModel.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/JobDetailsPage.css" />

  <title>Job Details - Alumni Online System</title>
</head>
<body>

<?php

$id = $_GET['jobid'];

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $job_model = new JobDetailsModel($db->getConnection());
    $all_activities = $job_model->getRow($id);
    $image = $job_model->getJobImage($id);

    $all_activities['imageId'] = $image[0];

} catch (Exception $e) {
    echo "Exception here!";
}
?>

<div class = "container my-5" id='main-body' ></div>
<script type="text/javascript">var job_array = <?php echo json_encode($all_activities) ?>;</script>
<script type="module" src="/js/Alumni/JobDetailsPage.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>
<?php include_once '../src/templates/footer.php' ?>

