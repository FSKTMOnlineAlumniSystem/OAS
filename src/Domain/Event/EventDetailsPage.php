<?php
// connect to database to access the needed data
include '../src/Domain/Event/EventModel.php';
include '../src/Domain/Event/Alumni_EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
if(isset($_GET['eventId'])) echo $_GET['eventId'];
else echo 'No $_GET["eventId"]';
try {
  $event_model = new EventModel($db->getConnection());
  $all_events = $event_model->getAll();
} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
try {
  $event_model = new Alumni_EventModel($db->getConnection());
  $all_alumni_events = $event_model->getAll();
} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
try {
  $event_model = new EventModel($db->getConnection());
  $event = $event_model->getEvent($_GET['eventId']);
  // echo gettype($event);
  // echo $event['eventId'].'<br>';
  // foreach($event as $key => $value){
  //   echo $key.'=>'.$value.'<br>';
  // }
} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
?>
<?php
include '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/EventPage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include '../src/templates/nav.php';
?>

<div class="container my-5" id="main-body">
  <div class="row">
    <div class="col-0 col-md-1 col-lg-2">
    </div>
    <div class="col-12 col-md-10 col-lg-8">
      <div class="row align-items-center">
        <div class="col-12">
          <a href="../../html/Alumni/EventPage.html" class="btn btn-link back">
            <i class="fas fa-chevron-left fa-2x"></i>
          </a>
          <h3 class="d-inline"><?= $event['title']?></h3>
        </div>
      </div>

      <hr style="
        height: 3px;
        border-width: 0;
        color: rgb(0, 0, 0);
        background-color: black;
      " />
      <div class="row">
        <div class="col-12 col-md-6 d-flex justify-content-center mb-3">
          <img src="/Assets/imgs/${imageId}" class="image--max-size-100-percent" alt="Event Poster " />
        </div>
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
          <div class='row my-3'>
            <div class='col-4 d-flex justify-content-center'>
              <i class="far fa-calendar-alt fa-3x" style="color: rgb(218, 58, 47); font-size: 50px"></i>
            </div>
            <div class='col-8 d-flex align-items-center'>
              <span class="icon_Text pt-3 pt-sm-0">${getReadableDate(dateTime)}</span>
            </div>
          </div>
          <div class='row my-3'>
            <div class='col-4 d-flex justify-content-center'>
              <i class="far fa-clock fa-3x" style="color: rgb(118, 172, 250); font-size: 50px"></i>
            </div>
            <div class='col-8 d-flex align-items-center'>
              <span class="icon_Text pt-3 pt-sm-0">${getReadableTime(dateTime)}</span>
            </div>
          </div>
          <div class='row my-3'>
            <div class='col-4 d-flex justify-content-center'>
              <i class="fas fa-map-marked-alt fa-3x" style="color: rgb(167, 0, 0); font-size: 50px"></i>
            </div>
            <div class='col-8 d-flex align-items-center'>
              <span class="icon_Text pt-3 pt-sm-0">${theEvent.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include '../src/templates/footer.php' ?>
<?php
include '../src/templates/GeneralScripts.php'
?>
<!-- custom js files -->

</body>

</html>