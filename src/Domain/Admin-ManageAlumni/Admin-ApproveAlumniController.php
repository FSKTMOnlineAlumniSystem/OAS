<?php
include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

  if(isset($_POST['alumniId'])) {
    $alumniId = $_POST['alumniId'];
    $adminId = $_SESSION['admin']['adminId'];
    $updateApprove = new  UpdateAlumniModel($db->getConnection());
    $updateApprove->updateApprovedby($adminId,$alumniId);
      echo json_encode($updateApprove);
    }
  ?>