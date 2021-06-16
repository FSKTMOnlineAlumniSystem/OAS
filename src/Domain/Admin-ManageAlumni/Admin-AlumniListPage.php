
  <title><?= $GLOBALS['title']; ?></title>
</head>

  
<?php

include_once '../src/Domain/Admin-ManageAlumni/Admin-ManageAlumniModel.php';
include_once '../src/Domain/Database.php';


try {
  $db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
  $alumniList_model = new AlumniListModel($db->getConnection());
  $all_activities = $alumniList_model->getAll();
  $allImage = $alumniList_model->getProfilePicture();
  for ($i=0; $i< count($all_activities); $i++){
    if($allImage[$i] == null){
      $all_activities[$i]['imageId'] = "/Assets/imgs/default_user.png";
    }else
    $all_activities[$i]['imageId'] = $allImage[$i];
  }
} catch (Exception $e) {
  // echo "Exception: " . $e->getMessage();
error_log("Exception: " . $e->getMessage());
include_once '../src/templates/header.php';
include_once '../src/Domain/General_Pages/server_error.php';
exit();
}
?>
<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/JobDetailsPage.css'
));
?>

<!-- <script type='text/javascript' src='../js/utility.js'></script> -->
  <script type="text/javascript">var alumni_array = <?php echo json_encode($all_activities) ?>;</script>
  <script type="module" src="../js/Admin/Admin-AlumniListPage.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap" rel="stylesheet" />
  <link rel="shortcut icon" href="/Assets/imgs/UM_Logo.ico" type="image/x-icon">  
  <link rel="stylesheet" type="text/css" href="../css/Admin/Admin-AlumniListPage.css">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  <link rel="stylesheet" type="text/css" href="../css/Alumni/index.css">

<title>Alumni List - Online Alumni System</title>
<body>

  <main class="container-fluid height-after-minus-header" id='main-body'>
    <div class="row h-100">
      <div class="custom-dark-gray px-0" id="left-nav">
      </div>
      <div class="container-fluid" id="right-content">
        <div class="row col-12">
          <h2 class='col-12 p-3 font-weight-bold'>List of Alumni</h2>
          <form class='col-12'>
            <div class='row bg-light p-4 m-1'>
              <!-- filter status dropdown -->
              <div class="form-group col-6">
                <label for="exampleFormControlSelect1">Status</label>
                <select class="form-control" id="status" >
                  <option>All</option>
                  <option>Approved</option>
                  <option>Pending Approval</option>
                </select>
              </div>
              <!-- filter department dropdown -->
              <div class="form-group col-6">
                <label for="exampleFormControlSelect1">Department</label>
                <select class="form-control" id="department" >
                  <option>All</option>
                  <option>Software Engineering</option>
                  <option>Artificial Intelligence</option>
                  <option>Information System</option>
                  <option>Data Science</option>
                  <option>Multimedia</option>
                  <option>Computer System and Network</option>
                </select>
              </div>
              <!-- clear all button -->
              <div class='col-12 mt-2 d-flex flex-row-reverse'>
                <button id="clearAll" class="btn text-white custom-dark-purple" >Clear All</button>
              </div>
            </div>
          </form>
        </div>
        <div class="row col-12">
          <form class="col-12 my-2">
            <div class="row">
              <!-- delete multiple row button -->
              <div class="col-7">
                <button id="delete" name="deleteMultipleRow" type="button" class="btn btn-outline-danger" onclick="deleteCheckedRow()">
                  
                <a href="#" role="button">
                    <i class="far fa-trash-alt text-danger" aria-hidden="true" style="font-size: 20px;"></i>
                  </a>
                </button>
              </div>
              <!-- search bar -->
              <div class="col-5 input-group mb-3">
                <input id="input1" type="text" class="form-control" style="font-weight: 200; font-style: italic"
                  placeholder="Search Alumni's Name" aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button id="searchBar" class="btn btn-secondary my-2 my-sm-0" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>

              </div>
            </div>
          </form>
          <!-- first row of the table -->
          <div class="table-responsive col-12">
            <table id="myTable" class="table table-striped table-sm table-bordered">
              <thead style="font-weight: 200; color:#ffffff" class="custom-dark-purple">
                <tr>
                  <th class="text-center">
                    <div class="custom-control custom-checkbox">
                      <input onclick="toggle(this);" type="checkbox" class="custom-control-input"
                        id="CheckAllBoxes"></input>
                      <label class="custom-control-label" for="CheckAllBoxes"></label>
                    </div>
                  </th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th class="text-center">Action</th> 
                </tr>
              </thead>
              <tbody>
              </div>
              </tbody>
          </table>
          <div class="row justify-content-md-center text-center" id="searchNotFound"></div>
          </div>
      </div>

      <!-- delete modal -->
      <div class="modal fade" id="deleteModal" role="dialog">
              <div class="modal-dialog">
              <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
              <button id="closeDeleteModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
              </div>
              <div class="modal-body">
              Are you sure you want to delete the alumni?
              </div>
              <div class="modal-footer">
              <button id="deleteButton"  name ="delete_row" type="button" class="btn btn-danger" data-dismiss="modal">Yes, delete it.</button>
              </div>
              </div>
              </div>
              </div>

      <!-- alumni detail pop out modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <img src="" id="image" class="mx-auto d-block" alt="name" width="150px"
                          height="auto">
                        <div class="col">
                          <div class="row mb-2">
                            <div class="col-4">Name:</div>
                            <div id="name" class="col-8"></div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Gender:</div>
                            <div id="gender" class="col-8"></div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Graduated:</div>
                            <div id="graduated" class="col-8"></div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Department:</div>
                            <div id="department1" class="col-8"></div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">E-mail:</div>
                            <div id="email" class="col-8"></div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-4">Ic No:</div>
                            <div id="icNumber" class="col-8"></div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-4">Account Status:</div>
                            <div id="accStatus" class="col-8"></div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">

                        <button id="update" type="button" class="btn btn-primary" data-dismiss="modal"
                          onclick="location.href ='/admin/editAlumniProfile?alumniId='+ getAlumniId()">
                          <i class="fas fa-edit">
                          </i>Edit</button>
                      <button id="approve" name="approve" type="submit" class="btn btn-info" onclick="approve()">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
                 <!-- pagination -->
                 <nav aria-label="Page navigation example" id="pagination">
            <ul class="pagination justify-content-center">
              <li class="page-item" id="previousPage">
              </li>
              <div class="pages list-group list-group-horizontal">
              </div>
              <li class="page-item" id="nextPage">
              </li>
            </ul>
          </nav>
  </main>

  <script type='text/javascript' src='../js/Admin/addLeftNav.js'></script>
  <?php include_once '../src/templates/GeneralScripts.php';?>
