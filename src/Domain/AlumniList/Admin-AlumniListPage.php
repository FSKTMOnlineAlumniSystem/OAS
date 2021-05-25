<?php
include '../src/Domain/header.php';
?>
<!-- <link rel="stylesheet" type="text/css" href="/css/Admin/Admin-AlumniListPage.css" /> -->

  <title><?= $GLOBALS['title']; ?></title>
</head>

  
  <?php
// include '../../../config/config.php';
// include '../src/Domain/Event/EventModel.php';
include '../src/Domain/AlumniList/AlumniListModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $alumniList_model = new AlumniListModel($db->getConnection());
  $all_activities = $alumniList_model->getAll();
  if (!empty($all_activities)) {

    foreach ($all_activities as $activity) {
      echo "$activity[alumniId] ";
    }
  }
} catch (Exception $e) {
  echo "Exception here!";
}

?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap" rel="stylesheet" />

  <!-- <link rel="stylesheet" type="text/css" href="/src/css/Alumni/index.css"> -->

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
    crossorigin="anonymous"></script>
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
                <select class="form-control" id="status" oninput="filterStatus()">
                  <option>All</option>
                  <option>Verified</option>
                  <option>Not Verified</option>
                </select>
              </div>
              <!-- filter department dropdown -->
              <div class="form-group col-6">
                <label for="exampleFormControlSelect1">Department</label>
                <select class="form-control" id="department" oninput="filterDepartment()">
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
                <button id="clearAll" type="submit" class="btn text-white custom-dark-purple">Clear All</button>
              </div>
            </div>
          </form>
        </div>
        <div class="row col-12">
          <form class="col-12 my-2">
            <div class="row">
              <!-- delete multiple row button -->
              <div class="col-7">
                <button id="delete" type="button" class="btn btn-outline-danger" onclick="deleteMultipleRow()">
                  <a href="#" role="button">
                    <i class="far fa-trash-alt text-danger" aria-hidden="true" style="font-size: 20px;"></i>
                  </a>
                </button>
              </div>
              <!-- search bar -->
              <div class="col-5 input-group mb-3">
                <input id="input1" type="text" class="form-control" style="font-weight: 200; font-style: italic"
                  placeholder="Search" aria-label="Search" aria-describedby="basic-addon2">
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
          </div>
      </div>
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
                        <img src="/public/Assets/imgs/AL-2.png" id="image" class="mx-auto d-block" alt="name" width="150px"
                          height="auto">
                        <div class="col">
                          <div class="row mb-2">
                            <div class="col-4">Name:</div>
                            <div id="name" class="col-8">Teh Kok Soon</div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Gender:</div>
                            <div id="gender" class="col-8">Male</div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Graduated:</div>
                            <div id="graduated" class="col-8">2014</div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Department:</div>
                            <div id="department1" class="col-8">Software Engineering</div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">E-mail:</div>
                            <div id="email" class="col-8">koksoon@um.edu.my</div>
                          </div>
                          <div class="row mb-2">
                            <div class="col-4">Contact Number:</div>
                            <div id="contactNumber" class="col-8">03-79676347</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-4">Ic No:</div>
                            <div id="icNumber" class="col-8">881225-10-5479</div>
                          </div>

                          <div class="row mb-2">
                            <div class="col-4">Account Status:</div>
                            <div id="accStatus" class="col-8">Verified</div>
                          </div>
                        </div>

                      </div>
                      <div class="modal-footer">

                        <button id="update" type="button" class="btn btn-primary" data-dismiss="modal"
                          onclick="location.href ='editAlumniProfile';updateEvent(this)">
                          <i class="fas fa-edit">
                          </i>Edit</button>
                        <button id="approve" type="button" class="btn btn-info">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
  </main>

  <script type='text/javascript' src='../js/utility.js'></script>
  <script type="text/javascript">var alumni_array = <?php echo json_encode($all_activities) ?>;</script>
  <script type="module" src="../js/Admin/Admin-AlumniListPage.js"></script>
  <script src="/..\..\libs\bootstrap\js\bootstrap.bundle.js"></script>
  <script type='module' src='../js/addHeader.js'></script>
  <script type='text/javascript' src='../js/Admin/addLeftNav.js'></script>  