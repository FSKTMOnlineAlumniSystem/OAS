<?php

class JobModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM job ORDER BY postedDateTime DESC');
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

    public function search($searchterm){
        $query = "SELECT * FROM `job` WHERE CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%".$searchterm."%' ORDER BY postedDateTime DESC";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data; 
    }

    public function getJobImage(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            ORDER BY postedDateTime DESC');
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }
    
    public function getSearch($id) {
        $stmt = $this->connection->prepare("
            SELECT * FROM job
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE jobId='$id' ");
        $stmt->execute();
        $data = $stmt->fetch();

        return 'data::'. $data['type'].';base64,'.base64_encode($data['imageData']);
    }

    public function Nicole(){
        $query = "SELECT * FROM job ORDER BY postedDateTime DESC LIMIT 4";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data; 
    }

    public function NicoleImages(){
        $stmt = $this->connection->prepare('SELECT * FROM job LEFT JOIN image ON job.imageId=image.imageId ORDER BY postedDateTime DESC LIMIT 4');
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageData']){
                $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);

                array_push($image,$temp_string);
        }
    }
        return $image;
    }
}

?>