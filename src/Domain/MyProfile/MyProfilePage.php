<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/MyProfile/MyProfileModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
try {
    $alumni = new MyProfile($db->getConnection(), $_SESSION["alumni"]['alumniId']);
} catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
    error_log("Exception: " . $e->getMessage());
    include_once '../src/templates/header.php';
    include_once '../src/Domain/General_Pages/server_error.php';
    exit();
}
?>

<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/MyProfilePage.css',
    'index' => '/css/Alumni/index.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>

<title>My Profile - Alumni Online System</title>

</head>

<body>

    <div id="main-body" class="row mx-0 my-5 justify-content-center">
        <div class="col-lg-7">

            <?php
            if (isset($_GET['updated'])) {
                echo '
                <div class="row alert alert-success alert-dismissible fade show align-items-center" role="alert">
                    <i class="fas fa-check-circle mr-2"></i>Your information is updated.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>';
            } elseif (isset($_GET['error'])) {
                foreach ($_GET['error'] as $error) {
                    echo '
                    <div class="row alert alert-danger alert-dismissible fade show align-items-center" role="alert">
                        <i class="fas fa-times-circle mr-2"></i>' . $error . '<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>';
                }
            } elseif (isset($_GET['private'])) {
                echo '
                <div class="row alert alert-success alert-dismissible fade show align-items-center" role="alert">
                    <i class="fas fa-check-circle mr-2"></i>Your account is set ' . ($_GET['private'] == 'true' ? "private. Your email will be hidden." : "public") . '
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>';
            } elseif (isset($_GET['delete'])) {
                echo "
                <script type='text/javascript'>
                window.onload = function(){
                    $('#deleteAccountModal').modal('show');
                    document.getElementById('deleteAccountInput').classList.add('is-invalid');                
                }
                </script>
                ";
            } elseif (isset($_GET['changepassword']) && $_GET['changepassword'] == 'fail') {
                echo "
                <script type='text/javascript'>
                window.onload = function(){
                    $('#changePasswordModal').modal('show');
                    document.getElementById('oldPassword').classList.add('is-invalid');                
                }
                </script>
                ";
            } elseif (isset($_GET['changepassword']) && $_GET['changepassword'] == 'success') {
                echo '
                <div class="row alert alert-success alert-dismissible fade show align-items-center" role="alert">
                    <i class="fas fa-check-circle mr-2"></i>Your password is updated successfully.<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>';
            }
            ?>
            <div class="row justify-content-between">
                <h2><b>My Profile</b></h2>
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-cog mr-2"></i>
                        Settings
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a href="/myprofile/edit" class="dropdown-item">
                            <i class="fas fa-user-edit mr-2"></i>
                            Edit Profile
                        </a>
                        <button type="button" class="dropdown-item" data-toggle="modal" data-target="#changePasswordModal">
                            <i class="fas fa-lock-alt mr-2"></i>
                            Change Password
                        </button>
                        <div class="dropdown-divider"></div>
                        <button type="button" class="dropdown-item text-danger" data-toggle="modal" data-target="#deleteAccountModal">
                            <i class="fas fa-user-times mr-2"></i>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            <div class="row mt-3 mb-3 align-items-center">
                <div class="col-sm-5 d-flex align-items-center justify-content-center">
                    <div class="w-50 position-relative">
                        <div class="rounded-circle overflow-hidden border" style="aspect-ratio: 1/1;">
                            <img id="profilePicture" src=<?= $alumni->getProfilePicture(); ?> alt="Profile Picture" class="img-fluid">
                        </div>
                    </div>
                </div>
                <div class="col-sm-7 justify-content-center align-items-center">
                    <div class="row mb-3">
                        <div class="col-sm-4">Name:</div>
                        <div id="name" class="col-sm-8"><?= $alumni->getName(); ?></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">Gender:</div>
                        <div id="gender" class="col-sm-8"><?= $alumni->getGender(); ?></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">Graduated:</div>
                        <div id="graduated" class="col-sm-8"><?= $alumni->getGraduatedYear(); ?></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">Department:</div>
                        <div id="department" class="col-sm-8"><?= $alumni->getDepartment(); ?></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">E-mail:</div>
                        <div id="email" class="col-sm-8"><?= $alumni->getEmail(); ?></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 d-flex">Private <button type="button" class="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" data-toggle="tooltip" data-placement="top" title="When private mode is on, your email will be hidden from public." style="width:25px; height:25px;"><i class="fas fa-question" style="font-size:15px;"></i></button> :</div>
                        <div class="col-sm-8 custom-control custom-switch">
                            <form id="changePrivacyForm" method="POST" action="/api/myprofile/changeprivacy">
                                <input type="checkbox" class="custom-control-input" style="position:relative; width:auto;" id="privacySwitch" name="private" <?= $alumni->getIsEmailPublic() ? "" : "checked" ?>>
                                <label class="custom-control-label" for="privacySwitch"></label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-5">
                <h4>Biography</h4>
                <div class="col-12 rounded bg-grey p-5 mb-2">
                    <p id="biography" class="profile__biography_valueContainer_value text-break" style="white-space: pre-wrap;"><?= $alumni->getBiography(); ?></p>
                </div>
            </div>
        </div>

        <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="changePasswordModalLabel">Change password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="changePasswordForm" method="POST" action="/api/myprofile/changepassword">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="oldPassword" class="col-form-label">Current password</label>
                                <input type="password" class="form-control" id="oldPassword" name="oldPassword" required>
                                <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Current password is wrong</div>
                            </div>
                            <div class="form-group">
                                <label for="newPassword" class="col-form-label">New password</label>
                                <input type="password" class="form-control" id="newPassword" name="newPassword" required>
                                <div class="valid-feedback">Valid.</div>
                                <div class="invalid-feedback">Be at least 5 characters and at most 20 characters</div>
                            </div>
                            <div class="form-group">
                                <label for="confirmNewPassword" class="col-form-label">Confirm new password</label>
                                <input type="password" class="form-control" id="confirmNewPassword" required>
                                <div class="valid-feedback">New password is correct</div>
                                <div class="invalid-feedback">Please enter the same new password</div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                            <button name="submit" type="submit" class="btn btn-primary">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteAccountModalLabel">Are you sure?
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id='deleteAccountForm' action="/api/myprofile/delete" method="POST">
                        <div class="modal-body">
                            <div class="media alert alert-warning rounded mb-2">
                                <i class="fas fa-exclamation-circle align-self-center mr-3"></i>
                                <div class="media-body">
                                    If you delete your account, all of your account data will be permenantly deleted.
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="deleteAccountInput" class="col-form-label">If yes, please type your password to delete your account.</label>
                                <input type="password" name="deletePassword" class="form-control" id="deleteAccountInput" required>
                                <div class="invalid-feedback">Password is incorrect</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                            <button id="deleteAccountButton" name="submit" type="submit" class="btn btn-danger d-flex justify-content-center align-items-center">Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <script type='module' src="/js/Alumni/MyProfilePage.js"></script>
    <?php include_once '../src/templates/footer.php' ?>
    <?php include_once '../src/templates/GeneralScripts.php' ?>
    <script type="text/javascript">
        $('[data-toggle="tooltip"]').tooltip()
    </script>
</body>

</html>