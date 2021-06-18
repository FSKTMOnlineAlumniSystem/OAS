  <?php
  include_once '../src/utilities/includeWithVariable.php' ?>
  <?php
  includeWithVariables('../src/templates/header.php', array(
    'admin_eventPageCreate_css' => '/css/Admin/Admin-CreateEventPage.css',
    'index' => '/css/Alumni/index.css'
  ));
  ?>
  <?php
  include_once '../src/Domain/Admin-ManageEvent/Admin-EventModel.php';
  include_once '../src/Domain/Database.php';
  include_once '../src/utilities/uploadImage.php';

  $_SESSION['admin']['adminId'];

  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
  try {
    $event_model = new Admin_EventModel($db->getConnection());
    $event_model->getEvent($_GET['eventId']);// for 404 page
    $all_activities = $event_model->getAll();
    $allImage = $event_model->getPicture();
    if (!empty($all_activities)) {
      foreach ($all_activities as $res) {
        if ($res['title'] == $title) {
          $eventId = $res['eventId'];
        }
      }
    }
    for ($i = 0; $i < count($all_activities); $i++) {
      $all_activities[$i]['imageId'] = $allImage[$i];
    }
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
  }
  ?>

  <?php
  if (isset($_POST['update'])) {
    $eventId = $_GET['eventId'];
    $updateTheEvent = new UpdateEventModel($db->getConnection());
    $imageId = $updateTheEvent->getImageId($eventId);
    $adminId = $_SESSION['admin']['adminId'];  
    $title = $_POST['title'];
    $date = $_POST["date"];
    $time = $_POST["time"];
    $description = $_POST['description'];
    $locate = $_POST['locate'];
    $combinedDT = date('Y-m-d H:i', strtotime("$date $time"));
    if ($_FILES["eventPicture"]['tmp_name'] != null) {
      $imageId = $eventId;
    }

    $updateTheEvent->updateEvent($eventId, $adminId, $title, $combinedDT, $description, $imageId, $locate);

    if ($_FILES["eventPicture"]['tmp_name'] != null) {
      uploadImage($db->getConnection(), $_FILES["eventPicture"], $imageId); //imageId
    } 
    echo '<script>location.href="/admin/event"</script>';
  }
  ?>
  <script type="text/javascript">
    var event_array = <?php echo json_encode($all_activities) ?>;
  </script>
  <script type="module" src="/js/Admin/Admin-UpdateEventPage.js"></script>

  <main class="container-fluid height-after-minus-header" id='main-body'>
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-lg-8 pb-5" id="right-content">
        <br>
        <h1>
          Update Event <br>
        </h1>

        <form method="post" onsubmit="return checkvalidation()" enctype="multipart/form-data">
          <div id="updateForm">
            <div class="form-group">

              <label for="formGroupExampleInput">Event Title :</label>
              <input type="text" class="form-control rounded-0 w-75 p-3" id="title" name="title" placeholder="Enter new event title" value="<?php echo "$title"; ?>" required>
              <div class="valid-feedback">Valid.</div>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide the title of the event.
              </div>
            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2">Schedule :</label> <br>
              <input type=date value="" id="date" name="date"> &nbsp;
              <input type=time value="" id="time" name="time">
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide both date and time of the event.
              </div>
            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2">Description :</label>
              <textarea type="text" class="form-control rounded-0" id="description" name="description" placeholder="Enter new schedule" value="<?php echo $description; ?>" rows="8"></textarea>
              <div class="valid-feedback">Valid.</div>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide a brief description for the event.
              </div>

            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2">Location :</label>
              <input type="text " class="form-control rounded-0 w-75 p-3" id="location" name="locate" placeholder="Enter new location" value="<?php echo "$locate"; ?>">
              <div class="valid-feedback">Valid.</div>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide the location of the event.
              </div>
            </div>

            <?php $img_Path = "../../../../public/Assets/imgs/" ?>
            <div class="w-25 position-relative">
              <label for="phfile">Event Picture:</label>
              <div class="picture-container">
                <div class="picture">
                  <img src="<?php echo "$img_Path$imageId"; ?>" id="prevImage" alt="update Image" width="150" length="150">
                  <input type="file" id="wizard-picture" name="imageId">
                  <input type="file" name="eventPicture" id="eventPicture" class="d-none">
                </div>
              </div>
              <h6 id="choosePictureDescription"></h6>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide a picture for the event.
              </div>
            </div>
          </div>
          <!-- <input type="hidden" name="title" value=php echo $_GET['title'];?>> -->
          <input type="submit" name="update" id="saveButton" class="btn btn-primary float-right ml-2"></input>
          <button id="cancelButton" onclick="cancelUpdate()" type="button" class="btn btn-outline-secondary float-right">Cancel</button>

        </form>
        <!-- modal -->
        <div class="modal fade" id="cancelChangesModal" tabindex="-1" aria-labelledby="cancelChangesModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="cancelChangesModalLabel">Confirm Navigation</h5>
                <button id="closeCancelChangesModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                You have made changes. They will be lost if you continue.
                Are you sure you want to leave this page?
              </div>
              <div class="modal-footer">
                <a href="/admin/event"><button type="button" class="btn btn-outline-secondary">Leave this
                    Page</button></a>
                <button id="stayButton" type="button" class="btn btn-primary" data-dismiss="modal">Stay on this
                  Page</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script type="text/javascript" src="/js/Admin/Admin-EventValidate.js"></script>
  <?php include_once '../src/templates/GeneralScripts.php' ?>


  </body>

  </html>