<?php
include_once '../src/Domain/Database.php';
include '../src/Domain/Admin-Event/Admin-EventModel.php';
include '../src/Domain/AlumniList/AlumniListModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$event_model = new Admin_EventModel($db->getConnection());
$alumni_list_model = new AlumniListModel($db->getConnection());
?>

<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
  'editprofile_css' => '/css/Alumni/EditMyProfilePage.css',
  'admin_homepage_css' => '/css/Admin/Admin-HomePage.css',
  'index' => '/css/Alumni/index.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>

<title>Home Page - Online Alumni System</title>
</head>

<body>
  <main class="container-fluid height-after-minus-header" id='main-body'>

    <div class="row h-100">
      <div class="custom-dark-gray px-0" id="left-nav">
      </div>
      <div class="container-fluid" id="right-content">
        <!-- <div id="editProfileBg"></div> -->

        <div class="m-2 bg-white">
          <br><br>

          <div class="container">
            <h2 class="alert-heading"><b>Welcome back, Admin!</b></h2>
            <hr>

            <div class="row p-2 justify-content-between">
              <!-- <div class="col-lg-3 alert alert-warning rounded p-5 m-2">
                <div class="row justify-content-center">
                  <i class="d-flex align-items-center justify-content-center fas fa-users fa-2x col-lg-2"></i>
                  <h5 class="col-lg-10 text-center">New Registered Alumni</h5>
                </div>
                <h1 class="text-center">6</h1>
              </div> -->
              <div class="col-lg-3 alert alert-success rounded p-5 m-2">
                <div class="row justify-content-center">
                  <i class="d-flex align-items-center justify-content-center fas fa-users fa-2x col-lg-2"></i>
                  <h5 class="col-lg-10 text-center">Approved Alumni</h5>
                </div>
                <h1 class="text-center" id="approvedAlumni"><?= $alumni_list_model->getNumberOfApprovedAlumni(); ?></h1>
              </div>
              <div class="col-lg-3 alert alert-danger rounded p-5 m-2">
                <div class="row justify-content-center">
                  <i class="d-flex align-items-center justify-content-center fas fa-users fa-2x col-lg-2"></i>
                  <h5 class="col-lg-10 text-center">Unapproved Alumni</h5>
                </div>
                <h1 class="text-center" id="unapprovedAlumni"><?= $alumni_list_model->getNumberOfUnapprovedAlumni(); ?></h1>
              </div>
              <div class="col-lg-3 alert alert-warning rounded p-5 m-2">
                <div class="row justify-content-center">
                  <i class="d-flex align-items-center justify-content-center far fa-calendar-alt fa-2x col-lg-2"></i>
                  <h5 class="col-lg-10 text-center">Number of Events</h5>
                </div>
                <h1 class="text-center" id="numberOfEvents"><?= $event_model->getNumberOfEvent(); ?></h1>
              </div>
            </div>
            <div class="row p-2 justify-content-between">
            </div>

          </div>

        </div>
      </div>
  </main>

  <script type="module" src="/src/js/addHeader.js"></script>
  <script type='text/javascript' src='/src/js/Admin/addLeftNav.js'></script>
  <script type='module' src='/src/js/Admin/Admin-HomePage.js'></script>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
</body>