<?php
include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';


if (isset($_POST['listOfDeleteAlumniId'])) {
  $alumniId = $_POST['listOfDeleteAlumniId'];
  $alumniId = explode(",",$alumniId); //split
  try {
      $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
      $deleteMultipleAlumni = new  DeleteAlumniModel($db->getConnection());
      for($i=0; $i<count($alumniId);$i++){	
        $deleteMultipleAlumni-> deleteAlumni($alumniId[$i]);
        }
        $all_activities = $deleteMultipleAlumni->getAll();
        $allImage = $deleteMultipleAlumni->getProfilePicture();
    } catch (Exception $e) {
        // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
    }
      for ($i=0; $i< count($all_activities); $i++){
        if($allImage[$i] == null){
          $all_activities[$i]['imageId'] = "/Assets/imgs/default_user.png";
        }else
        $all_activities[$i]['imageId'] = $allImage[$i];
      }
      echo json_encode($all_activities);
  }
