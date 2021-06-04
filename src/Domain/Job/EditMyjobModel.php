<?php


class EditMyJobModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getRow($id): array{
        $stmt = $this->connection->prepare("SELECT * FROM job WHERE jobId='$id'");
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$data){
            return array();
        }
        return $data;     
    }

    public function editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location){
        $sql = "UPDATE job SET jobId=?, title=?, alumniId=?, description=?, salary=?, email=?, postedDateTime=?, imageId=?, company=?, location=? WHERE jobId=?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$jobId,$title,$alumniId,$description,$salary,$email,$postedDateTime,$imageId,$company,$location,$jobId]);
    }

    public function getJobImage($id): array{
        $stmt = $this->connection->prepare("
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE jobId='$id'
            ORDER BY postedDateTime DESC");
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




//     $sql = "UPDATE users SET name=?, surname=?, sex=? WHERE id=?";
// $stmt= $pdo->prepare($sql);
// $stmt->execute([$name, $surname, $sex, $id]);
   
}

?>