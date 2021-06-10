<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
  'searchBar_css' => '/css/Alumni/SearchBar.css',
  'admin_eventPage_css' => '/css/Admin/Admin-EventPage.css',
  'index' => '/css/Alumni/index.css'
));
?>
   <!-- CSS -->
  <!-- <link rel="stylesheet" href="/css/Admin/Admin-EventPage.css" /> -->
  <!-- <title>Event - Online Alumni System</title> -->
</head>

<body>
<?php
include_once '../src/Domain/Admin-Event/Admin-EventModel.php';
include_once '../src/Domain/Database.php';

$_SESSION['admin']['adminId'];

// global $db;
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
try {
  $event_model = new Admin_EventModel($db->getConnection());
    $all_activities = $event_model->getAll();
    $allImage = $event_model->getPicture();
    // print_r($allImage);
    if (!empty($all_activities)) {
      foreach ($all_activities as $activity) {
        // echo "$activity[eventId] ";
        // getElementById('date')->"$activity[dateTime]";
      }
    }
    $eventNumber = $event_model->getNumberOfEvent();
    // echo  "event Number = ";
    // print_r($eventNumber);

    for ($i=0; $i< count($all_activities); $i++){
      $all_activities[$i]['imageId'] = $allImage[$i];
    }
    // $defaultImage = $event_model->getDefaultPicture();

  } catch (Exception $e) {
    echo "Exception here!";
    echo $e;
  }
?>
  <script type="text/javascript">var event_array = <?php echo json_encode($all_activities)?>;</script>
  <!-- <script type="text/javascript">var defaultImage = <?php echo json_encode($defaultImage)?>;</script> -->
  <script type="module" src="/js/Admin/Admin-EventPage.js"></script>
  <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> -->

<!-- delete row function -->
<?php
/*
function DeleteRowPhp($eventId){
  global $db;
    $deleteEvent = new Admin_EventModel($db->getConnection());	
  $deleteEvent-> deleteEvent($eventId);
    // $updatedJob = $myJob_model->getRow("AL-1");
  // echo json_encode($updatedJob);
};
// if(isset($_COOKIE["checkbox"])){
//   $eventId=$_COOKIE["deleteEvent"];
//   $eventId=explode(",",$eventId);
//   for($i=count($eventId)-1; $i>=0;$i--){
//     DeleteRowPhp($eventId[$i]);  
//   }
//   setcookie("deleteEvent", "");
//   setcookie("checkbox", "");

// }else if(isset($_COOKIE["deleteEvent"])){
//   DeleteRowPhp($_COOKIE["deleteEvent"]);  
//   setcookie("deleteEvent", "");
// }

// $deleteEvent = new Admin_EventModel($db->getConnection());	
//   $updatedEventArray = $deleteEvent->getAll();
//   print_r ($updatedEventArray);
//   echo $hehe=json_encode($updatedEventArray);
//   print_r ($updatedEventArray);
//   echo $hoho=json_decode($hehe);
//   print_r ($hoho);


if(isset($_POST["checkbox"])){
  // echo $_POST["deleteEvent"];
  $eventId=$_POST["deleteEvent"];
  $eventId=explode(",",$eventId);
  for($i=count($eventId)-1; $i>=0;$i--){
    // DeleteRowPhp($eventId[$i]);  
  }
  // echo 'hahahha';
  $deleteEvent = new Admin_EventModel($db->getConnection());	
  $updatedEventArray = $deleteEvent->getAll();
  // print_r($updatedEventArray);
  // $updatedEventArray=json_encode($updatedEventArray);
  // echo $updatedEventArray;

  echo json_encode($updatedEventArray);
  exit();

  
  // setcookie("deleteEvent", "");
  // setcookie("checkbox", "");
  // echo json_encode($updatedJob);
}else if(isset($_POST["deleteEvent"])){
  // DeleteRowPhp($_POST["deleteEvent"]);  
  // echo json_encode($updatedEventArray.toString());
  $updatedEventArray = $deleteEvent->getAll();
  // print_r($updatedEventArray);
  echo json_encode($updatedEventArray);
}
//depete button
// if(isset($_POST['submit'])) {
//   $eventId=$_POST['deleteButton'];
//   echo $eventId;


// }
// else{
//   echo "ahhhhh";
// }

// function deleteMultipleRow(){
  
//   function DeleteRowPhp($eventId){
//     echo 'deleteRowPhp';
//     try{
//     $deleteEventModel = new deleteEventModel($db->getConnection());
//     $deleteEventModel-> deleteEvent($eventId);
//   } catch (Exception $e) {
//     echo "Exception here!";
//     echo $e;
//   }
//   }
// }

//delete event
// echo $_POST['deleteEvent'];


*/
?>

  
  <main class="container-fluid height-after-minus-header" id='main-body'>
    <div class="row h-100">
      <div class="custom-dark-gray px-0" id="left-nav">
      </div>
      <div class="container-fluid" id="right-content">
        <br>
        <div class="col-12">
          <h2 style="font-weight: 600">List of Events</h2>
          </divc>

          <!--search button-->
          <div class="rightop">
            <div class="input-group mb-3">
              <input id="input1" type="text" class="form-control" style="font-weight: 200; font-style: italic"
                placeholder="Search" aria-label="Search" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button id="searchBar" class="btn btn-secondary my-2 my-sm-0" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <br />


          <div class="row m-0">
            <div class="btn-group" role="group" aria-label="Third group">
              <a button type="button"
                class="btn btn-primary d-flex justify-content-center align-items-center rounded mr-2"
                href="/admin/create/event"><i class="fa fa-plus fa-2x" aria-hidden="true"
                  style="font-size: 20px; "></i></a>

              <!--trash button-->
              <button type="button"
                class="btn btn-outline-danger d-flex justify-content-center align-items-center rounded"
                onclick="DeleteCheckedRow()"><i class="far fa-trash-alt fa-2x" aria-hidden="true"
                  style="font-size: 20px; "></i></button> 
                  <!-- DeleteCheckedRow() -->
            </div>
          </div>
          <br />

          <!-- table -->
          <div class="table-responsive">
            <table id="myTable" class="table table-striped table-sm something">
              <thead style="background-color:rgb(134, 75, 189);font-weight: 200; color:#ffffff">
                <tr>
                  <th>
                    <div class="custom-control custom-checkbox text-center">
                      <input type="checkbox" class="custom-control-input" id="CheckAllBoxes" onclick="toggle(this);">
                      <label class="custom-control-label" for="CheckAllBoxes"></label>
                    </div>
                  </th>
                  <th>Schedule</th>
                  <th>Title</th>
                  <th style="width: 25%">Description</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>

              <!-- js getElement -->
              <tbody>
              <tr class="rowss"></tr>

              </tbody>

            </table>

          </div>
          <!-- model -->
          <div class="modal fade p-5" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
          </div>


          <span id="pageIndex"></span>


          <!-- title modal -->
          <div class="modal fade" id="titleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Event</h5>
                  <button type="button" id="closeCancelChangesModalButton" class="close" data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" id="modal-body">
                  <img src='' class="mx-auto d-block" alt="name" id="imageTitle" width="200px" height="auto">
                  <br>
                  <b class="m-0"> Title : </b>
                  <p id="title"></p>
                  <b class="m-0"> Description : </b>
                  <p id="description" style="white-space: pre-wrap"></p>
                  <b class="m-0"> Location : </b>
                  <p id="location"></p>
                </div>

                <div class="modal-footer" id="modelEdit">
                  <button type="button" id="editButton" class="btn btn-primary"
                    >
<!-- onclick="location.href = 'adminUpdateEvent'" -->
                    <i class="fas fa-edit">
                    </i>
                    Edit</button>
                </div>
              </div>
            </div>
          </div>
          <!--  button -->
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" id="previousPage">
                <button onclick="previousPage()" class="page-link">Previous</button>
              </li>
              <div class="pages list-group list-group-horizontal">
              </div>
              <li class="page-item" id="nextPage">
                <button onclick="nextPage()" class="page-link">Next</button>
              </li>
            </ul>
          </nav>

        </div>
      </div>
  </main>

  <script type="text/javascript" src="/js/utility.js"></script>
  <!-- new path -->
  <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script> -->
<!--hiiiiii-->    
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>

<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script> -->
  <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>


  <!-- <script type='module' src='/js/addHeader.js'></script> -->
  <script type='text/javascript' src='/js/Admin/addLeftNav.js'></script> 
  <!-- jquery -->
  <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script> -->
  <!-- bootstrap -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
    crossorigin="anonymous"></script> -->

</body>
</html>
<?php
    /*            try {
    // $event_model = new Admin_EventModel($db->getConnection());
    // $all_activities = $event_model->getAll();
    if (!empty($all_activities)) {
  
      foreach ($all_activities as $activity) {
        echo "$activity[eventId] ";
        // getElementById('date')->"$activity[dateTime]";
        echo '       <tr class="rowss">


                <td> 
                        <div class="custom-control custom-checkbox text-center">
                      <input type="checkbox" class="custom-control-input" id="Boxes${i}">
                      <label class="custom-control-label" for="Boxes${i}"></label>
                    </div>
                  </td>
                 <td style="font-weight: 400; font-size: 18px" id="date"> <?php echo "activity[dateTime]"; ?>
                 <!-- $getReadableDate(dummyResponse.Event[i].dateTime) -->
                 <div style="font-weight: 200; font-size: 14px" id="time">'?> <?php echo "$activity[dateTime]"; ?>)</div>
               <?php echo'
                 <td style="font-weight: 400; font-size: 18px" class="eventTitle">
                 <a class="eventTitle" id=${i} data-toggle="modal" data-target="#titleModal">';?>
                 <?php echo "$activity[title]"; ?>
                 <?php echo'
              </a>
        
              <!-- Modal -->

              </td>

                <td style="font-weight: 400; font-size: 14px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;" id="description">';?>
                <?php echo "$activity[description]"; ?>
                <?php echo'n</td>
                <td style="font-weight: 200; font-size: 18px" id="locate"> ';?>
                 <?php echo "$activity[location]"; ?>
                 <?php echo'</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Third group">
                   ';?>
                   <?php echo "
                  <a href=\"eventUpdate?title=$activity[title]\"";?>
                  <?php echo' class="updateButton" onclick="updateEvent(this)" id="update ${i}">
                    <i class="fas fa-edit pr-2" aria-hidden="true">
                    </i></a>
                    


                      <button class="deleteRowButton d-flex justify-content-center align-items-center" onclick="DeleteRowFunction(this)" id="row ${i}">
                      <i class="far fa-trash-alt pl-2" aria-hidden="true">
                       </i></button>
                  </div>
                </td>
                </tr>';
            }
        }
      } catch (Exception $e) {
        echo "Exception here!";
        echo $e;
      }*/
      ?>