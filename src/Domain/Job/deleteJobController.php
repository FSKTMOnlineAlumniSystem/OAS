<?php
include_once '../src/Domain/Job/MyJobModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new  MyJobModel($db->getConnection());

if(isset($_POST['modal'])){
    echo("success");
    exit;
    
}

$updatedJob = [];

if( isset($_POST['deleteID']) ){
    $deleteID =  $_POST['deleteID'];
    $searchDelete = $_POST['searchdeleted'];
    $myJob = $myJob_model->deleteJob($deleteID);
    $myJob_model->deleteJobImage($deleteID);

    if(isset($_POST['searchdeleted'])){
        $searchterm = $_POST['searchdeleted'];
        $updatedJob = $myJob_model->search($searchterm,$_SESSION['alumni']['alumniId'] );

        for($i=0; $i<count($updatedJob); $i++){
            $jobID = $updatedJob[$i]['jobId'];
            $image = $myJob_model->getSearch($jobID);
            $updatedJob[$i]['imageId'] = $image;
        }
    }
    else{
        $updatedJob = $myJob_model->getRow($_SESSION['alumni']['alumniId'] );
        $image = $myJob_model->getJobImage($_SESSION['alumni']['alumniId'] );
        for ($i=0; $i< count($updatedJob); $i++){
            $updatedJob[$i]['imageId'] = $image[$i];
        }
      
    }
 }
   echo json_encode($updatedJob);
 
?>
