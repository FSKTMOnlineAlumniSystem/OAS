<?php
include '../src/Domain/Job/JobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new  JobModel($db->getConnection());

// if(isset($_POST['search']){
       $searchterm = $_POST['search'];
    //    echo($searchterm);
       $searchJob = $myJob_model->search($searchterm);
    //    print_r($searchJob);
    //    echo json_encode($searchterm);
//     $updatedJob = $myJob_model->getRow("AL-1");
    echo json_encode($searchJob);
//    }
exit;
?>