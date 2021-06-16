<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/LoginPage/GeneralLoginFx.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$conn = $db->getConnection();
?>
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
    
    <link rel="stylesheet" href="/css/Alumni/EditMyProfilePage.css">
    <link rel="stylesheet" type="text/css" href="/css/Alumni/index.css" />
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

<body>

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
                    <h3 class="mb-3 mb-sm-5 d-flex flex-column justify-content-center align-items-center text-center">Welcome back, Alumni!
                    </h3>
                    <form class="w-100 d-flex flex-column justify-content-center align-items-center" action='/api/signin' id="signIN" method="post">
                        <div class="form-label-group w-100">
                            <!-- <input type="text" name="email" id="staticEmail" class="form-control" placeholder="Email address"
                                autofocus>
                            <label for="staticEmail">Email address</label> -->
                            <?php
                                if (isset($_GET["emailnotExists"])){
                                    echo'
                                    <input type="text" name="email" id="staticEmail" class="form-control is-invalid" placeholder="Email"
                                    autofocus>
                                    <label for="staticEmail">Email address</label>
                                    <div class="valid-feedback">Valid</div>
                                    <div class="invalid-feedback">Please provide a correct email</div>
                                    
                                    ';
                                }else if (isset($_GET["passwordWrong"])){
                                    echo '
                                    <input type="text" name="email" id="staticEmail" class="form-control is-valid" placeholder="Email" value="'.$_SESSION["CorrectEmail"].'"
                                    autofocus>
                                    <label for="staticEmail">Email address</label>
                                    <div class="valid-feedback">Correct Email</div>
                                    <div class="invalid-feedback">Please provide a correct email</div>
                                    
                                    ';
                                }else{
                                    echo '
                                    <input type="text" name="email" id="staticEmail" class="form-control" placeholder="Email"
                                    autofocus>
                                    <label for="staticEmail">Email address</label>
                                    <div class="valid-feedback">Valid</div>
                                    <div class="invalid-feedback">Please provide a correct email</div>
                                    ';
                                }
                            ?>
                            
                            <!-- <div class="valid-feedback">Valid</div>
                            <div class="invalid-feedback">Please provide a correct email</div> -->
                        </div>
                        <div class="form-label-group w-100">
                            <!-- <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password">
                            <label for="inputPassword">Password</label> -->
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
                            <!-- <div class="valid-feedback">Valid</div>
                            <div class="invalid-feedback">Password is incorrect</div> -->
                        </div>
                        <button class="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2 text-white"
                            type="submit" name="submit" style="background: #7b05aa;">Sign in</button>
                    </form>
                    <div class="row w-100 pt-1">
                        <div class="col-sm-6 text-sm-left">
                            <span type="signUp" class="signUPbutton"
                                data-toggle="modal" data-target="#signUP">Sign
                                Up </span>
                        </div>

                        <div class="col-sm-6 text-sm-right mt-2 mt-sm-0">
                            <span data-toggle="modal" data-target="#forgot">
                                <span class="forgotPsw">Forgot
                                    Password?</span></span>
                        </div>
                    </div>
                    <div class="bottom-right" style="bottom:10px;">
                        <a href="/admin-login">I am Admin</a>
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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick='$("#forgot").modal("hide")'>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="form_2" action="/api/forgot" method="post">
                    <div class="modal-body">
                        <span>When you fill in your registered email address here,
                            you will receive a new password. Please login to your account with that new password sent to your email.</span>
                        <br>
                        <div class="mb-2 mt-3 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label ml-1">Email:</label>
                            <div class="col-sm-8 mr-1">
                                <!-- <input type="text" name="email" class="form-control" id="sendEmail">
                                <div class="invalid-feedback">Please provide a valid email.</div> -->
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
                        <button type="submit" name="submit" class="btn  btn-primary  signinbtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>



 
    <!-- signUp -->
    
    <div class="modal fade" id="signUP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sign Up</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form action="/api/signup" id="form" method="post" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div class="mb-3 row">
                            <label for="profilePic" class="col-sm-3 col-form-label ml-1">Profile picture:</label>
                            <div class="col-sm-8 mr-1 d-flex align-items-center justify-content-center">
                                <div class="w-50 position-relative">
                                    <div class="picture-container">
                                        <div class="picture">
                                            <img src="/Assets/imgs/add_image.jpg" class="picture-src m-auto"
                                                id="wizardPicturePreview" title="">
                                            <input type="file" id="wizard-picture" name="profilePicture">
                                            <input type="file" name="profilePicture" id="profilePicture" class="d-none">
                                        </div>
                                        <!-- <h6 id="choosePictureDescription">Choose Picture</h6> -->
                                        <h6 id="choosePictureDescription"></h6>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="mb-3 row">

                            <label for="FirstName" class="col-sm-3 col-form-label ml-1">First Name:</label>
                            <div class="col-sm-8 mr-1">
                                <input type="text" class="form-control" id="FirstNameID" name="FirstNameID" placeholder="John">
                                <small class="invalid-feedback">Please provide a valid First Name.</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="LastName" class="col-sm-3 col-form-label ml-1">Last Name:</label>
                            <div class="col-sm-8 mr-1">
                                <input type="text" class="form-control" id="LastNameID" name="LastNameID" placeholder="Mayer">
                                <small class="invalid-feedback">Please provide a valid Last Name.</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>

                        <div class="mb-3 row">
                            <label for="inputGender" class="col-sm-3 col-form-label ml-1">Gender:</label>
                            <div class="col-sm-8 mr-1">
                                <select name="gender" class="form-control p-1" id="Gender" aria-label="Default select example">
                                    <option value="0">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <small class="invalid-feedback">Select a Gender</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputBatch" class="col-sm-3 col-form-label ml-1">Batch:</label>
                            <div class="col-sm-8 mr-1">
                                <select name="Batch" class="form-control p-1" id="Batch" aria-label="Default select example">
                                    <option value="0">Batch</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                </select>
                                <small class="invalid-feedback">Select a batch</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label ml-1">Email:</label>
                            <div class="col-sm-8 mr-1">
                                <!-- <input type="text" name="email" class="form-control" id="Email"> -->
                                <?php
                                    if (isset($_GET["emailExists"])){
                                    echo '
                                    <input type="text" name="email" class="form-control is-invalid" id="Email" placeholder="example@address.com">
                                    <small class="invalid-feedback">Email exists.</small>
                                    <script type="text/javascript">
                                            $(document).ready(function(){
                                                $("#signUP").modal("show");
                                            });
                                    </script>
                                    ';
                                    }else if (isset($_GET["emailFake"])){
                                    echo '
                                    <input type="text" name="email" class="form-control is-invalid" id="Email" placeholder="example@address.com">
                                    <small class="invalid-feedback">Email is not exists in real life.</small>
                                    <script type="text/javascript">
                                            $(document).ready(function(){
                                                $("#signUP").modal("show");
                                            });
                                    </script>
                                    ';
                                    }
                                    else{
                                    echo '
                                    <input type="text" name="email" class="form-control" id="Email" placeholder="example@address.com">
                                    <small class="invalid-feedback">Please provide a valid Email.</small>
                                    <small class="valid-feedback">Okay!</small>
                                    ';
                                    }
                                ?>
                                <!-- <small class="invalid-feedback">Please provide a valid Email.</small>
                                <small class="valid-feedback">Okay!</small> -->
                            </div>
                            
                        </div>
                        <div class="mb-3 row">
                            <label for="IC" class="col-sm-3 col-form-label ml-1">Ic no.:</label>
                            <div class="col-sm-8 mr-1">
                                <input type="tel" name="IC" class="form-control" id="IC" placeholder="503948-80-1111">
                                <small class="invalid-feedback">Please provide a valid IC with dash.</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="Department" class="col-sm-3 col-form-label ml-1">Department:</label>
                            <div class="col-sm-8 mr-1">
                                <select name="department" class="form-control p-1" id="Department" aria-label="Default select example">
                                    <option value="0">Department</option>
                                    <option value="Software Engineering">Software Engineering</option>
                                    <option value="Artificial Intellegent">Artificial Intellegent</option>
                                    <option value="Computer System and Technology">Computer System and Technology
                                    </option>
                                    <option value="Information System">Information System</option>
                                    <option value="Multimedia">Multimedia</option>
                                </select>
                                <small class="invalid-feedback">Select a department</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-3 col-form-label ml-1">Password</label>
                            <div class="col-sm-8 mr-1">
                                <input type="password" name="Password" class="form-control" id="Password" placeholder="Must at least 5 character">
                                <small class="invalid-feedback">Please enter only 5-20 characters available for
                                    password.</small>
                                <small class="valid-feedback">Okay!</small>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" name="submit" class="btn btn-primary signinbtn">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    


    
</div>


<?php
include '../src/templates/GeneralScripts.php'
?>

   
   <!-- wait for verification  -->
   
   <?php
    if (isset($_GET["id"]) && emailExists($conn, $email = Decrypt($_GET["id"]))) {

        $stmt = $conn->prepare("UPDATE alumni SET isVerified=1 WHERE email=:email");
        $stmt->bindParam(':email',$email);
        $stmt->execute();
        
        echo'
            <div class="modal fade" id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><i class="fas fa-check-circle pr-1 mr-1"
                                    style="color: rgb(13, 175, 18);"></i>Thank you!</h5>
                            <button type="button" class="close" data-dismiss="modal" onclick=window.closeModal()>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="form_3">
                            <div class="modal-body">
                                <span>Thank you for signing up.<br>
                                    Your application is successfully submitted, please wait for the verification.<br>
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
                        $("#id").modal("show");
                    });

                    function closeModal(){
                        $(document).ready(function(){
                            $("#id").modal("hide");
                        });
                    }
                    function gotit(){
                        console.log("hi");
                       location.href = "/login";
                   }
            </script>
    ';
}
?>

<!-- not approved yet -->
<?php
    if (isset($_GET["NotApprovedYet"])) {
        
        echo'
            <div class="modal fade" id="NotApprovedYet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><i class="fas fa-check-circle pr-1 mr-1"
                                    style="color: rgb(13, 175, 18);"></i>Please wait patiently!</h5>
                            <button type="button" class="close" data-dismiss="modal" onclick=window.closeModal()>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="form_3">
                            <div class="modal-body">
                                <span>
                                    Your application is not approved by the admin yet, please wait patiently.<br>
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
                        $("#NotApprovedYet").modal("show");
                    });

                    function closeModal(){
                        $(document).ready(function(){
                            $("#NotApprovedYet").modal("hide");
                        });
                    }

                    
                    function gotit(){
                         console.log("hi");
                        location.href = "/login";
                    }
                   
  
            </script>
    ';
}
?>

<!-- verify email -->

<?php

if (isset($_GET["doneSend"])) {
    echo'
        <div class="modal fade" id="doneSend" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-check-circle pr-1 mr-1"
                                style="color: rgb(13, 175, 18);"></i>Next Step</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick=window.closeModal()>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="form_3">
                        <div class="modal-body">
                            <span>Thank you for signing up.<br>
                                You need to verify your account. <br>
                                Sign in to your email account and click in the verification link we just email you.
                            </span>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <p>Thank you.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script type="text/javascript">
                $(document).ready(function(){
                    $("#doneSend").modal("show");
                });
        function closeModal(){
                $(document).ready(function(){
                    $("#doneSend").modal("hide");
                });
            }
        </script>
';
}
?>

<!--  need to verify email before forgot password -->

<?php

if (isset($_GET["verify"])) {
    echo'
        <div class="modal fade" id="doneSend" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-check-circle pr-1 mr-1"
                                style="color: rgb(13, 175, 18);"></i>Next Step</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick=window.closeModal()>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="form_3">
                        <div class="modal-body">
                            <span>
                                You need to verify your account. <br>
                                Sign in to your email account and click in the verification link we email you.
                            </span>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <p>Thank you.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script type="text/javascript">
                $(document).ready(function(){
                    $("#doneSend").modal("show");
                });
        function closeModal(){
                $(document).ready(function(){
                    $("#doneSend").modal("hide");
                });
            }
        </script>
';
}
?>

<!-- chgpsw -->

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
                
               location.href = "/login";
           }
        </script>
';
}
?>


<?php
        if (isset($_GET["emailExists"])){
            echo '
            <script type="text/javascript">
                    $(document).ready(function(){
                        $("#signUP").modal("show");
                    });
            </script>
            ';
        }else if(isset($_GET["emailFake"])){
            echo '
            <script type="text/javascript">
                    $(document).ready(function(){
                        $("#signUP").modal("show");
                    });
            </script>
            ';
        }
    ?>

<?php

    if (isset($_GET["fgemailnotExists"])) {
        echo'
        <script type="text/javascript">
            $(document).ready(function(){
                $("#forgot").modal("show");
            });
        </script>
        ';
    }
?>
<?php
include_once '../src/templates/GeneralScripts.php';
?>
<script type="module" src="/js/Alumni/LoginPage.js"></script>

</body>

</html>

<!-- <div class="modal fade" id="notificationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thank you for signing up</h5>
                <button type="button" class="close" data-dismiss="modal" onclick="$("#notificationModal").modal("hide")">
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
                    <button type="submit" class="btn  btn-primary  signinbtn">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div> -->