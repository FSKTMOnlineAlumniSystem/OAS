<!DOCTYPE html>
<html lang="en">
<head>
<!-- GOOGLE FONT POPPINS -->
<link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap" rel="stylesheet">
    <!-- ICON FONT AWESOME -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/src/css\Alumni\index.css">
    <link rel="stylesheet" href="/public/css/Alumni/EditMyProfilePage.css">
    <link rel="stylesheet" href="/public/css/Alumni/LoginPage.css">

<title><?= $GLOBALS['title']; ?></title>
</head>
<style>
    .gradient-purplin {
        background: #6a3093;
        /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9b66cf, #d8b7ee);
        /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9b66cf, #d8b7ee);
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .gradient-amethyst {
        background: #9D50BB;
        /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #6E48AA, #cd8ee6);
        /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #6E48AA, #cd8ee6);
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>

<?php
include '../../../config/config.php';
// include './LoginPageModel.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

// try {
//   $event_model = new EventModel($db->getConnection());
//   $all_activities = $event_model->getAll();
//   if (!empty($all_activities)) {

//     foreach ($all_activities as $activity) {
//       echo "$activity[eventId] ";
//     }
//   }
// } catch (Exception $e) {
//   echo "Exception here!";
// }

?>

<div class="container-fluid d-flex justify-content-center align-items-center min-vh-100 gradient-amethyst">
        <div class="container shadow-lg" style="height:75vh;">
            <div class="row align-items-center h-100">
                <div
                    class="d-none col-md-6 gradient-purplin h-100 p-5 d-md-flex flex-column justify-content-center align-items-center">
                    <img src="/public/Assets/imgs/umfsktm.png" class="w-75 mb-4">
                    <img src="/public/Assets/imgs/AdminLoginImageDark.png" class="w-75">
                </div>
                <div
                    class="container col-md-6 bg-light h-100 p-5 d-flex flex-column justify-content-center align-items-center">
                    <img src="../../../Assets/imgs/umfsktm.png" class="w-75 mb-5 d-md-none">
                    <h3 class="mb-5 d-flex flex-column justify-content-center align-items-center">Welcome back, Admin!
                    </h3>
                    <form class="w-100 d-flex flex-column justify-content-center align-items-center" id="signIN">
                        <div class="form-label-group w-100">
                            <input type="text" id="staticEmail" class="form-control" placeholder="Email address"
                                autofocus>
                            <!-- <label for="staticEmail"></label> -->
                            <label for="staticEmail">Email address</label>
                            <div class="valid-feedback">Valid</div>
                            <div class="invalid-feedback">Please provide a valid email</div>
                        </div>
                        <div class="form-label-group w-100">
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password">
                            <!-- <label for="inputPassword"></label> -->
                            <label for="inputPassword">Password</label>
                            <div class="valid-feedback">Valid</div>
                            <div class="invalid-feedback">Password is incorrect</div>
                        </div>
                        <button class="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2 text-white"
                            type="submit" style="background: #7b05aa;">Sign in</button>
                    </form>
                    <div class="row w-100">
                        <div class="col">
                            <span data-toggle="modal" data-target="#forgot">
                                <span class="forgotPsw">Forgot
                                    Password?</span></span>
                        </div>
                    </div>
                    <div class="bottom-right">
                        <a href="../../html/Alumni/LoginPage.html">I am Alumni</a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- forgot password -->
    <div class="modal fade" id="forgot" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Forgot Password</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="form_2">
                    <div class="modal-body">
                        <span>When you fill in your registered email address,
                            you will be sent instructions on how to reset your password.</span>
                        <br>
                        <div class="mb-2 mt-3 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label ml-1">Email:</label>
                            <div class="col-sm-8 mr-1">
                                <input type="text" class="form-control" id="sendEmail">
                                <div class="invalid-feedback">Please provide a valid email.</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary signinbtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
    <script type="module" src="/public/js/Admin/Admin-LoginPage.js"></script>
</body>

</html>