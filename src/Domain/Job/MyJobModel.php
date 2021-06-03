<?php


class MyJobModel
{
  private PDO $connection;
  private $user;
  private $id;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
        // $this->id = $id;
        // try {
        //     $stmt = $this->connection->prepare('
        //     SELECT * FROM job 
        //     LEFT JOIN image 
        //     ON job.imageId=image.imageId 
        //     WHERE alumniId=:id');
        //     $stmt->bindParam(':id', $this->id);
        //     $stmt->execute();
        //     $data = $stmt->fetchAll();
        //     $this->user = $data;
        //     if (!$data) {
        //         return array();
        //     }
        //     return $data;
        // } catch (PDOException $exception) {
        //     error_log('MyJobModel: construct: ' . $exception->getMessage());
        //     throw $exception;
        // }

    }

    public function getProfilePicture($id): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE alumniId=:id ORDER BY postedDateTime DESC');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $data = $stmt->fetchAll();
        // if(!$data){
        //     return array();
        // }else{
        //     return $data;
        // }
        // $user = $data;
        // foreach($user as $eachuser){
        //    echo 'data::'. $eachuser[0]['type'].';base64,'.base64_encode($eachuser[0]['imageData']);
        // print_r($user);    
        //   print_r(base64_encode($user[1]['imageData'])); 
            //   $image = base64_encode($user[1]['imageData']);
            //   $type = $user[1]['type'];
            //   echo "<br>";
            //   echo($type);
            //   echo "<img src= 'data:: $type; base64, $image' >";
        // }
        
        $image = array();
        foreach($data as $eachuser){
            // print_r($eachuser['imageData']);
            if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            // echo($temp_string);
            // echo("<br>");
            array_push($image,$temp_string);
            }
        }

        return $image;
        // return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
    }

    public function getRow($id): array{
        $stmt = $this->connection->prepare("SELECT * FROM job WHERE alumniId='$id' ORDER BY postedDateTime DESC");
        $stmt->execute();
        $data = $stmt->fetchAll();
        // print_r($data);
        if(!$data){
            return array();
        }
        return $data;     

    }

    public function getNumRow($alumniID): int{
        $stmt = $this->connection->query("SELECT COUNT(*) FROM job WHERE alumniId='$alumniID'")->fetchColumn();
        // $stmt->execute();
        // $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo ("model");
        
        // print_r($result);
        echo ($stmt);
        return $stmt;
    }

    public function deleteJob($myJobId) {
        $sql = 'DELETE FROM job WHERE jobId = :jobId';

        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue(':jobId', $myJobId);

        $stmt->execute();

        // return $stmt->rowCount();
    }

    public function deleteJobImage($myJobId) {
        $sql = 'DELETE FROM image WHERE imageId = :imageId';

        $stmt = $this->connection->prepare($sql);
        $stmt->bindValue(':imageId', $myJobId);

        $stmt->execute();

        // return $stmt->rowCount();
    }

    public function search($searchterm,$alumniID){
        // echo($searchterm);
        $query = "SELECT * FROM `job` WHERE alumniId='AL-1' AND CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%".$searchterm."%' ORDER BY postedDateTime DESC";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        // echo("php ". $searchterm . " php" . $alumniID);
        // print_r($data);
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
        // $stmt->bindParam(':id', $id);
        $stmt->execute();
        $data = $stmt->fetch();

        return 'data::'. $data['type'].';base64,'.base64_encode($data['imageData']);
        // return $image;
        // return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
    }
//SELECT * FROM `job` WHERE alumniId='AL-1' AND CONCAT( `title`, `description`, `salary`, `company`, `location`) LIKE '%HSBC%'
    

}
