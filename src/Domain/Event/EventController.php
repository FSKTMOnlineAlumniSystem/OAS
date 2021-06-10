<?php
include_once '../src/Domain/Event/EventModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$event_model = new EventModel($db->getConnection());

if (isset($_GET['search'])) {
  // echo $_GET['search'];
  header('Content-type: application/json');
  // $arr = $event_model->getAll();
  $arr = array("Message" => "Success Request");
  echo json_encode($arr);
} else {
  http_response_code(400);
  header('Content-type: application/json');
  $arr = array("Error Message" => "Bad Request");
  echo json_encode($arr);
}

// <!-- SELECT * FROM `job` WHERE CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%".$searchterm."%' ORDER BY postedDateTime DESC -->
