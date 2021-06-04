<?php
include '../src/Domain/header.php';
?>
<link rel="stylesheet" type="text/css" href="/css/Alumni/MyJobPage.css" />

<title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<?php
// include '../../../config/config.php';
include '../src/Domain/Job/MyJobDetailsModel.php';
include '../src/Domain/Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);
$myjobid = $_GET['myjobid'];

try {
    $myjob_model = new MyJobDetailsModel($db->getConnection());
    $myjobdetails = $myjob_model->getRow($myjobid);
    print_r($myjobdetails);
    //   if (!empty($all_activities)) {

    // foreach ($all_activities as $activity) {
    //   echo "$activity[jobId] ";
    // }
// }
  // print_r($all_activities);

} catch (Exception $e) {
    echo "Exception here!";
}
?>

<div class = "container my-5" id='main-body'></div>
<br>


<?php include '../src/Domain/footer.php' ?>