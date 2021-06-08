<?php
include '../src/Domain/Job/JobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new  JobModel($db->getConnection());

       $searchterm = $_POST['search'];
       $searchJob = $myJob_model->search($searchterm);

      for($i=0; $i<count($searchJob); $i++){
        $jobID = $searchJob[$i]['jobId'];
        $image = $myJob_model->getSearch($jobID);
        $searchJob[$i]['imageId'] = $image;
      }

      
        echo json_encode($searchJob);
      
    
exit;
?>