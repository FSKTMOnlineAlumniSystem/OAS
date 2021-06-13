<?php
include '../src/Domain/Admin-ManageEvent/Admin-EventModel.php';
include '../src/Domain/Database.php';

  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  function inviteAlumniPhp($alumniId,$eventId,$dateTime){
    global $db;
      $inviteAlumni = new InviteAlumniModel($db->getConnection());	
    $inviteAlumni-> InviteAlumni($alumniId,$eventId,$dateTime);
  };
  
  if(isset($_POST["checkbox"])){
  
  $alumniId = $_POST['alumniId']; $alumniId=explode(",",$alumniId); //split
  $eventId = $_POST['eventId']; $eventId=explode(",",$eventId);
  $dateTime = $_POST['dateTime']; $dateTime=explode(",",$dateTime);
  
  for($i=0; $i<count($alumniId);$i++){
    inviteAlumniPhp($alumniId[$i],$eventId[$i],$dateTime[$i]);  
  }
  $invitedAlumni = new InviteAlumniModel($db->getConnection());	
  $updatedAlumniArray = $invitedAlumni->getAll();
  echo json_encode($updatedAlumniArray);
  }
  else if(isset($_POST["alumniId"])){
    inviteAlumniPhp($_POST["alumniId"],$_POST["eventId"],$_POST["dateTime"]);  
    $invitedAlumni = new InviteAlumniModel($db->getConnection());	
    $updatedAlumniArray = $invitedAlumni->getAll();
    echo json_encode($updatedAlumniArray);
}


    // setcookie("alumniId", "");
    // setcookie("eventId", "");
    // setcookie("dateTime", "");
    // setcookie("checkbox", "");

    //   setcookie("inviteAlumni", "", time()-3600);
    // setcookie("alumniId", "");
    // setcookie("eventId", "");
    // setcookie("dateTime", "");
  ?>

