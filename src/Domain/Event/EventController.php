<?php
include_once '../src/Domain/Event/EventModel.php';
include_once '../src/Domain/Database.php';

try {
  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
  $event_model = new EventModel($db->getConnection());
} catch (Exception $e) {
  // echo "Exception: " . $e->getMessage();
  error_log("Exception: " . $e->getMessage());
  include_once '../src/templates/header.php';
  include_once '../src/Domain/General_Pages/server_error.php';
  exit();
}
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
