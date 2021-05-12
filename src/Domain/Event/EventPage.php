<?php
include '../header.php';
include '../../../config/config.php';
include './EventModel.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $event_model = new EventModel($db->getConnection());
  $all_activities = $event_model->getAll();
  if (!empty($all_activities)) {

    foreach ($all_activities as $activity) {
      echo "$activity[eventId] ";
    }
  }
} catch (Exception $e) {
  echo "Exception here!";
}

?>

  <div class="container my-5" id="main-body">
    <h1><b>Event</b></h1>
    <hr />
    <div id="event-page-section">
      <h2 id="your-upcoming-event-section-title">Your Upcoming Events</h2>
      <br />
      <div class="row" id="your-upcoming-event-section"></div>
      <br />

      <h2 id="upcoming-event-section-title">Other Upcoming Events</h2>
      <br />
      <div class="row" id="upcoming-event-section"></div>
    </div>
  </div>
  </div>
  <!-- custom js files -->
  <script type="module" src="/src/js/Alumni/EventPage.js"></script>
  
  <?php include '../footer.php' ?>