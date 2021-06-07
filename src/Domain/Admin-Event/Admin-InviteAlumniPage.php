<?php
include '../src/templates/header.php';
?>
  <!-- custom css files -->
  <link rel="stylesheet" type="text/css" href="/css/Admin/Admin-AlumniListPage.css">
<!-- jquery -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
crossorigin="anonymous"></script>
<!-- css -->
<link rel="stylesheet" href="/css/Admin/Admin-InviteAlumniPage.css">
  <title>Invite Alumni - Online Alumni System</title>
</head>

<body>
<?php
 $eventId=$_GET['eventId'];
  // include '../config/config.php';
  include '../src/Domain/Admin-Event/Admin-EventModel.php';
  include '../src/Domain/Database.php';

  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  try {
    $event_model = new Admin_Alumni_EventModel($db->getConnection());
    $all_activities = $event_model->getAll();
    if (!empty($all_activities)) {

      foreach ($all_activities as $activity) {
        echo "$activity[eventId] ";
      }
    }
  } catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
  }

   try {
    $event_model = new AlumniModel($db->getConnection());
    $all_alumni = $event_model->getAll();
    if (!empty($all_alumni)) {

      foreach ($all_alumni as $alumni) {
        // echo "$activity[eventId] ";
      }
    }
  } catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
  }
?>

<?php

function inviteAlumniPhp($alumniId,$eventId,$dateTime){
  global $db;
    $inviteAlumni = new InviteAlumniModel($db->getConnection());	
  $inviteAlumni-> InviteAlumni($alumniId,$eventId,$dateTime);
};

if(isset($_COOKIE["checkbox"])){

$alumniId = $_COOKIE['alumniId']; $alumniId=explode(",",$alumniId); //split
$eventId = $_COOKIE['eventId']; $eventId=explode(",",$eventId);
$dateTime = $_COOKIE['dateTime']; $dateTime=explode(",",$dateTime);

for($i=0; $i<count($alumniId);$i++){
  inviteAlumniPhp($alumniId[$i],$eventId[$i],$dateTime[$i]);  
}
  setcookie("alumniId", "");
  setcookie("eventId", "");
  setcookie("dateTime", "");
  setcookie("checkbox", "");
}
else if(isset($_COOKIE["alumniId"])){
  inviteAlumniPhp($_COOKIE["alumniId"],$_COOKIE["eventId"],$_COOKIE["dateTime"]);  
//   setcookie("inviteAlumni", "", time()-3600);
  setcookie("alumniId", "");
  setcookie("eventId", "");
  setcookie("dateTime", "");
}

?>
<nav></nav>
  <main class="container-fluid height-after-minus-header" id='main-body'>
    <div class="row h-100">
      <div class="custom-dark-gray px-0" id="left-nav">

      </div>
      <div class="container-fluid" id="right-content">
        <div class="row col-12">
          <h3 class='col-12 p-3'>Invite Alumni</h3>
          <form class='col-12'>
            <div class='row bg-light p-4 m-1'>
              <div class="form-group col-6">
                <!-- filter status -->
                <label for="exampleFormControlSelect1">Status</label>
                <select class="form-control" id="status" oninput="filterStatus()">
                  <option>All</option>
                  <option>Invited</option>
                  <option>Not Invited</option>
                </select>
              </div>
              <div class="form-group col-6">
                <!-- filter department -->
                <label for="exampleFormControlSelect1">Department</label>
                <select class="form-control" id="department">
                  <option>All</option>
                  <option>Software Engineering</option>
                  <option>Artificial Intelligence</option>
                  <option>Information System</option>
                  <option>Data Science</option>
                  <option>Multimedia</option>
                  <option>Computer System and Network</option>
                </select>
              </div>

              <div class='col-12 mt-2 d-flex flex-row-reverse'>
                <button type="submit" id="clearAll" class="btn text-white custom-dark-purple">Clear All</button>
              </div>
            </div>
          </form>
        </div>
        <div class="row col-12">
          <form class="col-12 my-2">
            <div class="row">
              <div class="col-7">
                <!-- invite checked alumni -->
                <button type="button" class="btn btn-info"  onclick='inviteCheckedAlumni()'>
                  <i class="fas fa-user-plus" aria-hidden="true"
                      style="font-size: 20px;"></i>
                </button>
              </div>
              <div class="col-5 input-group mb-3">
                <input id="input1" type="text" class="form-control" 
                style="font-weight: 200; font-style: italic" placeholder="Search"
                aria-label="Search"  aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button id="searchBar" class="btn btn-secondary my-2 my-sm-0" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
              </div>
            </div>
          </form>

          <div class="table-responsive col-12">
            <table  id="myTable" class="table table-striped table-bordered">
              <thead style="font-weight: 200; color:#ffffff" class="custom-dark-purple">
                <tr>
                  <th class="text-center">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="CheckAllBoxes" onclick="toggle(this);">
                      <label class="custom-control-label" for="CheckAllBoxes"></label>
                    </div>
                  </th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>

          <div class="col-12 d-flex justify-content-end">
            <button type="button" class="btn btn-info"  onclick='inviteCheckedAlumni()'>
              <i class="fas fa-user-plus"></i> Invite
            </button>
            <button type="button" class="btn btn-primary ml-2" onclick='backToPreviousPage()'>
              Done
            </button>
          </div>
        </div>
        <br>
      </div>
      <div id="previousPagePage"></div>
      <div class="pages"></div>
      <div id="nextPage"></div>
      
  </main>

  <!-- general js files -->
  <script type="text/javascript" src="/js/utility.js"></script>
  <!-- <script type="module" src="/js/addHeader.js"></script> -->
  <script type='text/javascript' src='/js/Admin/addLeftNav.js'></script>
  <!-- custom js files -->
  <script type="text/javascript">var alumniEvent_array = <?php echo json_encode($all_activities) ?>;</script>
  <script type="text/javascript">var alumni_array = <?php echo json_encode($all_alumni) ?>;</script>
  <script type="text/javascript">var $inviteEventId = <?php echo json_encode($eventId) ?>;</script>
  <script type="module" src="/js/Admin/Admin-InviteAlumniPage.js"></script>
  <!-- bootstrap javascript files -->
  <!-- <script src="/libs/bootstrap/js/bootstrap.bundle.js"></script> -->
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
    integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>


</body>

</html>