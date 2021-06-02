<?php
// include '../config/config.php';
include '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

include '../src/utilities/includeWithVariable.php';
// include '../src/templates/header.php';
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/MyProfilePage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
include '../src/templates/nav.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $link = explode('/',$_SERVER["REQUEST_URI"]);
  $id = $link[count($link)-1];
  $alumni = new MyProfile($db->getConnection(), $id);

  if ($id=="AL-1"){
    echo "<script> location.href='/myprofile'; </script>";
    exit;
  }else if(!$alumni->isAlumniExist()){
    include_once '../src/Domain/General_Pages/page_not_found.php';
    include_once '../src/templates/footer.php';
    exit;
  }

} catch (Exception $e) {
  echo "Exception: " . $e->getMessage();
}
?>
</head>
<body>
  <div id="main-body" class="row mx-0 my-5 justify-content-center">
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
                            src="<?=$alumni->getProfilePicture();?>"
                            alt="Profile Picture"
                            class="img-fluid"
                        />
                    </div>
                </div>
            </div>
            <div class="col-sm-7 justify-content-center align-items-center pt-3">
                <div class="row mb-3">
                    <div class="col-sm-4">Name:</div>
                    <div id="name" class="col-sm-8"><?=$alumni->getName();?></div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Gender:</div>
                    <div id="gender" class="col-sm-8"><?=$alumni->getGender();?></div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Graduated:</div>
                    <div id="graduated" class="col-sm-8"><?=$alumni->getGraduatedYear();?></div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4">Department:</div>
                    <div id="department" class="col-sm-8"><?=$alumni->getDepartment();?></div>
                </div>
                <?php
                  if ($alumni->getIsEmailPublic() == 1) {
                    echo '<div class="row mb-3">
                    <div class="col-sm-4">E-mail:</div>
                    <div id="email" class="col-sm-8">'.$alumni->getEmail().'</div>
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
                      <?=$alumni->getBiography();?>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
<!-- custom js files -->
<!-- <script type="module" src="/public/js/Alumni/AlumniProfilePage.js"></script> -->
<script src="/libs/bootstrap/js/bootstrap.bundle.js"></script>
<script
  src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
  crossorigin="anonymous">
</script>
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
  integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
  crossorigin="anonymous">
</script>
<script
  src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
  crossorigin="anonymous">
</script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
  crossorigin="anonymous">
</script>
  
<?php include '../src/templates/footer.php' ?>