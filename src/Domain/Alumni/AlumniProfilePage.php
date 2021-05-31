<?php
// include '../config/config.php';
include '../src/Domain/Database.php';
include '../src/Domain/Alumni/AlumniProfileModel.php';

include '../src/utilities/includeWithVariable.php';
// include '../src/templates/header.php';
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/AlumniProfilePage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
include '../src/templates/nav.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $alumni = new AlumniProfileModel($db->getConnection());
    $alumniProfile = $alumni->getAll();

  if (!empty($alumniProfile)) {
    // print_r($alumniProfile);
  }
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}
?>

  <title>Profile - <?=$alumniProfile[$_COOKIE['clickedID']]['name']?></title>
</head>
<body>
  <div id="main-body" class="row mx-0 my-5 justify-content-center">
<!-- const imgPath = "/uploads/alumni/"; -->

    <div class="col-12 col-md-10 col-lg-8">
        <div class="row align-items-center">
          <div class="col-12">
              <a href="/alumni" class="btn btn-link back">
                <i class="fas fa-chevron-left fa-2x"></i>
              </a>
              <h3 class="d-inline">Alumni Profile</h3>
          </div>
        </div>
        <hr
        style="
            height: 3px;
            border-width: 0;
            color: rgb(0, 0, 0);
            background-color: black;
        "
        />
        <div class="row mt-3 mb-3 align-items-center">
            <div class="col-sm-5 d-flex align-items-center justify-content-center">
                <div class="w-50 position-relative">
                    <div
                    class="rounded-circle overflow-hidden border"
                    style="aspect-ratio: 1/1"
                    >
                        <img
                            id="profilePicture"
                            src="<? $alunmi -> getProfilePicture()?>"
                            alt="Profile Picture"
                            class="img-fluid"
                        />
                    </div>
                </div>
            </div>
            <div class="col-sm-7 justify-content-center align-items-center pt-3">
                <div class="row mb-3">
                    <div class="col-sm-4">Name:</div>
                    <div id="name" class="col-sm-8"><?=$alumniProfile[$_COOKIE['clickedID']]['name']?></div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Gender:</div>
                    <div id="gender" class="col-sm-8"><?=$alumniProfile[$_COOKIE['clickedID']]['gender']?></div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Graduated:</div>
                    <div id="graduated" class="col-sm-8"><?=$alumniProfile[$_COOKIE['clickedID']]['graduated']?></div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Department:</div>
                    <div id="department" class="col-sm-8"><?=$alumniProfile[$_COOKIE['clickedID']]['department']?></div>
                </div>
                <?php
                  if ($alumniProfile[$_COOKIE['clickedID']]['isEmailPublic'] == 1) {
                    echo '<div class="row mb-3">
                    <div class="col-sm-4">E-mail:</div>
                    <div id="email" class="col-sm-8">'.$alumniProfile[$_COOKIE['clickedID']]['email'].'</div>
                    </div>';
                  }
                ?>
            </div>
        </div>
        <div class="container">
            <div class="row mt-5">
                <h4>Biography</h4>
                <div class="col-12 rounded bg-grey p-5 mb-2">
                    <div id="biography" class="profile__biography_valueContainer_value">
                      <?=$alumniProfile[$_COOKIE['clickedID']]['biography']?>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
<!-- custom js files -->
<!-- <script type="module" src="/public/js/Alumni/AlumniProfilePage.js"></script> -->
  
<?php include '../src/templates/footer.php' ?>