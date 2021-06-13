<?php
include '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $department = $_POST['department'];
    $status = $_POST['status'];
    $search = new  AlumniListModel($db->getConnection());	
    $searchSearch = $search-> search($name, $department, $status);
    for($i=0; $i<count($searchSearch); $i++){
        $alumniId = $searchSearch[$i]['alumniId'];
        $image = $search->getSearch($alumniId);
        $searchSearch[$i]['imageId'] = $image;
      }  
      echo json_encode($searchSearch);
  }

  ?>