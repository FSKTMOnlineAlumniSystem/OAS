<?php
include '../src/Domain/header.php';
?>
<!--(Create,Update)-->

 <!-- css -->
  <link rel="stylesheet" href="/css/Admin/Admin-EventPageCreate.css">

 

  <title>Create Event - Online Alumni System</title>
</head>

<body>
<?php
  // include '../config/config.php';
  include '../src/Domain/Admin-Event/Admin-EventModel.php';
  include '../src/Domain/Database.php';

  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  try {
    $event_model = new Admin_EventModel($db->getConnection());
    $all_activities = $event_model->getAll();
    if (!empty($all_activities)) {

      foreach ($all_activities as $activity) {
        echo "$activity[eventId] ";
      }
    }
  } catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
  }
  ?>
<script type="text/javascript">var event_array = <?php echo json_encode($all_activities) ?>;</script>
  <script type="text/javascript" src="/js/Admin/Admin-EventPageCreate.js"></script>

  <?php
  if(isset($_POST['Submit'])) {

    print 'it suceed';
    $addEvent = new createEventModel($db->getConnection());	
    $data = $addEvent->getMaxId();
    echo 'event id';
    echo $data;
    $eventId = "E-" . $data+1;
    $adminId = "AD-1";         //ned change
    $title = $_POST['title'];
    //dateTime
    $date =$_POST["date"];
    $time =$_POST["time"];
    $description = $_POST['description'];
    $imageId = $_POST['imageId'];
    $locate = $_POST['locate'];
    $combinedDT = date('Y-m-d H:i', strtotime("$date $time"));
    $addEvent->updateEvent($eventId,$adminId,$title,$combinedDT,$description,$imageId,$locate);
    
    // header("Location: myjob");
echo 'event id+ $data';
}else{
  echo 'die die go';
}

  ?>
    <main class="container-fluid height-after-minus-header" id='main-body'>
      <div class="row h-100">
      <div class="container" id="right-content">
    <h1>
      New Event
    </h1><br>


    <main>
      <a button type="button" class="btn btn-info float-right ml-2 btn-sm" href="inviteAlumni"
        onclick='setEventId()'>
        <i class="fas fa-user-plus"></i>
        Invite Alumni</a>

        <!-- <div id="formCheck">
        hiiiiii
        </div>
        <script>
        document.getElementById("formCheck").innerHTML =`
        <form method="post" onsubmit="return checkvalidation()">`
        </script> -->
      <form method="post" onsubmit="checkvalidation()">
      
        <div class="form-group">
          <label for="formGroupExampleInput">Event Title :</label>
          <input type="text" class="form-control rounded-0 w-75 p-3" id="title" name="title" value="" placeholder="Enter event title">

          <div class="valid-feedback">Valid.</div>
          <div id="contactNumberFeedback" class="invalid-feedback">
            Please provide the title of the event.
          </div>
        </div>


        <!-- form -->
        <div class="form-group">
          <label for="formGroupExampleInput2">Schedule :</label> <br>
          <input type=date id="date" name="date" value="">
          &nbsp;
          <input type=time id="time" name="time" value="">

          <div id="contactNumberFeedback" class="invalid-feedback">
            Please provide both date and time of the event.
          </div>
        </div>

        <div class="form-group">
          <label for="formGroupExampleInput2">Description :</label>
          <textarea type="text" class="form-control rounded-0" value="" id="description" name="description" placeholder="Enter event description"
            rows="5" style="height:100%;"></textarea>
          <div class="valid-feedback">Valid.</div>
          <div id="contactNumberFeedback" class="invalid-feedback">
            Please provide a brief description for the event.
          </div>
        </div>
       

        <div class="form-group">
          <label for="formGroupExampleInput2 ">Location :</label>
          <input type="text " class="form-control rounded-0 w-75 p-3" value="" id="location" name="locate" placeholder="Enter location">
          <div class="valid-feedback">Valid.</div>
          <div id="contactNumberFeedback" class="invalid-feedback">
            Please provide the location of the event.
          </div>
        </div>


        <div class="w-25 position-relative">
          <label for="phfile">Event Picture:</label>
        <div class="picture-container">
          <div class="picture">
            
            <img
              src="https://www.ris.org.in/sites/all/themes/ris/images/default-events.jpg"
              id="prevImage" alt="update Image" width="100%" >
            <input type="file" id="wizard-picture" name="imageId">
          </div>
        
        
        </div>
        <h6 id="choosePictureDescription"></h6>
        <div id="contactNumberFeedback" class="invalid-feedback">
        Please provide a picture for the event.
        </div>
        </div>
        <!-- ssave button -->
        <input type="submit" name="Submit" id="saveButton" class="btn btn-primary float-right ml-2" value="Submit"></button>
        <button id="cancelButton" type="button" class="btn btn-outline-secondary float-right" onclick="cancelUpdate()">Cancel</button>

        <!-- <input type="submit" name="Submit" id="submit" class="btn btn-primary float-right ml-2" value="Submit"></button> -->
     

      </form>
<!-- modal -->
      <div class="modal fade" id="cancelChangesModal" tabindex="-1" aria-labelledby="cancelChangesModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="cancelChangesModalLabel">Confirm Navigation</h5>
              <button id="closeCancelChangesModalButton" type="button" class="close" data-dismiss="modal"
                aria-label="Close" onclick="closeModal('#cancelChangesModal')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              You have made changes. They will be lost if you continue.
              Are you sure you want to leave this page?
            </div>
            <div class="modal-footer">
              <a href="adminEvent"><button type="button" class="btn btn-secondary">Leave this
                  Page</button></a>
              <button id="stayButton" type="button"  class="btn btn-primary" data-dismiss="modal" onclick="closeModal('#cancelChangesModal')">Stay on this
                Page</button>
            </div>
          </div>
        </div>
      </div>
      
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
  </div>
  
  <script type="text/javascript" src="/js/utility.js"></script>
  <!-- <script type="text/javascript">var event_array = <?php echo json_encode($all_activities) ?>;</script> -->
  <!-- <script type="text/javascript" src="/js/Admin/Admin-EventPageCreate.js"></script> -->
  <!-- <script src="/libs/bootstrap.bundle.js"></script> -->
  <!-- <script type='module' src='/src/js/addHeader.js'></script> -->
  </main>

</body>
<br>
</html>