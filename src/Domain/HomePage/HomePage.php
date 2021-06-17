<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Job/JobModel.php';
include_once '../src/Domain/Event/EventModel.php';
include_once '../src/Domain/Alumni/AlumniModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $event_model = new EventModel($db->getConnection());
    $all_activities_event = $event_model->get6LatestEvent();
    for ($i = 0; $i < count($all_activities_event); $i++) {
        $allImage_event[$i] = $event_model->EventImages($all_activities_event[$i]['eventId']);
    }
    for ($i = 0; $i < count($all_activities_event); $i++) {
        $all_activities_event[$i]['imageId'] = $allImage_event[$i];
    }

    $alumni_model = new AlumniModel($db->getConnection());
    $all_activities_alumni = $alumni_model->AlumniData();
    for ($i = 0; $i < count($all_activities_alumni); $i++) {
        $allImage_alumni[$i] = $alumni_model->AlumniImages($all_activities_alumni[$i]['imageId']);
    }
    for ($i = 0; $i < count($all_activities_alumni); $i++) {
        $all_activities_alumni[$i]['imageId'] = $allImage_alumni[$i];
    }

    $job_model = new JobModel($db->getConnection());
    $all_activities_job = $job_model->Nicole();
    $allImage_job = $job_model->NicoleImages();
    for ($i = 0; $i < count($all_activities_job); $i++) {
        $all_activities_job[$i]['imageId'] = $allImage_job[$i];
    }
} catch (Exception $e) {
    // echo "Exception: " . $e->getMessage();
    error_log("Exception: " . $e->getMessage());
    include_once '../src/templates/header.php';
    include_once '../src/Domain/General_Pages/server_error.php';
    exit();
}

// $Password = "12345";
// $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
// echo $hashedPassword;

?>

<script type="text/javascript">
    var job_array = <?php echo json_encode($all_activities_job) ?>;
</script>
<script type="text/javascript">
    var event_array = <?php echo json_encode($all_activities_event) ?>;
</script>
<script type="text/javascript">
    var alumni_array = <?php echo json_encode($all_activities_alumni) ?>;
</script>

<script type="module" src="/js/Alumni/homePage.js"></script>

<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/HomePage.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>

<div class="container-fluid d-flex flex-column align-items-center p-0" id="main-body">

    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="/Assets/imgs/hp_slide7.jpg" class="image--max-size-100-percent d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="/Assets/imgs/hp_slide8.jpg" class="image--max-size-100-percent d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="/Assets/imgs/hp_slide5.jpg" class="image--max-size-100-percent d-block w-100" alt="...">
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

<?php include_once '../src/templates/footer.php' ?>
<?php include_once '../src/templates/GeneralScripts.php' ?>


<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script> -->

<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

</body>

</html>