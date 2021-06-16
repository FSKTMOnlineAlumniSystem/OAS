<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Job/JobModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $job_model = new JobModel($db->getConnection());
  $all_activities = $job_model->getAll();
  $allImage = $job_model->getJobImage();
  
  for ($i=0; $i< count($all_activities); $i++){
    $all_activities[$i]['imageId'] = $allImage[$i];
  }


} catch (Exception $e){
  echo $e->getMessage();
}
?>

<script type="text/javascript">var job_array = <?php echo json_encode($all_activities) ?>;</script>
<script type="module" src="/js/Alumni/JobPageModule.js"></script>



<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/JobPage.css',
    'searchBar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>

<title>Job - Alumni Online System</title>

</head>
<body>


  <div class="searchBarBG">
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
</div>
  <div class="container my-5" id="main-body">


        <h1><b>Jobs</b></h1>
        
        <hr>

        <h2>Job Advertisement</h2>
        <br />
        
        <!-- Cards -->
        <div class="row justify-content-md-center text-center" id="no_result"></div>
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

<?php 
include_once '../src/templates/footer.php' 
?>
<?php include_once '../src/templates/GeneralScripts.php' ?>