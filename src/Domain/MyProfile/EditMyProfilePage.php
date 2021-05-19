<?php

include '../src/Domain/Database.php';
include '../src/Domain/MyProfile/MyProfileModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $alumni = new MyProfile($db->getConnection(), 'AL-1');
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Edit My Profile - Alumni Online System</title>
    <!-- GOOGLE FONT POPPINS -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <!-- ICON FONT AWESOME -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <link rel="stylesheet" href="/css/Alumni/MyProfilePage.css">
    <link rel="stylesheet" href="/css/Alumni/EditMyProfilePage.css">
    <link rel="stylesheet" type="text/css" href="/css/Alumni/index.css">

</head>

<body>
    <div class="row m-0 justify-content-center align-items-center">
        <div id="editProfileBg"></div>
        <div class="col-lg-8 my-5 p-5 blurContainer">
            <div class="row mx-0">
                <h2><b>Edit My Profile</b></h2>
            </div>
            <form id="editMyProfileForm" method="POST" action="/api/myprofile/edit">
                <div class="row mt-3 mb-3 align-items-center">
                    <div class="col-md-5 d-flex align-items-center justify-content-center">
                        <div class="w-50 position-relative">
                            <div class="picture-container">
                                <div class="picture">
                                    <img src="../../../Assets/imgs/Square_DrTey.jpg" class="picture-src"
                                        id="wizardPicturePreview" title="">
                                    <input type="file" id="wizard-picture">
                                </div>
                                <h6 id="choosePictureDescription">Choose Picture</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 justify-content-center align-items-center">
                        <div class="row mb-3">
                            <div class="col-md-5">Name:</div>
                            <div id="name" class="col-md-7">Teh Kok Soon</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">Gender:</div>
                            <div id="gender" class="col-md-7">Male</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">Graduated:</div>
                            <div id="graduated" class="col-md-7">2014</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">Department:</div>
                            <div id="department" class="col-md-7">Software Engineering</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5 font-weight-bold">E-mail:</div>
                            <div class="col-md-7">
                                <input id="email" name="email" type="email" class="form-control" value="koksoon@um.edu.my">
                                <div class="valid-feedback">Valid.</div>
                                <div id="emailFeedback" class="invalid-feedback">
                                    Please provide a valid email.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-5 mx-0">
                    <h4>Biography</h4>
                    <div class="col-12 rounded bg-grey p-5 mb-2">
                        <textarea class="form-control" name="biography" form="editMyProfileForm" id="biography" rows="10">Tey Kok Soon received his BEng degree in Electrical Engineering and PhD degree from the University of Malaya, Malaysia, in 2011 and 2014 respectively. Since 2011, he has been a Research Assistant with the Power Electronics and Renewable Energy Research Laboratory (PEARL), Department of Electrical Engineering, University of Malaya. In 2015, he joined Department of Computer System and Information Technology, Faculty of Computer Science and Information Technology (FCSIT) as a Senior Lecturer. His research interests include renewable energy control system, energy management, power efficiency of PV system and inverter control of PV system.
                    </textarea>
                        <div class="valid-feedback">Valid.</div>
                        <div id="contactNumberFeedback" class="invalid-feedback">
                            Biography cannot be empty.
                        </div>
                    </div>
                </div>
                <div class="row justify-content-end mt-3 mx-0">
                    <!-- Need to pop up to ask whether users want to cancel and lose changes -->
                    <button id="cancelButton" type="button" class="btn btn-outline-secondary">Cancel</button>
                    <button id="saveButton" type="submit" class="btn btn-primary ml-3">Save</button>
                </div>
            </form>
        </div>
        <br>
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
                        <a href="/myprofile"><button type="button" class="btn btn-outline-secondary">Leave this
                                Page</button></a>
                        <button id="stayButton" type="button" class="btn btn-primary" data-dismiss="modal">Stay on this
                            Page</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="/js/utility.js"></script>
    <script type="module" src="/js/Alumni/EditMyProfilePage.js"></script>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
</body>

</html>