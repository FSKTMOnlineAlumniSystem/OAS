<?php
include '../src/Domain/header.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/JobPage.css" />

  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<?php
// include '../../../config/config.php';
include '../src/Domain/Job/JobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $job_model = new JobModel($db->getConnection());
  $all_activities = $job_model->getAll();
  // if (!empty($all_activities)) {

  //   foreach ($all_activities as $activity) {
  //     echo "$activity[jobId] ";
  //   }
  // // print_r($all_activities);
  // }
} catch (Exception $e) {
  echo "Exception here!";
}

?>

  <div class="container my-5" id="main-body">
        <h1><b>Jobs</b></h1>
        
        <hr>

        <h2>Job Advertisement</h2>
        <br />
        
        <!-- Cards -->
        <div class="card-desk">
          <div class="row row-cols-3" id="jobList"></div>
        </div>

        <br />

        <!-- Page navigation -->
        <span id="pageIndex"></span>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <div id="previousPage"></div>
            <div class="pages list-group list-group-horizontal"></div>
            <div id="nextPage"></div>
          </ul>
        </nav>
        <br /><br />
      </div>

<script type="text/javascript">var job_array = <?php echo json_encode($all_activities) ?>;</script>
<script type="module" src="/js/Alumni/JobPage.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>
<script type="text/javascript" src="/js/addSearchBar.js"></script>
<?php $db-> closeConnection() ?>
<?php include '../src/Domain/footer.php' ?>