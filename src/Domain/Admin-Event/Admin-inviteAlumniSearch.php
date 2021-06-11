<?php
include_once '../src/Domain/Admin-Event/Admin-EventModel.php';
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$alumni_model = new AlumniModel($db->getConnection());
$result = $alumni_model->getAll();
// print_r($result);

if(isset($_POST['status'])){
    if($_POST['status']!="All"){
      $statusTerm = $_POST['status'];
      $alumniStatus = $alumni_model->searchStatus($statusTerm,$_POST['eventId']);      
      for($i=0; $i<count($alumniStatus); $i++){
        $alumniID = $alumniStatus[$i]['alumniId'];
        $image = $alumni_model->getSearch($alumniID);
        $alumniStatus[$i]['imageId'] = $image;
      }
      $result=$alumniStatus; 
      $result=interceptArray($result,$alumniStatus);
    }
    if($_POST['department']!="All"){
        $departmentTerm = $_POST['department'];
        $alumniDepartment = $alumni_model->searchDepartment($departmentTerm);
        for($i=0; $i<count($alumniDepartment); $i++){
            $alumniID = $alumniDepartment[$i]['alumniId'];
            $image = $alumni_model->getSearch($alumniID);
            $alumniDepartment[$i]['imageId'] = $image;
        // echo $image;

      }      
      $result=interceptArray($result,$alumniDepartment);
    }
    if($_POST['search']!=""){
      $searchterm = $_POST['search'];
      $searchAlumni = $alumni_model->search($searchterm);
     for($i=0; $i<count($searchAlumni); $i++){
       $alumniID = $searchAlumni[$i]['alumniId'];
       $image = $alumni_model->getSearch($alumniID);
       $searchAlumni[$i]['imageId'] = $image;
     }     
     $result=interceptArray($result,$searchAlumni);
   }
  }
else if(isset($_POST['search'])){
       $searchterm = $_POST['search'];
       $searchAlumni = $alumni_model->search($searchterm);
      for($i=0; $i<count($searchAlumni); $i++){
        $alumniID = $searchAlumni[$i]['alumniId'];
        $image = $alumni_model->getSearch($alumniID);
        $searchAlumni[$i]['imageId'] = $image;
      }
      
      $result=interceptArray($result,$searchAlumni);
    }
        echo json_encode($result);

      // $result=array_intersect($result,$alumniDepartment);

      function interceptArray($result, $new){
        $newArray=array();
        foreach($result as $array){
          foreach($new as $eachNew){
            if($array['alumniId']==$eachNew['alumniId']){
              array_push($newArray,$array);
            }
          }
        }
        $result=$newArray;
        return $result;
      }
    ?>
    