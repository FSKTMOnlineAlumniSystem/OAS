<?php
include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';


if (isset($_POST['deleteAlumniId'])) {
  try {
      $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
      $deleteAlumniId = $_POST['deleteAlumniId'];
      $deleteAlumni = new DeleteAlumniModel($db->getConnection());
      $deleteTheAlumni = $deleteAlumni->deleteAlumni($deleteAlumniId);
      $all_activities = $deleteAlumni->getAll();
      $allImage = $deleteAlumni->getProfilePicture();
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }
    for ($i=0; $i< count($all_activities); $i++){
      if($allImage[$i] == null){
        $all_activities[$i]['imageId'] = "/Assets/imgs/default_user.png";
      }else
      $all_activities[$i]['imageId'] = $allImage[$i];
    }
    echo json_encode($all_activities);
}
