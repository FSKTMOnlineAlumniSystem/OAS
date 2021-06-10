<?php

include_once '../src/Domain/Database.php';
include_once '../src/Domain/MyProfile/MyProfileModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Edit My Profile - Alumni Online System</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="/Assets/imgs/UM_Logo.ico" type="image/x-icon">
    <!-- GOOGLE FONT POPPINS -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <!-- ICON FONT AWESOME -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

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
            <form id="editMyProfileForm" method="POST" action="/api/myprofile/edit" enctype="multipart/form-data">
                <div class="row mt-3 mb-3 align-items-center">
                    <div class="col-md-5 d-flex align-items-center justify-content-center">
                        <div class="w-50 position-relative">
                            <div class="picture-container">
                                <div class="picture">
                                    <img src=<?= $alumni->getProfilePicture(); ?> class="picture-src" id="wizardPicturePreview" alt="profile picture">
                                    <input type="file" id="wizard-picture">
                                    <input type="file" name="profilePicture" id="profilePicture" class="d-none">
                                </div>
                                <h6 id="choosePictureDescription">Choose Picture</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 justify-content-center align-items-center">
                        <div class="row mb-3">
                            <div class="col-md-5">Name:</div>
                            <div id="name" class="col-md-7"><?= $alumni->getName(); ?></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">Gender:</div>
                            <div id="gender" class="col-md-7"><?= $alumni->getGender(); ?></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">Graduated:</div>
                            <div id="graduated" class="col-md-7"><?= $alumni->getGraduatedYear(); ?></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">Department:</div>
                            <div id="department" class="col-md-7"><?= $alumni->getDepartment(); ?></div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-5">E-mail:</div>
                            <div id="email" class="col-md-7"><?= $alumni->getEmail(); ?></div>
                        </div>
                    </div>
                </div>

                <div class="row mt-5 mx-0">
                    <h4>Biography</h4>
                    <div class="col-12 rounded bg-grey p-5 mb-2">
                        <textarea class="form-control" name="biography" form="editMyProfileForm" id="biography" rows="10"><?= $alumni->getBiography(); ?></textarea>
                        <div class="valid-feedback">Valid.</div>
                        <div id="contactNumberFeedback" class="invalid-feedback">
                            Biography cannot be empty.
                        </div>
                    </div>
                </div>
                <div class="row justify-content-end mt-3 mx-0">
                    <!-- Need to pop up to ask whether users want to cancel and lose changes -->
                    <button id="cancelButton" type="button" class="btn btn-outline-secondary">Cancel</button>
                    <button id="saveButton" type="submit" name="submit" value="Submit" class="btn btn-primary ml-3">Save</button>
                </div>
            </form>
        </div>
        <br>
        <div class="modal fade" id="cancelChangesModal" tabindex="-1" aria-labelledby="cancelChangesModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cancelChangesModalLabel">Confirm Navigation</h5>
                        <button id="closeCancelChangesModalButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        You have made changes. They will be lost if you continue.
                        Are you sure you want to leave this page?
                    </div>
                    <div class="modal-footer">
                        <a href="/myprofile"><button type="button" class="btn btn-outline-secondary">Leave this Page</button></a>
                        <button id="stayButton" type="button" class="btn btn-primary" data-dismiss="modal">Stay on this Page</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include_once '../src/templates/GeneralScripts.php' ?>
    <script type="text/javascript">
        var alumniBiography = `<?= $alumni->getBiography(); ?>`;
    </script>
    <script type="text/javascript" src="/js/Alumni/EditMyProfilePage.js"></script>

</body>

</html>