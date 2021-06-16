<?php
include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';


if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $department = $_POST['department'];
    $status = $_POST['status'];
    try {
        $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
        $search = new  AlumniListModel($db->getConnection());	
        $searchSearch = $search-> search($name, $department, $status);
        for($i=0; $i<count($searchSearch); $i++){
            $alumniId = $searchSearch[$i]['alumniId'];
            $image = $search->getSearch($alumniId);
            $searchSearch[$i]['imageId'] = $image;
          }  
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
      echo json_encode($searchSearch);
  }

  ?>