<?php
include '../src/Domain/Admin-Event/Admin-EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

function DeleteRowPhp($eventId){
  global $db;
    $deleteEvent = new Admin_EventModel($db->getConnection());	
  $deleteEvent-> deleteEvent($eventId);
};

if(isset($_POST["checkbox"])){
  $eventId=$_POST["deleteEvent"];
  $eventId=explode(",",$eventId);
  for($i=count($eventId)-1; $i>=0;$i--){
    DeleteRowPhp($eventId[$i]);  
  }
  $deleteEvent = new Admin_EventModel($db->getConnection());	
  $updatedEventArray = $deleteEvent->getAll();
  echo json_encode($updatedEventArray);
  exit();
}else if(isset($_POST["deleteEvent"])){
  DeleteRowPhp($_POST["deleteEvent"]);  
  $deleteEvent = new Admin_EventModel($db->getConnection());	
  $updatedEventArray = $deleteEvent->getAll();
  echo json_encode($updatedEventArray);
  exit();
}
?>