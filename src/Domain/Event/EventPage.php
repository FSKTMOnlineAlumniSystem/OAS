<?php
// connect to database to access the needed data
include_once '../src/Domain/Event/EventModel.php';
include_once '../src/Domain/Event/AlumniEventModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $event_model = new EventModel($db->getConnection());
  $all_events = $event_model->getAll();
  $alumni_event_model = new AlumniEventModel($db->getConnection());
  $all_alumni_events = $alumni_event_model->getAll();
  echo count($all_events);
} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
?>
<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/EventPage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>

<div class="container my-5" id="main-body">
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
  <h1><b>Event</b></h1>
  <hr />
  <div class="row justify-content-md-center text-center" id="no_result"></div>
  <div id="event-page-section">
    <h2 id="your-upcoming-event-section-title">Your Upcoming Events</h2>
    <br />
    <div class="row" id="your-upcoming-event-section">
      <?php
      foreach ($all_events as $event) {

      ?>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <a href="/eventdetails?eventId=<?= $event['eventId'] ?>" target="_self" id="<?= $event['eventId'] ?>-card" class="nostyle">
            <div class="card h-100 card--bg-light-gray">
              <div style="aspect-ratio:1/1;" class="d-flex align-items-center custom-dark-gray">
                <img src=<?= is_null($event['imageData'])? './Assets/imgs/default_events.jpg': 'data::' . $event['type'] . ';base64,' . base64_encode($event['imageData']) ?> class="card-img-top image__fixed-height m-auto w-100" alt="eventPhoto">
              </div>
              <div class="card-body event-card-body">
                <h5 class="card-title"><?= $event['title'] ?></h5>
                <p class="card-text">
                <div class="row cards">
                  <div class="col-2"><i class="far fa-calendar-alt" style="color: rgb(218, 58, 47);"></i>
                  </div>
                  <div class="col-10" data-datetime="date"><?= $event['dateTime'] ?></div>
                </div>
                <div class="row cards">
                  <div class="col-2"><i class="far fa-clock text-primary"></i></div>
                  <div class="col-10" data-datetime="time"><?= $event['dateTime'] ?></div>
                </div>
                <div class="row cards">
                  <div class="col-2"><i class="fas fa-map-marked-alt text-danger"></i></div>
                  <div class="col-10"><?= $event['location'] ?></div>
                </div>
                </p>
              </div>
            </div>
          </a>
        </div>
      <?php } ?>
    </div>
    <br />

    <h2 id="upcoming-event-section-title">Other Upcoming Events</h2>
    <br />
    <div class="row" id="upcoming-event-section"></div>
  </div>
</div>
</div>

<?php include_once '../src/templates/footer.php' ?>
<?php
include_once '../src/templates/GeneralScripts.php'
?>
<!-- custom js files -->
<script type="module" src="/js/Alumni/EventPage.js"></script>
<!-- <script type="text/javascript" src="/js/addSearchBar.js"></script> -->
<!-- <script type="module" src="/js/Alumni/searchAlgo.js"></script> -->

</body>

</html>