<?php
include '../src/Domain/AlumniList/AlumniListModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $department = $_POST['department'];
    $status = $_POST['status'];
    $search = new  AlumniListModel($db->getConnection());	
    $searchSearch = $search-> search($name, $department, $status);
    $allImage = $search->getProfilePicture();
    for ($i=0; $i< count($searchSearch); $i++){
      if($allImage[$i] == null){
        $searchSearch[$i]['imageId'] = "/Assets/imgs/default_user.png";
      }else
      $searchSearch[$i]['imageId'] = $allImage[$i];
    }
    //   $allImage = $deleteMultipleAlumni->getProfilePicture();
    //   for ($i=0; $i< count($all_activities); $i++){
    //     if($allImage[$i] == null){
    //       $all_activities[$i]['imageId'] = "/Assets/imgs/default_user.png";
    //     }else
    //     $all_activities[$i]['imageId'] = $allImage[$i];
    //   }
      echo json_encode($searchSearch);
  }

  ?>