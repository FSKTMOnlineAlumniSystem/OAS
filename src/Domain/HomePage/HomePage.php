<!DOCTYPE html>
<html>

<head>


<link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet" />
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />


   <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css" />
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <link href="/css/Alumni/HomePage.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/Alumni/index.css" />
   
    <title><?= $GLOBALS['title']; ?></title>
    </head>
    <body>

    <?php
// include '../../../config/config.php';
// include '../src/Domain/HomePage/HomePage.php';
include '../src/Domain/Database.php';
include '../src/Domain/Job/JobModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $job_model = new JobModel($db->getConnection());
    $all_activities = $job_model->Nicole();
    $allImage = $job_model->NicoleImages();
        
    for ($i=0; $i< count($all_activities); $i++){
        $all_activities[$i]['imageId'] = $allImage[$i];
    }
    // print_r($all_activities);
      
//   $homepage_model = new HomePageModel($db->getConnection());
//   $all_activities = $homepage_model->getAll();
//   if (!empty($all_activities)) {

//     foreach ($all_activities as $activity) {
//         echo "$activity[eventId] ";
//         // echo "$activity[adminId] ";
//         // echo "$activity[jobId] ";
//         // echo "$activity[alumniId] ";
//     }
//   }
} catch (Exception $e) {
  echo "Exception here!";
}

// session_start();
// $em = $_SESSION["alumni"]["email"];
// $_SESSION["em"] = "abc";
// $emb = $_SESSION["emb"];
//
// $em = $_SESSION["alumni"];
// echo $_SESSION;
// $Password = "nkd231u22!3%b_";
// $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
// echo $hashedPassword;

// echo "".$_SESSION["em"]."";

?>

<script type="text/javascript">var job_array = <?php echo json_encode($all_activities) ?>;</script>

<script type="module" src="/js/Alumni/homePage.js"></script>

<div class="container-fluid d-flex flex-column align-items-center p-0" id="main-body">

<div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="/Assets/imgs/hp_slide7.jpg" class="image--max-size-100-percent d-block w-100"
                alt="...">
        </div>
        <div class="carousel-item">
            <img src="/Assets/imgs/hp_slide8.jpg" class="image--max-size-100-percent d-block w-100"
                alt="...">
        </div>
        <div class="carousel-item">
            <img src="/Assets/imgs/hp_slide5.jpg" class="image--max-size-100-percent d-block w-100"
                alt="...">
        </div>
    </div>


    <div class="bottomleft">
        <h1>
            <span class="typewrite" data-period="2000" data-type='[ "Hi, Welcome back!",  
            "Welcome to FSKTM Online Alumni System!", "UM is One!" ]'>
                <span class="wrap"></span></span>
            </a>
        </h1>
    </div>
</div>




<!-- Only insert photos with same width and height -->
<span class="Title">Events</span>

<div class="w-85 bg-grey d-flex flex-column align-items-center">
    <div class="swiper-container p-5">
        <div class="swiper-wrapper" id="event">
        <!-- <div class="swiper-slide pl-1 pr-1">
                            <div class="card h-100">
                                <img class="card-img-top h-50" src="./images/event.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title text-left">UM3MT Competition (FSKTM)</h5>
                                    <div class="card-text">

                                        <div class="row">
                                            <div class="col-2 d-flex flex-column">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                </svg>
                                            </div>
                                            <div class="col-10 d-flex flex-column">
                                                <span class="t">Mar 05,2020</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-2 d-flex flex-column">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                    <path
                                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                                </svg>
                                            </div>
                                            <div class="col-10 d-flex flex-column">
                                                <span class="t">11.00AM - 12.00AM</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-2 d-flex flex-column">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                    <path
                                                        d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </div>
                                            <div class="col-10 d-flex flex-column">
                                                <span class="t">The Cube, FCSIT</span>
                                            </div>
                                        </div>

                                    </div>
                                    <p class="card-text text-center"><small class="text-muted">Last updated 3 mins
                                            ago</small></p>
                                </div>
                            </div>
                        </div> -->

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>

    </div>
    <button id="viewMoreEvents" class="viewMorebtn m-4 rounded-pill">View
        More</button>
</div>



<span class="Title">Jobs</span>
<div class="w-85">
    <div class="row mb-4 mt-1" id="job_row_1">
    </div>
    <div class="row mt-1" id="job_row_2">
    </div>
</div>
<button id="viewMoreJob" class="viewMorebtn m-4 rounded-pill">View
    More</button>



<span class="Title">Alumni</span>
<div class="w-85 bg-grey d-flex flex-column align-items-center">
    <div class="swiper-container p-5">
        <div class="swiper-wrapper" id="alumni">
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
    <button id="viewMoreAlumni" class="viewMorebtn m-4 rounded-pill">View
        More</button>
</div>
<div class="mb-5">
</div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>

    <script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    

    <script type="text/javascript" src="c/js/utility.js"></script>
    <script type="module" src="/js/addHeader.js"></script>
    <script type="text/javascript" src="/js/addNavFooter.js"></script>


    
    <script src="../libs/bootstrap/js/bootstrap.bundle.js"></script>


</body>

</html>

   