<?php
include '../src/Domain/AlumniList/AlumniListModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  if(isset($_POST['alumniId'])) {
    $alumniId = $_POST['alumniId'];
    $adminId = $_SESSION['admin']['adminId'];
    $updateApprove = new  UpdateAlumniModel($db->getConnection());
    $updateApprove->updateApprovedby($adminId,$alumniId);
    $all_activities=$updateApprove->getAll();
      $allImage = $updateApprove->getProfilePicture();
      for ($i=0; $i< count($all_activities); $i++){
        if($allImage[$i] == null){
          $all_activities[$i]['imageId'] = "/Assets/imgs/default_user.png";
        }else
        $all_activities[$i]['imageId'] = $allImage[$i];
      }
      echo json_encode($all_activities);
    }
  ?>