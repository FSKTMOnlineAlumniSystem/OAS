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
  if($_POST['search']==""){
  $updatedEventArray = $deleteEvent->getAll();
  echo json_encode($updatedEventArray);
  exit();
  }
  else{
    $searchterm = $_POST['search'];
    $searchEvent = $deleteEvent->search($searchterm);
   for($i=0; $i<count($searchEvent); $i++){
     $eventID = $searchEvent[$i]['eventId'];
     $image = $deleteEvent->getSearch($eventID);
     $searchEvent[$i]['imageId'] = $image;
   }      
     echo json_encode($searchEvent);
exit;
  }
}else if(isset($_POST["deleteEvent"])){
  DeleteRowPhp($_POST["deleteEvent"]);  
  $deleteEvent = new Admin_EventModel($db->getConnection());	
  if($_POST['search']==""){
  $updatedEventArray = $deleteEvent->getAll();
  echo json_encode($updatedEventArray);
  exit();
  }else{
    $searchterm = $_POST['search'];
       $searchEvent = $deleteEvent->search($searchterm);
      for($i=0; $i<count($searchEvent); $i++){
        $eventID = $searchEvent[$i]['eventId'];
        $image = $deleteEvent->getSearch($eventID);
        $searchEvent[$i]['imageId'] = $image;
      }      
        echo json_encode($searchEvent);
    exit;
  }
}
?>