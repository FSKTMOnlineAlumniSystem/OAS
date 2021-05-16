<?php
include '../header.php';
?>
<link rel="stylesheet" type="text/css" href="/public/css/Alumni/MyJobDPage.css" />

<title><?= $GLOBALS['title']; ?></title>
</head>
<body>

<?php
include '../../../config/config.php';
include './MyJobModel.php';
include '../Database.php';

$alumniID = "AL-1";

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);


try {
    $myJob_model = new  MyJobModel($db->getConnection());
    $num_rows = $myJob_model->getNumRow($alumniID);
    $myJob = $myJob_model->getRow($alumniID);
    echo("inside" . $num_rows);
    print_r($myJob);
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

<?php include '../footer.php' ?>