<?php


class MyJobModel
{
  private PDO $connection;
  private $user;
  private $id;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;

    }

    public function getJobImage($id): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE alumniId=:id ORDER BY postedDateTime DESC');
        $stmt->bindParam(':id', $id);
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

    public function getRow($id): array{
        $stmt = $this->connection->prepare("SELECT * FROM job WHERE alumniId='$id' ORDER BY postedDateTime DESC");
        $stmt->execute();
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data;     

    }

    public function getNumRow($alumniID): int{
        $stmt = $this->connection->query("SELECT COUNT(*) FROM job WHERE alumniId='$alumniID'")->fetchColumn();
        return $stmt;
    }

    public function deleteJob($myJobId) {
        $sql = 'DELETE FROM job WHERE jobId = :jobId';

        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue(':jobId', $myJobId);

        $stmt->execute();
    }

    public function deleteJobImage($myJobId) {
        $sql = 'DELETE FROM image WHERE imageId = :imageId';

        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue(':imageId', $myJobId);

        $stmt->execute();
    }

    public function search($searchterm,$alumniID){
        $query = "SELECT * FROM `job` WHERE alumniId='AL-1' AND CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%".$searchterm."%' ORDER BY postedDateTime DESC";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data; 
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
//SELECT * FROM `job` WHERE alumniId='AL-1' AND CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%HSBC%'
    

}
