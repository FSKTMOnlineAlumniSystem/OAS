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

<?php
if(isset($_POST['submit'])) {
    echo "halo";
  $prevAlumniId=$_GET['alumniId'];
  $updateTheAlumni = new  UpdateAlumniModel($db->getConnection());	
  // $data = $addJob_model->getMaxId();
  $name = $_POST['name'];
  $gender =$_POST["gender"];
  $department =$_POST["department"];
  $icNumber = $_POST['icNumber'];
  $imageId = $_POST['imageId'];
  $graduated = $_POST['graduated'];
  $biography = $_POST['biography'];
  $email = $_POST['email'];
  $updateTheAlumni->updateAlumni($prevAlumniId,$name,$gender,$department,$icNumber,$imageId,$graduated,$biography,$email);
//   header("Location: alumniList");
}
else{     
    echo "laji";

}
  ?>

<head>
    <title>Edit Alumni Profile - Alumni Online System</title>
    <!-- GOOGLE FONT POPPINS -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <!-- ICON FONT AWESOME -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <link rel="stylesheet" href="../css/Alumni/MyProfilePage.css">
    <link rel="stylesheet" href="../css/Alumni/EditMyProfilePage.css">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="../css/Alumni/index.css">
</head>

<body>
    <main class="container-fluid height-after-minus-header" id='main-body'>
        <div class="row h-100">

            <div id="main-body" div class="container" id="right-content">
                <div class="row mx-0">
                    <h2>Edit Alumni Profile</h2>
                </div>
                <form id="editMyProfileForm" method="post" action="alumniList">
                    <div class="row mt-3 mb-3 align-items-center">
                        <!-- change alumni photo -->
                        <div class="col-sm-5 d-flex align-items-center justify-content-center">
                            <div class="w-50 position-relative">
                                <div class="picture-container">
                                    <div class="picture">
                                        <img src="../../../Assets/imgs/Square_DrTey.jpg" class="picture-src"
                                            id="wizardPicturePreview" title="">
                                        <input type="file" id="wizard-picture" name="image" onchange="readURL(this)">
                                    </div>
                                    <h6 id="choosePictureDescription">Choose Picture</h6>
                                </div>
                            </div>
                        </div>
                        <!-- alumni name -->
                        <div class="col-sm-7 justify-content-center align-items-center">
                            <div class="row mb-3">
                                <div class="col-sm-4">Name:</div>
                                <div class="col-sm-8">
                                    <input method= "post" type="text" id="name" name="name" class="form-control" value="Teh Kok Soon">
                                    <div class="valid-feedback">Valid.</div>
                                    <div id="contactNumberFeedback" class="invalid-feedback">
                                        Please enter alumni's name.
                                    </div>
                                </div>
                            </div>
                            <!-- alumni gender -->
                            <div class="row mb-3">
                                <div class="col-sm-4">Gender:</div>
                                <div class="col-sm-8">
                                    <select id="gender" class="rounded" type="text" value="Male" name="Gender"
                                        style="color:#495057; font-family: 'Poppins';">
                                        <option>male</option>
                                        <option>female</option>
                                    </select>
                                </div>
                            </div>
                            <!-- alumni ic number -->
                            <div class="row mb-3">
                                <div class="col-sm-4">Ic No:</div>
                                <div class="col-sm-8">
                                    <input type="tel" id="icNumber" name="icNumber" class="form-control" value="690110-10-1251">
                                    <div class="valid-feedback">Valid.</div>
                                    <div id="contactNumberFeedback" class="invalid-feedback">
                                        Please provide a valid Ic Number.
                                    </div>
                                </div>
                            </div>
                            <!-- alumni graduated year -->
                            <div class="row mb-3">
                                <div class="col-sm-4">Graduated:</div>
                                <div class="col-sm-8">
                                    <input type="text" name="graduated" id="graduated" class="form-control"
                                        value="2014">
                                    <div class="valid-feedback">Valid.</div>
                                    <div id="contactNumberFeedback" class="invalid-feedback">
                                        Please enter valid graduated year of alumni.
                                    </div>
                                </div>
                            </div>
                            <!-- alumni department -->
                            <div class="row mb-3">
                                <div class="col-sm-4">Department:</div>
                                <div class="col-sm-8">
                                    <select id="department" class="rounded" type="text" value="Software Engineering"
                                        name="Department"
                                        style="color:#495057; font-family: 'Poppins'; outline: none; ">
                                        <option>Software Engineering</option>
                                        <option>Artificial Intelligence</option>
                                        <option>Information System</option>
                                        <option>Multimedia</option>
                                        <option>Computer System and Network</option>
                                        <option>Data Science</option>

                                    </select>
                                </div>
                            </div>
                            <!-- alumni email -->
                            <div class="row mb-3">
                                <div class="col-sm-4">E-mail:</div>
                                <div class="col-sm-8">
                                    <input type="email" id="email" name="email" class="form-control" value="koksoon@um.edu.my">
                                    <div class="valid-feedback">Valid.</div>
                                    <div id="emailFeedback" class="invalid-feedback">
                                        Please provide a valid email.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- alumni biography -->
                    <div class="row mt-5">
                        <h4>Biography</h4>
                        <div class="col-12 rounded bg-grey p-5 mb-2">
                            <textarea id="biography" name ="biography"class="form-control" id="exampleFormControlTextarea1" rows="10">Tey Kok Soon received his BEng degree in Electrical Engineering and PhD degree from the University of Malaya, Malaysia, in 2011 and 2014 respectively. Since 2011, he has been a Research Assistant with the Power Electronics and Renewable Energy Research Laboratory (PEARL), Department of Electrical Engineering, University of Malaya. In 2015, he joined Department of Computer System and Information Technology, Faculty of Computer Science and Information Technology (FCSIT) as a Senior Lecturer. His research interests include renewable energy control system, energy management, power efficiency of PV system and inverter control of PV system.
                    </textarea>
                            <div class="valid-feedback">Valid.</div>
                            <div id="contactNumberFeedback" class="invalid-feedback">
                                Biography cannot be empty.
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-end mt-3">
                        <button id="cancelButton" type="button" class="btn btn-outline-secondary">Cancel</button>
                        <button type="submit" name="update" class="btn btn-primary ml-3">Save</button>
                    </div>
                </form>
    </main>
    <!-- Need to pop up to ask whether users want to cancel and lose changes -->
    <div class="modal fade" id="cancelChangesModal" tabindex="-1" aria-labelledby="cancelChangesModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cancelChangesModalLabel">Confirm Navigation</h5>
                    <button id="closeCancelChangesModalButton" type="button" class="close" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    You have made changes. They will be lost if you continue.
                    Are you sure you want to leave this page?
                </div>
                <div class="modal-footer">
                    <a href="Admin-AlumniListPage.html"><button type="button" class="btn btn-outline-secondary">Leave
                            this
                            Page</button></a>
                    <button id="stayButton" type="button" class="btn btn-primary" data-dismiss="modal">Stay on
                        this
                        Page</button>
                </div>
            </div>
        </div>
    </div> <br>
    </div>
    <!-- <script type='module' src='../js/addHeader.js'></script> -->
    <script type="text/javascript">var alumni_array = <?php echo json_encode($all_activities) ?>;</script>
    <script type="module" src="/js/Admin/Admin-EditAlumniProfilePage.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
