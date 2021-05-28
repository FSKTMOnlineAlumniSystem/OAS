<?php
include '../../templates/header.php';
?>
<link rel="stylesheet" type="text/css" href="/public/css/Alumni/AlumniPage.css" />
<link rel="stylesheet" href="/public/css/Alumni/SearchBar.css" />


  <title><?= $GLOBALS['title']; ?></title>
</head>
<body>
  
  <?php
include '../../../config/config.php';
include './AlumniModel.php';
include '../Database.php';

$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $alumnilist = new AlumniModel($db->getConnection());
  $all_alumni = $alumnilist->getAll();
  if (!empty($all_alumni)) {

    foreach ($all_alumni as $alumni) {
      echo "$alumni[alumniId] ";
    }
  }
} catch (Exception $e) {
  echo $e->getMessage();
}

?>

<main class="container my-5" id="main-body">
      <h1>
        Alumni -
        <i
          style="
            font-weight: lighter;
            font-family: 'Times New Roman', Times, serif;
          "
          >“ Awards become corroded. Alumni gather no dust. ”</i
        >
      </h1>
      <br />
      <div id="alumniList"></div>
      <br />
      <span id="pageIndex"></span>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <div id="previousPage"></div>
          <div class="pages list-group list-group-horizontal"></div>
          <div id="nextPage"></div>
        </ul>
      </nav>
      <br />
    </main>
  <!-- custom js files -->
  <script type="module" src="/public/js/Alumni/AlumniPage.js"></script>
  <script type="module" src="/public/js/Alumni/searchAlgo.js"></script>
  
  <?php include '../../templates/footer.php' ?>
