<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Admin-MyProfile/AdminModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

$admin = new AdminMyProfile($db->getConnection(), $_SESSION['admin']['adminId']);
?>

<!DOCTYPE html>
<html>

<head>
    <title>My Profile - Alumni Online System</title>
    <!-- GOOGLE FONT POPPINS -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <!-- ICON FONT AWESOME -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="/css/Alumni/index.css">


</head>

<body>
    <main class="container-fluid height-after-minus-header" id='main-body'>
        <div class="row h-100">
            <div class="custom-dark-gray px-0" id="left-nav">

            </div>
            <div id="right-content" class="container-fluid" style="background:url(/Assets/imgs/JAN_17_TECNOLOGIA_EEZY_01.png);background-size:70%;background-repeat: no-repeat;background-position:bottom right;">
                <div class="container mt-5">
                    <?php
                    if (isset($_GET['updated'])) {
                        echo '
                        <div class="row alert alert-success alert-dismissible fade show align-items-center" role="alert">
                            <i class="fas fa-check-circle mr-2"></i>Your information is updated.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>';
                    }
                    if (isset($_GET['changepassword'])) {
                        echo '
                        <div class="row alert alert-danger alert-dismissible fade show align-items-center" role="alert">
                            <i class="fas fa-times-circle mr-2"></i>Failed to change password. Please enter the correct old password.<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>';
                    }
                    if (isset($_GET['error'])) {
                        foreach ($_GET['error'] as $error) {
                            echo '
                            <div class="row alert alert-danger alert-dismissible fade show align-items-center" role="alert">
                                <i class="fas fa-times-circle mr-2"></i>' . $error . '<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>';
                        }
                    }
                    ?>
                    <div class="row justify-content-between">
                        <h2>My Profile</h2>
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bi bi-gear-fill mr-2"></i>
                                Settings
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="/adminprofile/edit" class="dropdown-item">
                                    <i class="fas fa-user-edit mr-2"></i>
                                    Edit Profile
                                </a>
                                <button type="button" class="dropdown-item" data-toggle="modal" data-target="#changePasswordModal">
                                    <i class="fas fa-lock-alt mr-2"></i>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5 mb-3 justify-content-center align-items-center pt-5 pb-5 rounded bg-white border shadow" style="border-top: 8px solid #6f49ab !important;">
                        <div class="col-sm-5 d-flex align-items-center justify-content-center">
                            <div class="w-50 position-relative">
                                <div class="rounded-circle overflow-hidden border" style="aspect-ratio: 1/1;">
                                    <img id='profilePicture' src=<?= $admin->getProfilePicture(); ?> alt="Profile Picture" class="img-fluid">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-7 justify-content-center align-items-center text-dark">
                            <div class="row mb-3">
                                <div class="col-sm-3 h5">Name:</div>
                                <div id="name" class="col-sm-9 h5"><?= $admin->getName(); ?></div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-3 h5">E-mail:</div>
                                <div id="email" class="col-sm-9 h5"><?= $admin->getEmail(); ?></div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header align-items-center">
                                    <h5 class="modal-title" id="changePasswordModalLabel">Change password</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form id="changePasswordForm" method="POST" action="/api/adminprofile/changepassword">
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="oldPassword" class="col-form-label">Old password</label>
                                            <input type="text" class="form-control" id="oldPassword" name="oldPassword" required>
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Old password is wrong</div>
                                        </div>
                                        <div class="form-group">
                                            <label for="newPassword" class="col-form-label">New password</label>
                                            <input type="password" class="form-control" id="newPassword" name="newPassword" required>
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Be at least 5 characters and at most 20
                                                characters
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="confirmNewPassword" class="col-form-label">Confirm new
                                                password</label>
                                            <input type="password" class="form-control" id="confirmNewPassword" required>
                                            <div class="valid-feedback">New password is correct</div>
                                            <div class="invalid-feedback">Please enter the same new password</div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                                        <button id="changePasswordButton" type="submit" name="submit" class="btn btn-primary">Confirm</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
                <!-- <img class="mt-auto ml-auto" src="/Assets/imgs/JAN_17_TECNOLOGIA_EEZY_01.png" width="60%"/> -->
            </div>
    </main>

    <script type="text/javascript" src="/js/utility.js"></script>
    <script type="module" src="/js/addHeader.js"></script>
    <script type='text/javascript' src='/js/Admin/addLeftNav.js'></script>
    <script></script>
    <script type='module' src="/js/Admin/Admin-MyProfilePage.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
</body>

</html>