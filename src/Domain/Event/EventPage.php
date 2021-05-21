<?php
// connect to database to access the needed data
include '../src/Domain/Event/EventModel.php';
include '../src/Domain/Event/Alumni_EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

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
?>
<?php
include '../src/utilities/includeWithVariable.php' ?>
<?php
// include '../src/templates/header.php';
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/EventPage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include '../src/templates/nav.php';
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

<?php include '../src/templates/footer.php' ?>
<?php 
// include '../src/templates/GeneralScripts.php' 
?>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script> -->
<!-- custom js files -->
<script type="module" src="/js/Alumni/EventPage.js"></script>
<script type="text/javascript" src="/js/addSearchBar.js"></script>
<script type="module" src="/js/Alumni/searchAlgo.js"></script>

</body>

</html>