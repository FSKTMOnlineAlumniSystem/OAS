


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
    $image = $myJob_model->getProfilePicture($alumniID);
    
    // $myJob = array();
    for ($i=0; $i< count($myJob); $i++){
      $myJob[$i]['imageId'] = $image[$i];
    }


    // print_r($myJob);
    // print_r($myJob_model);


// }
  // print_r($all_activities);
} catch (Exception $e) {
    echo "Exception here!";
}
?>



<link rel="stylesheet" type="text/css" href="/css/Alumni/MyJobPage.css" />
<link rel="stylesheet" type="text/css" href="/css/Alumni/SearchBar.css" />


<div class ="container my-5" id='main-body'>

<div class="searchBarBG">
<!-- <form class="search-form" method="post"> -->
 <div class="containerSB">
   <div class="row no-gutters" style="white-space: nowrap">
     <div class="col-lg-3 col-md-3 col-sm-12 p-0"></div>
     <div class="col-lg-6 col-md-6 col-sm-12 p-0 input-group" style="margin-top: 60px;">
       <input type="search" placeholder="Search..." class="form-control" id="search_item" name="search" value="" />
       <div class="input-group-append">
         <button type="submit" id="search-button" class="btn btn-secondary">
           <i class="fas fa-search"></i>
         </button>
       </div>
     </div>
   </div>
 </div>
 <!-- </form> -->
</div><br><br>
          <h1><b>Jobs</b></h1>
        
          <hr>
          <h2>My Job Advertisement
            <span class="d-flex flex-row-reverse"> <a href="addjob" class="btn btn-primary"> + Add Jobs </a></button></span>
        </h2>
        
          <!-- DISPLAY CARDS OF MY JOB ADS -->
          <div class="row justify-content-md-center" id="top"></div>
          <div class="row justify-content-md-center" id="no_result"></div>
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
              <button id="deleteButton"  name ="delete_row" type="button" class="btn btn-danger" data-dismiss="modal">Yes, delete it.</button>
              </div>
              </div>
              </div>
              </div>

              <p id="test"></p>
            
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

    <?php 
// if( isset($_POST['ajax']) && isset($_POST['deleteID']) ){
//   // $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
//   $deleteID =  $_POST['deleteID'];
//   $myJob = $myJob_model->deleteJob($deleteID);
//   // header('Cache-Control: no-store, no-cache, must-revalidate');
//   // exit;
//   $updatedJob = $myJob_model->getRow($alumniID);
//   print_r($updatedJob);
//   echo json_encode($updatedJob);
 
//  }


?>


<?php include_once '../src/templates/footer.php' ?>

<script type="text/javascript">var myJob_array = <?php echo json_encode($myJob) ?>;</script>
<script type="module" src="/js/Alumni/MyJobPage.js"></script>
<script type="text/javascript">var image_array = <?php echo json_encode($image) ?>;</script>
<script type="module" src="/js/Alumni/MyJobPageModule.js"></script>
<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script type="module" src="/js/utility.js"></script>
<script type="text/javascript" src="/js/addNavFooter.js"></script>

<!-- <script type="text/javascript" src="/js/addSearchBar.js"></script> -->







