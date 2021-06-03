<?php


class JobDetailsModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM job');
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

    public function getRow($id): array{
            $stmt = $this->connection->prepare("SELECT * FROM job WHERE jobId='$id'");
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            // print_r($data);
            if(!$data){
                return array();
            }
            return $data;     

    }

    public function getProfilePicture($id): array{
        $stmt = $this->connection->prepare("
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE jobId='$id'
            ORDER BY postedDateTime DESC");
        // $stmt->bindParam(':id', $id);
        $stmt->execute();
        // $data = $stmt->fetch(PDO::FETCH_ASSOC);
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
        // print_r($data);
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
        // print_r($image);
        return $image;
        // return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
    }
}

?>