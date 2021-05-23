


<title>My Job - Alumni Online System</title>
</head>
<body>

<?php
// include '../../../config/config.php';
include '../src/Domain/Job/MyJobModel.php';
// include '../src/Domain/Database.php';
include_once '../src/templates/header.php';
include '../src/Domain/Database.php';

$alumniID = "AL-1";

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);


try {
    $myJob_model = new  MyJobModel($db->getConnection());
    // $num_rows = $myJob_model->getNumRow($alumniID);
    $myJob = $myJob_model->getRow($alumniID);
    // echo("inside" . $num_rows);
    // print_r($myJob);
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
<link rel="stylesheet" type="text/css" href="/css/Alumni/MyJobPage.css" />

<div class ="container my-5" id='main-body'>
          <h1><b>Jobs</b></h1>
        
          <hr>
          <h2>My Job Advertisement
            <span class="d-flex flex-row-reverse"> <a href="addjob" class="btn btn-primary"> + Add Jobs </a></button></span>
        </h2>

          <!-- DISPLAY CARDS OF MY JOB ADS -->
          <div class="row justify-content-md-center" id="top"></div>
          <div class="card-desk">
            <div class="row row-cols-3" id="jobList"></div>
            </div>

            <!-- POP OUT THE MODAL WHEN THE USER CLICK ON THE TRASH ICON -->
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
              <button id="closeDeleteModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
              </div>
              <div class="modal-body">
              Are you sure you want to delete this job advertisement?
              </div>
              <div class="modal-footer">
              <button id="deleteButton" type="button" class="btn btn-danger" data-dismiss="modal">Yes, delete it.</button>
              </div>
              </div>
              </div>
              </div>
            
              <!-- PAGE NAVIGATION -->
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

<script type="text/javascript">var myJob_array = <?php echo json_encode($myJob) ?>;</script>
<script type="module" src="/js/Alumni/MyJobPage.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>
    <?php include_once '../src/templates/footer.php' ?>