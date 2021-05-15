<?php
include '../header.php';
?>
<link rel="stylesheet" type="text/css" href="/public/css/Alumni/JobDetailsPage.css" />

  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<?php
include '../../../config/config.php';
include './JobDetailsModel.php';
include '../Database.php';

$id = $_GET['id'];
// echo ($id);

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $job_model = new JobDetailsModel($db->getConnection());
    $all_activities = $job_model->getRow($id);
    //   if (!empty($all_activities)) {

    // foreach ($all_activities as $activity) {
    //   echo "$activity[jobId] ";
    // }
// }
  // print_r($all_activities);
} catch (Exception $e) {
    echo "Exception here!";
}
?>

<div class = "container my-5" id='main-body' ></div>
<script type="text/javascript">var job_array = <?php echo json_encode($all_activities) ?>;</script>
<script type="module" src="/public/js/Alumni/JobDetailsPage.js"></script>
<?php include '../footer.php' ?>