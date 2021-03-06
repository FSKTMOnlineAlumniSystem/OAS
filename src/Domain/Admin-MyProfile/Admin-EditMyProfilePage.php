<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Admin-MyProfile/AdminModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

$admin = new AdminMyProfile($db->getConnection(), $_SESSION['admin']['adminId']);
?>
<!DOCTYPE html>
<html>

<head>
    <title>Edit My Profile - Alumni Online System</title>
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
        <div class="col-lg-6 my-5 p-5 blurContainer">
            <div class="row">
                <h2>Edit My Profile</h2>
            </div>
            <form id="editMyProfileForm" method="POST" action="/api/adminprofile/edit" enctype="multipart/form-data">
                <div class="row mt-2 mb-2 align-items-center pt-5 pb-5 rounded">
                    <div class="col-md-5 d-flex align-items-center justify-content-center">
                        <div class="w-75 position-relative">
                            <div class="picture-container">
                                <div class="picture">
                                    <img src="<?= $admin->getProfilePicture(); ?>" class="picture-src" id="wizardPicturePreview" title="">
                                    <input type="file" id="wizard-picture">
                                    <input type="file" name="profilePicture" id="profilePicture" class="d-none">
                                </div>
                                <h6 id="choosePictureDescription">Choose Picture</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7 justify-content-center align-items-center">
                        <div class="row mb-3">
                            <div class="col-md-4">Name:</div>
                            <div class="col-md-8">
                                <input id="name" name="username" type="text" class="form-control" value="<?= $admin->getName(); ?>">
                                <div class="valid-feedback">Valid.</div>
                                <div id="emailFeedback" class="invalid-feedback">
                                    Be at least 5 characters
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">E-mail:</div>
                            <div class="col-md-8">
                                <div id="email" name="email" type="email"><?= $admin->getEmail(); ?></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-end mt-3">
                    <!-- Need to pop up to ask whether users want to cancel and lose changes -->
                    <button id="cancelButton" type="button" class="btn btn-outline-secondary">Cancel</button>
                    <button id="saveButton" type="submit" name="submit" form="editMyProfileForm" class="btn btn-primary ml-3">Save</button>
                </div>
            </form>

        </div>
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
                        <a href="Admin-MyProfilePage.html"><button type="button" class="btn btn-outline-secondary">Leave
                                this Page</button></a>
                        <button id="stayButton" type="button" class="btn btn-primary" data-dismiss="modal">Stay on this
                            Page</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        var adminName = "<?= $admin->getName(); ?>";
    </script>
    <?php include_once '../src/templates/GeneralScripts.php' ?>
    <script type='module' src="/js/Admin/Admin-EditMyProfilePage.js"></script>
</body>

</html>