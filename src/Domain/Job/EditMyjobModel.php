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
        // print_r($data);
        if(!$data){
            return array();
        }
        return $data;     
    }

    public function editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location){
        $sql = "UPDATE job SET jobId=?, title=?, alumniId=?, description=?, salary=?, email=?, postedDateTime=?, imageId=?, company=?, location=? WHERE jobId=?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$jobId,$title,$alumniId,$description,$salary,$email,$postedDateTime,$imageId,$company,$location,$jobId]);
        // echo("success");
    }

//     $sql = "UPDATE users SET name=?, surname=?, sex=? WHERE id=?";
// $stmt= $pdo->prepare($sql);
// $stmt->execute([$name, $surname, $sex, $id]);
   
}

?>