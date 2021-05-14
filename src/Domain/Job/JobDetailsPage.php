<?php
include '../header.php';
?>
<link rel="stylesheet" type="text/css" href="/public/css/Alumni/JobPage.css" />

  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<?php
include '../../../config/config.php';
include './JobDetailsModel.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $job_model = new JobDetailsModel($db->getConnection());
    $all_activities = $job_model->getAll();
      if (!empty($all_activities)) {

    foreach ($all_activities as $activity) {
      echo "$activity[jobId] ";
    }
  print_r($all_activities);
  }

} catch (Exception $e) {
    echo "Exception here!";
}
?>

<div class = "container my-5" id='main-body' ></div>
<?php include '../footer.php' ?>