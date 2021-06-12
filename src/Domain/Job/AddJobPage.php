<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Job/AddJobModel.php';
?>

<?php
include_once '../src/utilities/uploadImage.php';
$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);


if (isset($_POST['Submit'])) {

    date_default_timezone_set('Asia/Kuala_Lumpur');
    $date = date('y-m-d H:i:s');
    $postedDateTime = date(DATE_ATOM, strtotime($date));
    $addJob_model = new  AddJobModel($db->getConnection());

    $data = $addJob_model->getMaxId();
    $jobId = "J-" . $data + 1;
    $alumniId = $_SESSION['alumni']['alumniId'];         //ned change
    $title = $_POST['title'];
    $description = $_POST['description'];
    $salary = $_POST['salary'];
    $email = $_POST['email'];
    $postedDateTime = $postedDateTime;
    $jobImage = $jobId;
    $company = $_POST['company'];
    $location = $_POST['location'];

    $addJob_model->addJobs($jobId, $alumniId, $title, $description, $salary, $email, $postedDateTime, $jobImage, $company, $location);

    try {
        //Upload image to database as blob
        if ($_FILES["jobImage"]['tmp_name'] != null) {
            uploadImage($db->getConnection(), $_FILES["jobImage"], $jobImage);
        }
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage();
    }




    header("Location: myjob");
}
?>


<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/AddJobPage.css',
    'searchBar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>



<title>Add Job - Alumni Online System</title>
</head>

<body>
    <div class="row m-0 justify-content-center align-items-center">
        <div class="col-10 col-lg-7 py-5" id='main-body'>
            <h3 class="mb-4">Add New Job</h3>
            <div id="form"></div>
        </div>

    <script type="text/javascript" src="/js/Alumni/AddJobPage.js"></script>
    <?php include_once '../src/templates/footer.php' ?>
    <?php include_once '../src/templates/GeneralScripts.php' ?>