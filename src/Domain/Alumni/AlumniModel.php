<?php

class AlumniModel
{
  private PDO $connection;
  private $totalNumberOfAlumni = 0;
  private $pageIndex=0;
  private $search;
  private $searchURL = "";


    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
        $sql='
        SELECT COUNT(*) FROM alumni 
        WHERE isActive = 1';
        $this->count($sql);
    }

    public function AlumniImages($alumniId){
        $stmt = $this->connection->prepare('SELECT * FROM alumni LEFT JOIN image ON alumni.imageId=image.imageId WHERE alumniId=:alumniId');
        $stmt->bindParam(':alumniId',$alumniId);
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if(!is_null($eachuser['imageData'])){
                $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
                array_push($image,$temp_string);
            }else{
                $temp_path = '/Assets/imgs/default_user.png';
                array_push($image,$temp_path);
            }
        }
        return $image;
    }

    public function AlumniData(){
        $query = "SELECT * FROM alumni WHERE isActive = 1 AND approvedBy!='' AND  isEmailPublic = 1  order by RAND() LIMIT 0, 6";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        // print_r($data);
        return $data; 
    }

    public function setPageIndex($pageIndex){
        $this->pageIndex=$pageIndex;
    }

    public function count($sql){
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetch();

            if (!$data) {
                $this->totalNumberOfAlumni = 0;
            }
            $this->totalNumberOfAlumni = $data['COUNT(*)'];

        } catch (PDOException $exception) {
            error_log('AlumniModel: count: ' . $exception->getMessage());
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
            error_log('AlumniModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function searchAlgo($searchQuery){
        $this->search = $searchQuery;
        $offset = ($this->pageIndex -1) * 10;
        $query ='
            SELECT * FROM alumni
            LEFT JOIN image 
            ON alumni.imageId=image.imageId
            WHERE isActive = 1 AND
            CONCAT( `name`, `email`, `department`, `graduated`, `biography`)
            LIKE \'%'.$this->search.'%\'
            LIMIT :offset, 10';
        $count = '
            SELECT COUNT(*) FROM alumni 
            WHERE isActive = 1 AND
            CONCAT( `name`, `email`, `department`, `graduated`, `biography`)
            LIKE \'%'.$this->search.'%\'';
        try {
            $stmt = $this->connection->prepare($query);
            $stmt->bindParam(':offset',$offset );
            $stmt->execute();
            $data = $stmt->fetchAll();
            $this->count($count);
            if ($this->totalNumberOfAlumni <10){
                $this->search = null;
            }

            if (!$data) {

            }
            return $data;

        } catch (PDOException $exception) {
            error_log('AlumniModel: searchAlgo: ' . $exception->getMessage());
            throw $exception;
        }

    }

    public function moreContent(){
        $offset = ($this->pageIndex) * 10;
        if ($this->search!=null && $this->totalNumberOfAlumni >10){
            if ($this->totalNumberOfAlumni - $this->pageIndex*10 > 0){
                return true;
            } else {
                return false;
            }
        }else{
            try {
                $stmt = $this->connection->prepare('
                SELECT * FROM alumni 
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
                error_log('AlumniModel: moreContent: ' . $exception->getMessage());
                throw $exception;
            }
        }

    }

    public function previousPageButton(){
        if ($this->search!=null){
            $this->searchURL='&search='.$this->search;
        }
        if ($this->pageIndex == 1) {
            echo'
            <li class="page-item disabled">
                <button id="previousPage" onclick="location.href=\'/alumni?page='.$this->pageIndex.$this->searchURL.'\'" class="page-link" tabindex="-1" aria-disabled="true">Previous</button>
            </li>';
        // This is the first page
        } else {
            echo'
            <li class="page-item" id="previousPage">
                <button onclick="location.href=\'/alumni?page='.($this->pageIndex-1).$this->searchURL.'\'" class="page-link">Previous</button>
            </li>';
        }
    }

    /*   This is pages button for button*/
    public function nextPageButton(){
        if ($this->search!=null){
            $this->searchURL='&search='.$this->search;
        }
        if (!$this->moreContent() || $this->totalNumberOfAlumni<10) {
            echo'
            <li class="page-item disabled">
                <button id="nextPage"  onclick="location.href=\'/alumni?page='.$this->pageIndex.$this->searchURL.'\'" class="page-link" tabindex="-1" aria-disabled="true">Next</button>
            </li';
        //This is the last page
        } else {
            echo'
            <li class="page-item" id="nextPage">
                <button  onclick="location.href=\'/alumni?page='.($this->pageIndex+1).$this->searchURL.'\'" class="page-link" >Next</button>
            </li>';
        }
    }

    public function remainingPageButton(){
        if ($this->search!=null){
            $this->searchURL='&search='.$this->search;
        }
        // these are for the 1,2,3 pages
        if ($this->totalNumberOfAlumni <= 10) {
            // when pages content <=10
            echo'
            <li class="page-item disabled">
                <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$this->pageIndex.'</button>
            </li>';
        } else if ($this->totalNumberOfAlumni <= 20) {
            // when pages content <=20
            if (!$this->moreContent() && $this->pageIndex != 1) {// no more content
                echo'
                <li class="page-item">
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-1).$this->searchURL.'\'">'.($this->pageIndex-1).'</button>
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
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+1).$this->searchURL.'\'">'.($this->pageIndex+1).'</button>
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
                        <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+1).$this->searchURL.'\'">'.($this->pageIndex+1).'</button>
                    </li>
                    <li class="page-item" >
                        <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+2).$this->searchURL.'\'">'.($this->pageIndex+2).'</button>
                    </li>';
            } else if(!$this->moreContent() && $this->pageIndex!=2){// no more content
                echo'
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-2).$this->searchURL.'\'">'.($this->pageIndex-2).'</button>
                </li>
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-1).$this->searchURL.'\'">'.($this->pageIndex-1).'</button>
                </li>
                <li class="page-item disabled">
                    <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.$this->pageIndex.'</button>
                </li>';
            } else if ($this->moreContent() && $this->pageIndex!=1) {// more content
                echo'
                <li class="page-item">
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex-1).$this->searchURL.'\'">'.($this->pageIndex-1).'</button>
                </li>
                <li class="page-item disabled" >
                    <button class="btn btn-link page-link" tabindex="-1" aria-disabled="true">'.($this->pageIndex).'</button>
                </li>
                <li class="page-item" >
                    <button class="btn btn-link page-link" onclick="location.href=\'/alumni?page='.($this->pageIndex+1).$this->searchURL.'\'">'.($this->pageIndex+1).'</button>
                </li>';
            }
        }
    }
}
