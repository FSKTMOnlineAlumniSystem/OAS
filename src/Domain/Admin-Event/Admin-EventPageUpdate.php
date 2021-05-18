<?php
include '../src/Domain/header.php';
?>
<!-- <link rel="stylesheet" type="text/css" href="/public/css/Alumni/EventPage.css" /> -->
<link rel="stylesheet" href="/css/Admin/Admin-EventPageCreate.css">
<title>Update Event - Online Alumni System</title>
</head>
<body>
 <?php
// include '../../../config/config.php';
include '../src/Domain/Admin-Event/Admin-EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
// $title=$_GET['title'];
try {
  $event_model = new Admin_EventModel($db->getConnection());
  $all_activities = $event_model->getAll();
  if (!empty($all_activities)) {

    foreach ($all_activities as $res) {

  //     if($res['title']==$title){
	// $eventId = $res['eventId'];
	// $adminId = $res['adminId'];
	// $title = $res['title'];
	// $dateTime = $res['dateTime'];
	// $description = $res['description'];
	// $locate = $res['location'];
	// $imageId = $res['imageId'];
  
  // echo "$locate ";
  // echo "$imageId";
      // }
}

    }
} catch (Exception $e) {
  echo "Exception here!";
}


if(isset($_POST['update'])){
  try {
    // begin a transaction
    $db->beginTransaction();
    // a set of queries: if one fails, an exception will be thrown
    $sql = "UPDATE users SET eventId='$eventId',adminId='$adminId',title='$title' ,dateTime='$dateTime',description='$description',location='$locate'，imageId='$imageId' WHERE title=$title";
    $db->query($sql);//run the query & returns a PDOStatement object
    // if we arrive here, it means that no exception was thrown
    // which means no query has failed, so we can commit the
    // transaction
    $db->commit();
  } catch (Exception $e) {
    // we must rollback the transaction since an error occurred
    // with insert
    $db->rollback();
  }
}
?>

<main class="container-fluid height-after-minus-header" id='main-body'>
      <div class="row h-100">
        
      <div class="container" id="right-content">
        <br>
    <h1>
      Update Event <br>
    </h1>
        <a button type="button" class="btn btn-info float-right ml-2 btn-sm" href="inviteAlumni">
          <i class="fas fa-user-plus"></i>
          Invite Alumni</a>
        <form method="post" action="">
          <div id="updateForm">
            <div class="form-group">
  
              <label for="formGroupExampleInput">Event Title :</label>
              <input type="text" class="form-control rounded-0 w-75 p-3" id="title" placeholder="Enter new event title"
                value="<?php echo "$title";?>" required>
              <div class="valid-feedback">Valid.</div>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide the title of the event.
              </div>
            </div>

            

            <div class="form-group">
              <label for="formGroupExampleInput2">Schedule :</label> <br>
              <input type=date value="" id="date"> &nbsp;
              <input type=time value="" id="time">

              <script>
              var d = new Date(<?php $dateTime ?>); //change this thing
              var todayDate = d.toISOString().slice(0, 10);
              let hour = d.getHours();
              let minute = d.getMinutes().toString();
              minute = minute.padStart(2, '0');
              document.getElementById('date').value=todayDate
              document.getElementById('time').value=hour +':'+ minute
            </script>


              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide both date and time of the event.
              </div>
            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2">Description :</label>
              <textarea type="text" class="form-control rounded-0" id="description" placeholder="Enter new schedule"
                value=<?php echo "$description";?> rows="5"
                ;><?php echo "$description";?></textarea>
              <div class="valid-feedback">Valid.</div>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide a brief description for the event.
              </div>

            </div>

            <div class="form-group">
              <label for="formGroupExampleInput2">Location :</label>
              <input type="text " class="form-control rounded-0 w-75 p-3" id="location" placeholder="Enter new location"
                value="<?php echo "$locate";?>">
              <div class="valid-feedback">Valid.</div>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide the location of the event.
              </div>
            </div>

           <?php $img_Path="../../../../public/Assets/imgs/" ?>
            <div class="w-25 position-relative">
              <label for="phfile">Event Picture:</label>
              <div class="picture-container">
                <div class="picture">
                  <img src="<?php echo "$img_Path$imageId";?>" id="prevImage" alt="update Image" width="150"
                    length="150">
                  <input type="file" id="wizard-picture">
                  
                </div>
              </div>
              <h6 id="choosePictureDescription"></h6>
              <div id="contactNumberFeedback" class="invalid-feedback">
                Please provide a picture for the event.
                
              </div>
            </div>

          </div>
				  <!-- <input type="hidden" name="title" value=<?php echo $_GET['title'];?>> -->
          <input type="submit" name="update" id="saveButton" class="btn btn-primary float-right ml-2">Save</input>
          <button id="cancelButton" type="button" class="btn btn-outline-secondary float-right">Cancel</button>

        </form>

<!-- modal -->
        <div class="modal fade" id="cancelChangesModal" tabindex="-1" aria-labelledby="cancelChangesModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="cancelChangesModalLabel">Confirm Navigation</h5>
                <button id="closeCancelChangesModalButton" type="button" class="close" data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                You have made changes. They will be lost if you continue.
                Are you sure you want to leave this page?
              </div>
              <div class="modal-footer">
                <a href="adminEvent"><button type="button" class="btn btn-outline-secondary">Leave this
                    Page</button></a>
                <button id="stayButton" type="button" class="btn btn-primary" data-dismiss="modal">Stay on this
                  Page</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </main>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>

          <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script> -->
    <script type="text/javascript" src="../../js/utility.js"></script>
    <script type="text/javascript">var event_array = <?php echo json_encode($all_activities) ?>;</script>
    <script type="module" src="/js/Admin/Admin-EventPageUpdate.js"></script>
    <script src="/libs/bootstrap.bundle.js"></script>

</body>
</html>
