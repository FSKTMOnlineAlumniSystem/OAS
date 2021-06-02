<?php
include '../src/Domain/AlumniList/AlumniListModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  if(isset($_POST['alumniId'])) {
    $alumniId = $_POST['alumniId'];
    $adminId = $_POST['signedInAdminId'];
    $updateApprove = new  UpdateAlumniModel($db->getConnection());
    $updateApprove->updateApprovedby($adminId,$alumniId);
    $all_activities=$updateApprove->getAll();
    echo json_encode($all_activities);
    }
  ?>