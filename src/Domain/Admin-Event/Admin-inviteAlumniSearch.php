<?php
include_once '../src/Domain/Admin-Event/Admin-EventModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$alumni_model = new AlumniModel($db->getConnection());
// $eventId=$_GET['eventId'];

if(isset($_POST['search'])){
       $searchterm = $_POST['search'];
       $searchAlumni = $alumni_model->search($searchterm);
      for($i=0; $i<count($searchAlumni); $i++){
        $alumniID = $searchAlumni[$i]['alumniId'];
        $image = $alumni_model->getSearch($alumniID);
        $searchAlumni[$i]['imageId'] = $image;
      }      
      print_r($searchAlumni);
        echo json_encode($searchAlumni);
exit;
    }
    ?>