<?php
include '../src/Domain/Job/MyJobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new  MyJobModel($db->getConnection());

if( isset($_POST['ajax']) && isset($_POST['deleteID']) ){
    // $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
    $deleteID =  $_POST['deleteID'];
    $myJob = $myJob_model->deleteJob($deleteID);
    // header('Cache-Control: no-store, no-cache, must-revalidate');
    // exit;
    $updatedJob = $myJob_model->getRow("AL-1");
    // print_r($updatedJob);
    echo json_encode($updatedJob);
   
   }
?>