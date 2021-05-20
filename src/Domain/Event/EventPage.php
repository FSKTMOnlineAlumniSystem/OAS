<?php
include '../src/Domain/header.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/EventPage.css" />

<title><?= $GLOBALS['title']; ?></title>
</head>

<body>

  <?php
  // include '../config/config.php';
  include '../src/Domain/Event/EventModel.php';
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
  <?php include '../src/Domain/footer.php' ?>
  <!-- custom js files -->
  <script type="module" src="/js/Alumni/EventPage.js"></script>
  <script type="text/javascript" src="/js/addNavFooter.js"></script>
  <script type="text/javascript" src="/js/addSearchBar.js"></script>
  <script type="module" src="/js/Alumni/searchAlgo.js"></script>

</body>

</html>
