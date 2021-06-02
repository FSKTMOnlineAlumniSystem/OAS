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


$db = new Database(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

try {
  if($_GET==null){
    $pageIndex=1;
  }else{
    $pageIndex=$_GET['page'];
  }
  $alumnilist = new AlumniModel($db->getConnection());
  $all_alumni = $alumnilist->getAll($pageIndex);
  if (!empty($all_alumni)) {
      // print_r($all_alumni);
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
      <div id="alumniList">
      <?php
        for ($i=0;$i < count($all_alumni);$i++) {
          $alumniId = $all_alumni[$i]['alumniId'];
          echo' 
          <a href="/profile/'.$alumniId.'" class="media justify-content-center mb-2 w-75 p-3" style="background-color:#E9E5E5;color:black; text-decoration: none;">
              <div class="image m-auto col-2 p-3">
                  <div style="aspect-ratio:1/1;overflow:hidden;">
                      <img src="data::'.$all_alumni[$i]['type'].';base64,'.base64_encode($all_alumni[$i]['imageData']).'" class="w-100" alt='.$all_alumni[$i]['name'].'>
                  </div>
              </div>
              <div class="media-body mr-3 my-auto col-10">
                  <h6 class="mt-0 mb-1">'.$all_alumni[$i]['name'].'</h6>
                  <em class="mb-0">Bachelor of Computer Science ('.$all_alumni[$i]['department'].'), graduated '.$all_alumni[$i]['graduated'].'</em>
                  <small style="display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      text-overflow: ellipsis;">'.$all_alumni[$i]['biography'].'
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
            <?=$alumnilist->previousPageButton()?>
          </div>
          <div class="pages list-group list-group-horizontal">
            <?=$alumnilist->remainingPageButton()?>
          </div>
          <div id="nextPage">
            <?=$alumnilist->nextPageButton()?>
          </div>
        </ul>
      </nav>
      <br />
    </main>
  <?php include '../src/templates/footer.php' ?>
  <!-- custom js files -->
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
  
  </body>

</html>