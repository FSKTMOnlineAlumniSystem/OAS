<?php
include '../../templates/header.php';
include '../../../config/config.php';
include '../Database.php';
include './AlumniProfileModel.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
    $alumni = new AlumniProfileModel($db->getConnection());
} catch (Exception $e) {
    echo "Exception: " . $e->getMessage();
}
?>

<link rel="stylesheet" type="text/css" href="/public/css/Alumni/MyProfilePage.css" />

  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>
  

<div id="main-body" class="row mx-0 my-5 justify-content-center"></div>
<!-- custom js files -->
<script type="module" src="/public/js/Alumni/AlumniProfilePage.js"></script>
  
<?php include '../../templates/footer.php' ?>