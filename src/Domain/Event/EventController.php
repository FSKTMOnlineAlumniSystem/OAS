<?php
include '../src/Domain/Event/EventModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myJob_model = new EventModel($db->getConnection());

// if( isset($_POST['ajax']) && isset($_POST['deleteID']) ){
//     $deleteID =  $_POST['deleteID'];
//     // $myJob = $myJob_model->deleteJob($deleteID);
//     // $myJob_model->deleteJobImage($deleteID);
//     // $updatedJob = $myJob_model->getRow("AL-1");
//     // $image = $myJob_model->getJobImage("AL-1");

//     for ($i=0; $i< count($updatedJob); $i++){
//         $updatedJob[$i]['imageId'] = $image[$i];
//     }
//     echo json_encode($updatedJob);

//    }
// 
if (isset($_POST['ajax']) && isset($_POST['eventId'])) {
    header('Content-type: application/json');
    $arr = array(1 => "10");
    // echo json_encode($_POST['eventId']);
    echo json_encode($arr);
    // $myJob = $myJob_model->deleteJob($deleteID);
    // $myJob_model->deleteJobImage($deleteID);
    // $updatedJob = $myJob_model->getRow("AL-1");
    // $image = $myJob_model->getJobImage("AL-1");

    // for ($i=0; $i< count($updatedJob); $i++){
    //     $updatedJob[$i]['imageId'] = $image[$i];
    // }
    // echo json_encode($updatedJob);
}else{
    // echo $_POST;
    echo "oh no can't get the body";
    foreach($_POST as $key => $value){
        echo $key. " ". $value;
    }
    echo $_POST['ajax'];
    echo $_POST['eventId'];
}

// <!-- SELECT * FROM `job` WHERE CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%".$searchterm."%' ORDER BY postedDateTime DESC -->
?>