<?php
include '../src/Domain/Job/MyJobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new  MyJobModel($db->getConnection());

if(isset($_POST['modal'])){
    echo("success");
}


if( isset($_POST['ajax']) && isset($_POST['deleteID']) ){
    $deleteID =  $_POST['deleteID'];
    $myJob = $myJob_model->deleteJob($deleteID);
    $myJob_model->deleteJobImage($deleteID);
    $updatedJob = $myJob_model->getRow("AL-1");
    $image = $myJob_model->getJobImage("AL-1");

    for ($i=0; $i< count($updatedJob); $i++){
        $updatedJob[$i]['imageId'] = $image[$i];
    }
    echo json_encode($updatedJob);
   
   }
?>
