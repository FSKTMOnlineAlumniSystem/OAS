<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="shortcut icon" href="/Assets/imgs/UM_Logo.ico" type="image/x-icon">
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
    <link rel="stylesheet" type="text/css" href="/css/Alumni/index.css">
    <link rel="stylesheet" href="/css/Alumni/EditMyProfilePage.css">
    <link rel="stylesheet" href="/css/Alumni/LoginPage.css">

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
include_once '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
?>

<div class="container-fluid d-flex justify-content-center align-items-center min-vh-100 gradient-amethyst">
        <div class="container shadow-lg" style="height:80vh;">
            <div class="row align-items-center h-100">
                <div
                    class="d-none col-md-6 gradient-purplin h-100 p-lg-5 p-1 d-md-flex flex-column justify-content-center align-items-center">
                    <img src="/Assets/imgs/umfsktm.png" class="w-75 mb-4">
                    <img src="/Assets/imgs/AdminLoginImageDark.png" class="w-75">
                </div>
                <div
                    class="container col-md-6 bg-light h-100 p-lg-5 p-4 d-flex flex-column justify-content-center align-items-center">
                    <img src="/Assets/imgs/umfsktm.png" class="w-75 mb-4 mb-sm-5 d-md-none">
                    <h3 class="mb-3 mb-sm-5 d-flex flex-column justify-content-center align-items-center text-center">Welcome back, Admin!
                    </h3>
                    <form class="w-100 d-flex flex-column justify-content-center align-items-center" action='/api/adminsignin' id="signIN" method="post">
                        <div class="form-label-group w-100">
                            <?php
                                if (isset($_GET["emailnotExists"])){
                                    echo'
                                    <input type="text" name="email" id="staticEmail" class="form-control is-invalid" placeholder="Email address"
                                    autofocus>
                                    <label for="staticEmail">Email address</label>
                                    <div class="valid-feedback">Valid</div>
                                    <div class="invalid-feedback">Please provide a correct email</div>
                                    
                                    ';
                                }else if (isset($_GET["passwordWrong"])){
                                    echo '
                                    <input type="text" name="email" id="staticEmail" class="form-control is-valid" placeholder="Email address"
                                    autofocus>
                                    <label for="staticEmail">Email address</label>
                                    <div class="valid-feedback">Correct Email</div>
                                    <div class="invalid-feedback">Please provide a correct email</div>
                                    
                                    ';
                                }else{
                                    echo '
                                    <input type="text" name="email" id="staticEmail" class="form-control" placeholder="Email address"
                                    autofocus>
                                    <label for="staticEmail">Email address</label>
                                    <div class="valid-feedback">Valid</div>
                                    <div class="invalid-feedback">Please provide a correct email</div>
                                    ';
                                }
                            ?>
                    
                        </div>
                        <div class="form-label-group w-100">
                            <?php
                                if (isset($_GET["passwordWrong"])){
                                    echo'
                                    <input type="password" name="password" id="inputPassword" class="form-control is-invalid" placeholder="Password">
                                    <label for="inputPassword">Password</label>
                                    <div class="invalid-feedback">Password is incorrect</div>
                                    ';
                                }else{
                                    echo '
                                    <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password">
                                    <label for="inputPassword">Password</label>
                                    <div class="valid-feedback">Valid</div>
                                    <div class="invalid-feedback">Password is incorrect</div>
                                    ';
                                }
                            ?>
                        </div>
                        <button class="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2 text-white"
                            type="submit" name="submit" style="background: #7b05aa;">Sign in</button>
                    </form>
                    <div class="row w-100 pt-1">
                        <div class="col-12 text-right">
                            <span data-toggle="modal" data-target="#forgot">
                                <span class="forgotPsw">Forgot
                                    Password?</span></span>
                        </div>
                    </div>
                    <div class="bottom-right" style="bottom:10px;">
                        <a href="/login">I am Alumni</a>
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
                <form id="form_2" action="/api/adminforgot" method="post">
                    <div class="modal-body">
                        <span>When you fill in your registered email address here,
                            you will receive a new password. Please login to your account with that new password sent to your email.</span>
                        <br>
                        <div class="mb-2 mt-3 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label ml-1">Email:</label>
                            <div class="col-sm-8 mr-1">
                                <?php
                                if (isset($_GET["fgemailnotExists"])){
                                    echo'
                                    <input type="text" name="email" class="form-control is-invalid" id="sendEmail" placeholder="example@address.com">
                                    <div class="invalid-feedback">Please provide a valid email.</div>
                                    ';
                                }else{
                                    echo '
                                    <input type="text" name="email" class="form-control" id="sendEmail" placeholder="example@address.com">
                                    <div class="invalid-feedback">Please provide a valid email.</div>
                                    ';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" name="submit" class="btn btn-primary signinbtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <?php
include '../src/templates/GeneralScripts.php'
?>

        <?php

if (isset($_GET["sendPsw"])) {
    echo'
        <div class="modal fade" id="sendPsw" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-check-circle pr-1 mr-1"
                                style="color: rgb(13, 175, 18);"></i>New Password sent to your email!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick=window.closeModal()>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="form_3">
                        <div class="modal-body">
                            <span>Please sign in with the password sent to your email.<br>
                                You are recommended to change your account password after signing in. <br>
                            </span>
                            <br>
                        </div>
                        <div class="modal-footer">
                        <button type="button" onclick=window.gotit() class="btn btn-primary signinbtn">Got It!</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <script type="text/javascript">
                $(document).ready(function(){
                    $("#sendPsw").modal("show");
                });
        function closeModal(){
                $(document).ready(function(){
                    $("#sendPsw").modal("hide");
                });
            }

            function gotit(){
                
               location.href = "/admin-login";
           }
        </script>
';
}
?>

    <script type="module" src="/js/Admin/Admin-LoginPage.js"></script>
</body>

</html>