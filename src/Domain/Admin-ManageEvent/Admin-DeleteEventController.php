<?php
include '../src/Domain/Admin-ManageEvent/Admin-EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

if(isset($_POST['modal'])){
  // echo("success");
  exit;
}
$output=[];
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

  for($i=0; $i<count($updatedEventArray); $i++){
    $eventID = $updatedEventArray[$i]['eventId'];
    $image = $deleteEvent->getSearch($eventID);
    $updatedEventArray[$i]['imageId'] = $image;
  }  
  $output=$updatedEventArray;
  }
  else{
    $searchterm = $_POST['search'];
    $searchEvent = $deleteEvent->search($searchterm);
   for($i=0; $i<count($searchEvent); $i++){
     $eventID = $searchEvent[$i]['eventId'];
     $image = $deleteEvent->getSearch($eventID);
     $searchEvent[$i]['imageId'] = $image;
   }      
  $output=$searchEvent;
  }
}else if(isset($_POST["deleteEvent"])){
  DeleteRowPhp($_POST["deleteEvent"]);  
  $deleteEvent = new Admin_EventModel($db->getConnection());	
  if($_POST['search']==""){
  $updatedEventArray = $deleteEvent->getAll();
  for($i=0; $i<count($updatedEventArray); $i++){
    $eventID = $updatedEventArray[$i]['eventId'];
    $image = $deleteEvent->getSearch($eventID);
    $updatedEventArray[$i]['imageId'] = $image;
  }      
  $output=$updatedEventArray;
  }else{
    $searchterm = $_POST['search'];
       $searchEvent = $deleteEvent->search($searchterm);
      for($i=0; $i<count($searchEvent); $i++){
        $eventID = $searchEvent[$i]['eventId'];
        $image = $deleteEvent->getSearch($eventID);
        $searchEvent[$i]['imageId'] = $image;
      }      
  $output=$searchEvent;
  }
}
        echo json_encode($output);
?>