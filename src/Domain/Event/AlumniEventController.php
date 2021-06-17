<?php
include_once '../src/Domain/Event/AlumniEventModel.php';
include_once '../src/Domain/Database.php';
try {
  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
  $alumni_event_model = new AlumniEventModel($db->getConnection());
} catch (Exception $e) {
  // echo "Exception: " . $e->getMessage();
  error_log("Exception: " . $e->getMessage());
  include_once '../src/templates/header.php';
  include_once '../src/Domain/General_Pages/server_error.php';
  exit();
}

if (isset($_POST['eventId']) && isset($_POST['column'])) {
  header('Content-type: application/json');
  if ($_POST['column'] === 'notificationClosedByAlumni') {
    $alumni_event_model->setNotificationClosedTrue($_POST['eventId']);
    $arr = array("Message" => "notificationClosedByAlumni updated.");
    echo json_encode($arr);
  } else if ($_POST['column'] === 'viewedByAlumni') {
    $alumni_event_model->setViewedByAlumniTrue($_POST['eventId']);
    $arr = array("Message" => "viewedByAlumni updated.");
    echo json_encode($arr);
  }
} else {
  http_response_code(400);
  header('Content-type: application/json');
  $arr = array("Error Message" => "Bad Request");
  echo json_encode($arr);
}

// <!-- SELECT * FROM `job` WHERE CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%".$searchterm."%' ORDER BY postedDateTime DESC -->
