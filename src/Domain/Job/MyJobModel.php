<?php


class MyJobModel
{
  private PDO $connection;
    private $user;
    public function __construct(PDO $connection,$id)
    {
        $this->connection = $connection;
        $this->id = $id;
        try {
            $stmt = $this->connection->prepare('
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE jobId=:id');
            $stmt->bindParam(':id', $this->id);
            $stmt->execute();
            $data = $stmt->fetch();
            $this->user = $data;
            if (!$data) {
                return array();
            }
            return $data;
        } catch (PDOException $exception) {
            error_log('MyJobModel: construct: ' . $exception->getMessage());
            throw $exception;
        }

    }

    public function getProfilePicture()
    {
        return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
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

}
