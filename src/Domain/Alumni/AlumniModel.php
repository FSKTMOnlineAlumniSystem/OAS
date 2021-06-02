<?php

class AlumniModel
{
  private PDO $connection;
  private $totalNumberOfAlumni = 0;
  private $pageIndex=0;


    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
        try {
            $stmt = $this->connection->prepare('SELECT COUNT(*) FROM alumni 
            WHERE isActive = 1');
            $stmt->execute();
            $data = $stmt->fetch();

            if (!$data) {
                $this->totalNumberOfAlumni = 0;
            }
            $this->totalNumberOfAlumni = $data['COUNT(*)'];
            return $data;

        } catch (PDOException $exception) {
            error_log('ActivityModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function getAll($pageIndex): array
    {
        $this->pageIndex= $pageIndex;
        $offset = ($pageIndex -1) * 10;
        try {
            $stmt = $this->connection->prepare('
            SELECT * FROM alumni 
            LEFT JOIN image 
            ON alumni.imageId=image.imageId 
            WHERE isActive = 1
            LIMIT :offset, 10');
            $stmt->bindParam(':offset',$offset );
            $stmt->execute();
            $data = $stmt->fetchAll();

            if (!$data) {
                include_once '../src/Domain/General_Pages/page_not_found.php';
                include_once '../src/templates/footer.php';
                exit;
                // return array();
            }
            return $data;

        } catch (PDOException $exception) {
            error_log('ActivityModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function getProfilePicture()
    {
        return 'data::'.$this->data['type'].';base64,'.base64_encode($this->data['imageData']);
    }


    public function moreContent(){
        $offset = ($this->pageIndex) * 10;
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni 
            WHERE isActive = 1
            LIMIT :offset, 10');
            $stmt->bindParam(':offset',$offset );
            $stmt->execute();
            $data = $stmt->fetchAll();

            if (!$data) {
                return false;
            }else{
                return true;
            }

        } catch (PDOException $exception) {
            error_log('ActivityModel: moreContent: ' . $exception->getMessage());
            throw $exception;
        }

    }

    public function previousPageButton(){
        if ($this->pageIndex == 1) {
            echo'
            <li class="page-item disabled">
                <button id="previousPage" onclick="location.href=\'/alumni?page='.$this->pageIndex.'\'" class="page-link" tabindex="-1" aria-disabled="true">Previous</button>
            </li>';
        // This is the first page
        } else {
            echo'
            <li class="page-item" id="previousPage">
                <button onclick="location.href=\'/alumni?page='.($this->pageIndex-1).'\'" class="page-link">Previous</button>
            </li>';
        }
    }

    /*   This is pages button for button*/
    public function nextPageButton(){
        if (!$this->moreContent()) {
            echo'
            <li class="page-item disabled">
                <button id="nextPage"  onclick="location.href=\'/alumni?page='.$this->pageIndex.'\'" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
            </li';
        //This is the last page
        } else {
            echo'
            <li class="page-item" id="nextPage">
                <button  onclick="location.href=\'/alumni?page='.($this->pageIndex+1).'\'" class="page-link" >Next</button>
            </li>';
        }
    }

    public function remainingPageButton(){
        // these are for the 1,2,3 pages
        if ($this->totalNumberOfAlumni <= 10) {
            // when pages content <=10
            echo'
            <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$this->pageIndex.'</button>
            </li>';
        } else if ($this->totalNumberOfAlumni <= 20) {
            // when pages content <=20
            if (!$this->moreContent()) {// no more content
                echo'
                <li class="page-item">
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-1).'\'">'.($this->pageIndex-1).'</button>
                </li>
                <li class="page-item disabled" >
                    <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.($this->pageIndex).'</button>
                </li>';
            } else {// more content
                echo'
                <li class="page-item disabled">
                    <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$this->pageIndex.'</button>
                </li>
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+1).'\'">'.($this->pageIndex+1).'</button>
                </li>';
            }
        } else {
            // when pages content <=30
            if ($this->pageIndex==1) {// first page
                echo'
                    <li class="page-item disabled">
                        <button class="btn btn-link page-link page-link" tabindex="-1" aria-disabled="true ">'.$this->pageIndex.'</button>
                    </li>
                    <li class="page-item" >
                        <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+1).'\'">'.($this->pageIndex+1).'</button>
                    </li>
                    <li class="page-item" >
                        <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+2).'\'">'.($this->pageIndex+2).'</button>
                    </li>';
            } else if(!$this->moreContent()){// no more content
                echo'
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-2).'\'">'.($this->pageIndex-2).'</button>
                </li>
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-1).'\'">'.($this->pageIndex-1).'</button>
                </li>
                <li class="page-item disabled">
                    <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$this->pageIndex.'</button>
                </li>';
            } else if ($this->moreContent()) {// more content
                echo'
                <li class="page-item">
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-1).'\'">'.($this->pageIndex-1).'</button>
                </li>
                <li class="page-item disabled" >
                    <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.($this->pageIndex).'</button>
                </li>
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+1).'\'">'.($this->pageIndex+1).'</button>
                </li>';
            }
        }
    }
}
