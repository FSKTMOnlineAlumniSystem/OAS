<?php
include_once '../src/Domain/Database.php';
include_once '../src/Domain/Alumni/AlumniModel.php';

include_once '../src/utilities/includeWithVariable.php';

includeWithVariables('../src/templates/header.php', array(
  'my_css' => '/css/Alumni/AlumniPage.css',
  'search_bar' => '/css/Alumni/SearchBar.css'
));
include_once '../src/templates/nav.php';


$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  $alumnilist = new AlumniModel($db->getConnection());

  $pageIndex = 1;
  if (isset($_GET['page'])) { // if user is at any of the page
    $pageIndex = $_GET['page']; // variable nav users' previous page or to other page);
  }
  $alumnilist->setPageIndex($pageIndex);
  if (isset($_GET['search'])) { // if user searching will enter (it can be happened any of the page)
    $all_alumni = $alumnilist->searchAlgo($_GET['search']);
    //display the query in the search input
    echo '<script type="text/javascript">
      window.onload = function(){
      document.querySelector("#search").value="' . $_GET['search'] . '"
    }
    </script>';
  } else {
    $all_alumni = $alumnilist->getAll($pageIndex);
  }
} catch (Exception $e) {
  // echo "Exception: " . $e->getMessage();
  error_log("Exception: " . $e->getMessage());
  include_once '../src/templates/header.php';
  include_once '../src/Domain/General_Pages/server_error.php';
  exit();
}
?>
<div class="searchBarBG">
  <form class="search-form">
    <div class="containerSB">
      <div class="row no-gutters" style="white-space: nowrap">
        <div class="col-lg-3 col-md-3 col-sm-12 p-0"></div>
        <div class="col-lg-6 col-md-6 col-sm-12 p-0 input-group">
          <input type="search" placeholder="Search..." class="form-control" id="search" name="search" />
          <div class="input-group-append">
            <button type="submit" id="search-button" class="btn btn-secondary">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
<main class="container my-5" id="main-body">
  <h1>
    Alumni -
    <i style="
            font-weight: lighter;
            font-family: 'Times New Roman', Times, serif;
          ">“ Awards become corroded. Alumni gather no dust. ”</i>
  </h1>
  <br />
  <hr />
  <br />
  <div class="row justify-content-md-center text-center" id="no_result"></div>
  <div id="alumniList">
    <?php
    for ($i = 0; $i < count($all_alumni); $i++) {
      $alumniId = $all_alumni[$i]['alumniId'];
      echo ' 
          <a href="/alumni/profile?id=' . $alumniId . '" class="media justify-content-center mb-2 w-75 p-3" style="background-color:#E9E5E5;color:black; text-decoration: none;">
              <div class="image m-auto col-2 p-3">
                  <div style="aspect-ratio:1/1;overflow:hidden;">
                      <img src="' . $alumnilist->AlumniImages($alumniId)[0] . '" class="w-100" alt=' . $all_alumni[$i]['name'] . '>
                  </div>
              </div>
              <div class="media-body mr-3 my-auto col-10">
                  <h6 class="mt-0 mb-1">' . $all_alumni[$i]['name'] . '</h6>
                  <em class="mb-0">Bachelor of Computer Science (' . $all_alumni[$i]['department'] . '), graduated ' . $all_alumni[$i]['graduated'] . '</em>
                  <small style="display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      text-overflow: ellipsis;">' . $all_alumni[$i]['biography'] . '
                  </small>
              </div>
          </a>';
    }
    ?>
  </div>
  <br />
  <span id="pageIndex"></span>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <div id="previousPage">
        <?= $alumnilist->previousPageButton() ?>
      </div>
      <div class="pages list-group list-group-horizontal">
        <?= $alumnilist->remainingPageButton() ?>
      </div>
      <div id="nextPage">
        <?= $alumnilist->nextPageButton() ?>
      </div>
    </ul>
  </nav>
  <br />
</main>
<?php
include_once '../src/templates/footer.php';
include_once '../src/templates/GeneralScripts.php';
if (empty($all_alumni)) {
  echo '<script> insertSearchNoResult(document.getElementById("no_result"))</script>';
}
?>
<!-- custom js files -->
<!-- <script type="text/javascript" src="/js/addSearchBar.js"></script> -->

</body>

</html>