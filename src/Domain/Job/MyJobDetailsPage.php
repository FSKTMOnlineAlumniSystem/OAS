<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Job/MyJobDetailsModel.php';
?>



<?php
include_once '../src/utilities/includeWithVariable.php' ?>
<?php
includeWithVariables('../src/templates/header.php', array(
    'my_css' => '/css/Alumni/MyJobDetailsPage.css',
    'searchBar' => '/css/Alumni/SearchBar.css'
));
?>
<?php
include_once '../src/templates/nav.php';
?>



<?php

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myjobid = $_GET['myjobid'];

try {
    $myjob_model = new MyJobDetailsModel($db->getConnection());
    $myjobdetails = $myjob_model->getRow($myjobid);
    $image = $myjob_model->getJobImage($myjobid);
    $myjobdetails['imageId'] = $image[0];

} catch (Exception $e) {
    echo $e->getMessage();
}
?>

<div class = "container my-5" id='main-body'></div>
<br>

<script type="text/javascript">var job_array = <?php echo json_encode( $myjobdetails) ?>;</script>
<script type="module" src="/js/Alumni/MyJobDetailsPage.js"></script>
<?php include_once '../src/templates/footer.php' ?>
<?php include_once '../src/templates/GeneralScripts.php' ?>