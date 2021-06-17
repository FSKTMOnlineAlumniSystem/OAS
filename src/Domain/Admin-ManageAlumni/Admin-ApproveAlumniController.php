<?php
include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';


if (isset($_POST['alumniId'])) {
  $alumniId = $_POST['alumniId'];
  $adminId = $_SESSION['admin']['adminId'];
  try {
    $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    $updateApprove = new  UpdateAlumniModel($db->getConnection());
    $updateApprove->updateApprovedby($adminId, $alumniId);
    echo json_encode($updateApprove);
  } catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
  }
}
