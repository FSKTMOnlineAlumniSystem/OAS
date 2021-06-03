<?php
include '../src/Domain/Job/MyJobModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new  MyJobModel($db->getConnection());

// if(isset($_POST['search']){
       $searchterm = $_POST['search'];
    //    echo($searchterm);
       $searchJob = $myJob_model->search($searchterm,"AL-1");
    //    print_r($searchJob);
    //    echo json_encode($searchterm);
//     $updatedJob = $myJob_model->getRow("AL-1");
        for($i=0; $i<count($searchJob); $i++){
            $jobID = $searchJob[$i]['jobId'];
            $image = $myJob_model->getSearch($jobID);
            $searchJob[$i]['imageId'] = $image;
        }


    echo json_encode($searchJob);
//    }
exit;
?>

<!--     $deleteID =  $_POST['deleteID'];
    $myJob = $myJob_model->deleteJob($deleteID);
    // header('Cache-Control: no-store, no-cache, must-revalidate');
    // exit;
    $updatedJob = $myJob_model->getRow("AL-1");
    // print_r($updatedJob);
    echo json_encode($updatedJob); -->