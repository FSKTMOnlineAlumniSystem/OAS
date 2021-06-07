<?php
include '../src/Domain/Job/JobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$searchModel = new  AlumniListModel($db->getConnection());

       $searchterm = $_POST['search'];
       $searchAlumni = $searchModel->search($searchterm);

      for($i=0; $i<count($searchAlumni); $i++){
        $alumniId = $searchAlumni[$i]['alumniId'];
        $image = $searchModel->getSearch($alumniId);
        $searchAlumni[$i]['imageId'] = $image;
      }

      
        echo json_encode($searchAlumni);
      
    
exit;
?>