<?php

class AlumniModel
{
  private PDO $connection;
  private static $pageIndex = 1;
  private $totalNumberOfAlumni = 0;
  // import loadAlumniList from "./AlumniPageModule.js";
    // $outputList = dummyResponse.Alumni;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
        try {
            $stmt = $this->connection->prepare('SELECT COUNT(*) FROM alumni 
            WHERE isActive = 1');
            $stmt->execute();
            $data = $stmt->fetch();

            if (!$data) {
                $this->totalNumberOfAlumni = $data['COUNT(*)'];
            }
            return $data;

        } catch (PDOException $exception) {
            error_log('ActivityModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function getAll(): array
    {
        $offset = (self::$pageIndex -1) * 10;
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni 
            WHERE isActive = 1
            LIMIT :offset, 10');
            $stmt->bindParam(':offset',$offset );
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
        self::$pageIndex++;
        header('Location:/alumni');
    }
    
    
    public function previousPage(){
        self::$pageIndex--;
        header('Location:/alumni');
    }

    public function loadPageButton(){
        $alumniStartIndex = self::$pageIndex-1 * 10;
        $alumniEndIndex = $alumniStartIndex + 10;
      
        $remainingLength = $this->totalNumberOfAlumni - $alumniStartIndex;
        $this->previousPageButton(self::$pageIndex);
        $this->nextPageButton($alumniEndIndex,$this->totalNumberOfAlumni);
        $this->remainingPageButton($remainingLength,self::$pageIndex);
    }

    private function previousPageButton($pageIndex){
        if ($pageIndex == 1) {
            echo'
            <li class="page-item disabled">
                <button id="previousPage" onclick="previousPage()" class="page-link" tabindex="-1" aria-disabled="true">Previous</button>
            </li>';
        // This is the first page
        } else {
            echo'
            <li class="page-item" id="previousPage">
                <button onclick="previousPage()" class="page-link">Previous</button>
            </li>';
        }
    }

    /*   This is pages button for button*/
    private function nextPageButton($alumniEndIndex,$totalNumberOfAlumni){
        if ($alumniEndIndex >= $totalNumberOfAlumni) {
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

    private function remainingPageButton($remainingLength,$pageIndex){
        // these are for the 1,2,3 pages
        if ($remainingLength <= 10) {
        // when pages content <=10
        echo'
            <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$pageIndex.'</button>
            </li>';
        } else if ($remainingLength <= 20) {
        // when pages content <=20
        echo'
            <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$pageIndex.'</button>
            </li>
            <li class="page-item" >
                <button class="btn btn-link page-link" onclick="nextPage()">'.($pageIndex + 1).'</button>
            </li>';
        } else {
        // when pages content <=30
        echo'
            <li class="page-item disabled">
                <button class="btn btn-link page-link page-link" tabindex="-1" aria-disabled="true ">'.$pageIndex.'</button>
            </li>
            <li class="page-item" >
                <button class="btn btn-link page-link" onclick="nextPage()">'.($pageIndex + 1).'</button>
            </li>
            <li class="page-item" >
                <button class="btn btn-link page-link" onclick="nextPage();nextPage()">'.($pageIndex + 2).'</button>
            </li>';
        }
    }
}
