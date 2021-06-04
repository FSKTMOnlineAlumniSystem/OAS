<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/MyProfile/MyProfileModel.php';

include_once '../src/utilities/includeWithVariable.php';

includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/MyProfilePage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
include_once '../src/templates/nav.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $link = explode('/',$_SERVER["REQUEST_URI"]);
  $id = $link[count($link)-1];
  $alumni = new MyProfile($db->getConnection(), $id);
  // $_SESSION['SignInAlumniId']
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
  
  <?php 
    include_once '../src/templates/footer.php' ;
    include_once '../src/templates/GeneralScripts.php';
  ?>
   <!-- custom js files -->
  
  </body>

</html>