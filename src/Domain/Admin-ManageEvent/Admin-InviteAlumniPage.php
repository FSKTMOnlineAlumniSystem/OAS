
<?php
 $eventId=$_GET['eventId'];
  include_once '../src/Domain/Admin-ManageEvent/Admin-EventModel.php';
  include_once '../src/Domain/Database.php';
  ?>
  <?php
  include_once '../src/utilities/includeWithVariable.php' ?>
  <?php
  includeWithVariables('../src/templates/header.php', array(
    'asmin_inviteAlumniPage_css' => '/css/Admin/Admin-InviteAlumniPage.css',
    'admin_alumniListPage_css' => '/css/Admin/Admin-AlumniListPage.css',
    'index' => '/css/Alumni/index.css'
  ));
  
  $_SESSION['admin']['adminId'];

  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  try {
    $event_model = new Admin_Alumni_EventModel($db->getConnection());
    $all_activities = $event_model->getAll();
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
  }

  try {
    $event = new Admin_EventModel($db->getConnection());
    $event->getEvent($eventId);
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
  }

   try {
    $event_model = new AlumniModel($db->getConnection());
    $all_alumni = $event_model->getAll();
    $allImage = $event_model->getPicture();
   
    for ($i=0; $i< count($all_alumni); $i++){
      $all_alumni[$i]['imageId'] = $allImage[$i];
    }
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
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
                <select class="form-control" id="status">
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

          <div class="table-responsive col-12" >
          
            <table  id="myTable" class="table table-striped table-sm table-bordered">
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

            <div class="col-12 d-flex justify-content-end" id='invideAndDone'>
          </div>
          <div class="row justify-content-md-center text-center" id="no_result"></div>
          <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
              <li class="page-item" id="previousPage"></li>
              <div class="pages list-group list-group-horizontal"></div>
              <li class="page-item" id="nextPage"></li>
            </ul>
          </nav>
          </div>
        </div>
        <br>
      </div>
  </main>


  <script type="text/javascript">var alumniEvent_array = <?php echo json_encode($all_activities) ?>;</script>
  <script type="text/javascript">var alumni_array = <?php echo json_encode($all_alumni) ?>;</script>
  <script type="text/javascript">var $inviteEventId = <?php echo json_encode($eventId) ?>;</script>
  <script type="module" src="/js/Admin/Admin-InviteAlumniPage.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
  <script type='text/javascript' src='/js/Admin/addLeftNav.js'></script>
  <?php include_once '../src/templates/GeneralScripts.php'?>
</body>
</html>