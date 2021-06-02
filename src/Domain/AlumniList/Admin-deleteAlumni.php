<?php
include '../src/Domain/AlumniList/AlumniListModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  ?>
  
  <?php
  
  if (isset($_POST['deleteAlumniId'])) {
    $deleteAlumniId = $_POST['deleteAlumniId'];
    $deleteAlumni = new  DeleteAlumniModel($db->getConnection());
    $deleteTheAlumni = $deleteAlumni->deleteAlumni($deleteAlumniId);
    $all_activities = $deleteAlumni->getAll();
    echo json_encode($all_activities);
}

  ?>