<?php
// connect to database to access the needed data
include '../src/Domain/Event/EventModel.php';
include '../src/Domain/Event/Alumni_EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $event_model = new EventModel($db->getConnection());
  $all_events = $event_model->getAll();
  if (!empty($all_events)) {
    foreach ($all_events as $event) {
      echo "$event[eventId] ";
    }
  }
} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
try {
  $event_model = new Alumni_EventModel($db->getConnection());
  $all_alumni_events = $event_model->getAll();
  if (!empty($all_alumni_events)) {
  }
} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
foreach ($all_alumni_events as $alumni_event) {
  echo "$alumni_event[alumniId] ";
}

?>
<?php
include '../src/utilities/includeWithVariable.php' ?>
<?php
// include '../src/templates/header.php';
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/EventPage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
))
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
<?php
$color = "Red";
?>
<script type="text/javascript">
  let color = "<?= $color ?>";
</script>
<?php include '../src/templates/footer.php' ?>
<?php include '../src/templates/GeneralScripts.php' ?>
<!-- custom js files -->
<script type="module" src="/js/Alumni/EventPage.js"></script>
<script type="text/javascript" src="/js/addSearchBar.js"></script>
<script type="module" src="/js/Alumni/searchAlgo.js"></script>

</body>

</html>