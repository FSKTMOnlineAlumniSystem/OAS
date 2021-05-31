<?php
include '../src/Domain/Database.php';
include '../src/Domain/Alumni/AlumniModel.php';

include '../src/utilities/includeWithVariable.php';
// include '../src/templates/header.php';
includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/AlumniPage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
include '../src/templates/nav.php';
?>



  <title>Alumni Profile - Online Alumni System</title>
</head>
<body>
  
<?php

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
      <hr />
      <br />
      <div id="alumniList"></div>
      <?=$alumnilist->loadAlumniList($all_alumni)?>
      <br />
      <span id="pageIndex"></span>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <div id="previousPage">
            <?=$alumnilist->loadPageButton()->previousPageButton()?>
          </div>
          <div class="pages list-group list-group-horizontal">
            <?=$alumnilist->loadPageButton()->remainingPageeButton()?>
          </div>
          <div id="nextPage">
            <?=$alumnilist->loadPageButton()->nextPageButton()?>
          </div>
        </ul>
      </nav>
      <br />
    </main>
  <!-- custom js files -->
  <!-- <script type="module" src="/js/Alumni/AlumniPage.js"></script> -->
  <script type="text/javascript" src="/js/addSearchBar.js"></script>
  <script type="module" src="/js/Alumni/searchAlgo.js"></script>
  <script src="/libs/bootstrap/js/bootstrap.bundle.js"></script>
  <script
    src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous">
  </script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
    integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous">
  </script>
  
  <?php include '../src/templates/footer.php' ?>
