<?php
include_once '../src/Domain/Admin-ManageEvent/Admin-EventModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$event_model = new Admin_EventModel($db->getConnection());

if(isset($_POST['search'])){
       $searchterm = $_POST['search'];
       $searchEvent = $event_model->search($searchterm);
      for($i=0; $i<count($searchEvent); $i++){
        $eventID = $searchEvent[$i]['eventId'];
        $image = $event_model->getSearch($eventID);
        $searchEvent[$i]['imageId'] = $image;
      }      
        echo json_encode($searchEvent);
exit;
    }
    ?>