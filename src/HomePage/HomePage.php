<?php
include '../header.php';
?>


    <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css" />
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <link href="/public/css/Alumni/HomePage.css" rel="stylesheet" type="text/css" />
    <title><?= $GLOBALS['title']; ?></title>
    </head>
    <body>

    <?php
include '../../../config/config.php';
include './HomePageModel.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $homepage_model = new HomePageModel($db->getConnection());
  $all_activities = $homepage_model->getAll();
  if (!empty($all_activities)) {

    foreach ($all_activities as $activity) {
        echo "$activity[eventId] ";
        // echo "$activity[adminId] ";
        // echo "$activity[jobId] ";
        // echo "$activity[alumniId] ";
    }
  }
} catch (Exception $e) {
  echo "Exception here!";
}

?>

<div class="container-fluid d-flex flex-column align-items-center p-0" id="main-body">

<div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="../../../Assets/imgs/hp_slide7.jpg" class="image--max-size-100-percent d-block w-100"
                alt="...">
        </div>
        <div class="carousel-item">
            <img src="../../../Assets/imgs/hp_slide8.jpg" class="image--max-size-100-percent d-block w-100"
                alt="...">
        </div>
        <div class="carousel-item">
            <img src="../../../Assets/imgs/hp_slide5.jpg" class="image--max-size-100-percent d-block w-100"
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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>

    <script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <script type="module" src="/public/js/Alumni/homePage.js"></script>

    <?php include '../footer.php' ?>