<?php
include '../src/Domain/AlumniList/AlumniListModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

if (isset($_POST['listOfDeleteAlumniId'])) {
    $alumniId = $_POST['listOfDeleteAlumniId'];
    $count =$_POST['count'];
    $alumniId = explode(",",$alumniId); //split
    $deleteMultipleAlumni = new  DeleteAlumniModel($db->getConnection());
    for($i=0; $i<$count;$i++){	
      $deleteMultipleAlumni-> deleteAlumni($alumniId[$i]);
      }
    $all_activities = $deleteMultipleAlumni->getAll();
    echo json_encode($all_activities);
  }

  ?>