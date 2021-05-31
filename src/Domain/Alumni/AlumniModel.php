<?php

class AlumniModel
{
  private PDO $connection;
  private static $pageIndex = 0;
  private static $currentAlumni;
  private static $totalList = 0;
  // import loadAlumniList from "./AlumniPageModule.js";
    // $outputList = dummyResponse.Alumni;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni');
            $stmt->execute();
            $data = $stmt->fetchAll();

            if (!$data) {
                return array();
            }
            return $data;

        } catch (PDOException $exception) {
            error_log('ActivityModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function nextPage(){
        $pageIndex++;
        loadAlumniList(outputList);
    }
    
    
    public function previousPage(){
      $pageIndex--;
      loadAlumniList(outputList);
    }

    public function loadPageButton(){
        $alumniStartIndex = $pageIndex * 10;
        $alumniEndIndex = $alumniStartIndex + 10;
      
        $remainingLength = $totalList - $alumniStartIndex;
        /*   This is pages button for button*/
        function nextPageButton(){
            if ($alumniEndIndex >= $totalList) {
                echo'
                <li class="page-item disabled">
                <button id="nextPage"  onclick="nextPage()" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
                </li';
            //This is the last page
            } else {
                echo'
                <li class="page-item" id="nextPage">
                <button  onclick="nextPage()" class="page-link" >Next</button>
                </li>';
            }
        }
        function previousPageButton(){
            if ($pageIndex == 0) {
                echo'
                <li class="page-item disabled">
                <button id="previousPage"  onclick="previousPage()" class="page-link" tabindex="-1" aria-disabled="true">Previous</button>
                </li>';
            // This is the first page
            } else {
                echo'
                <li class="page-item" id="previousPage">
                <button onclick="previousPage()" class="page-link">Previous</button>
                </li>';
            }
        }
        function remainingPageButton(){
            // these are for the 1,2,3 pages
            if ($remainingLength <= 10) {
            // when pages content <=10
            echo'
                <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
                    pageIndex + 1
                }</button>
                </li>';
            } else if ($remainingLength <= 20) {
            // when pages content <=20
            echo'
                <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">${
                    pageIndex + 1
                }</button>
                </li>
                <li class="page-item" >
                <button class="btn btn-link page-link" onclick="nextPage()">${
                    pageIndex + 2
                }</button>
                </li>';
            } else {
            // when pages content <=30
            echo'
                <li class="page-item disabled">
                <button class="btn btn-link page-link page-link" tabindex="-1" aria-disabled="true ">${
                    pageIndex + 1
                }</button>
                </li>
                <li class="page-item" >
                <button class="btn btn-link page-link" onclick="nextPage()">${
                    pageIndex + 2
                }</button>
                </li>
                <li class="page-item" >
                <button class="btn btn-link page-link" onclick="nextPage();nextPage()">${
                    pageIndex + 3
                }</button>
                </li>';
            }
        }
    }

    public function clickProfile($profileClicked) {
        echo "Hi".$profileClicked;
        // location.href = "/profile/".$profileClicked;
    }

    // const imgPath = "/uploads/alumni/";
    public function loadAlumniList($alumniList) {
        //     $sql = "SELECT * FROM Orders LIMIT 15, 10";

        // for($j =0;$j<count($alumniList);j++){
        //     if ($alumniList[$j]['isActive'] == 1 && $alumniList[$j]['alumniId']!=$_SESSION['SignedInAlumniId']){
        //         $outputList[]=$alumniList[$j];
        //     }
        // }
        $outputList=$alumniList;

        $totalList = count($outputList);

        for ($i=0;$i < count($outputList) && $i<10;$i++) {
            $alumniId = $outputList[$i]['alumniId'];
            echo' 
            <div onclick="<?php $alumnilist->clickProfile('.$alumniId.')?>" class="media justify-content-center mb-2 w-75 p-3" style="background-color:#E9E5E5;">
                <div class="image m-auto col-2 p-3">
                    <div style="aspect-ratio:1/1;overflow:hidden;">
                        <img src=${imgPath}'.$outputList[$i]['imageId'].' class="w-100" alt='.$outputList[$i]['name'].'>
                    </div>
                </div>
                <div class="media-body mr-3 my-auto col-10">
                    <h6 class="mt-0 mb-1">'.$outputList[$i]['name'].'</h6>
                    <em class="mb-0">Bachelor of Computer Science ('.$outputList[$i]['department'].'), graduated '.$outputList[$i]['graduated'].'</em>
                    <small style="display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;">'.$outputList[$i]['biography'].'
                    </small>
                </div>
            </div>';
            $currentAlumni = $alumniId;
        }

    }

}
