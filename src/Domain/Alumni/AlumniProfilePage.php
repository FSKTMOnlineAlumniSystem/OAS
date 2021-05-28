<?php
include '../../templates/header.php';
?>
<link rel="stylesheet" type="text/css" href="/public/css/Alumni/MyProfilePage.css" />

  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>
  
  <?php
include '../../../config/config.php';
include './AlumniProfileModel.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $event_model = new AlumniProfileModel($db->getConnection());
  $all_activities = $event_model->getAll();
  if (!empty($all_activities)) {

    foreach ($all_activities as $activity) {
      echo "$activity[alumniId] ";
    }
  }
} catch (Exception $e) {
  echo $e->getMessage();
}

?>

<div id="main-body" class="row mx-0 my-5 justify-content-center"></div>
<!-- custom js files -->
<script type="module" src="/public/js/Alumni/AlumniProfilePage.js"></script>
  
<?php include '../../templates/footer.php' ?>