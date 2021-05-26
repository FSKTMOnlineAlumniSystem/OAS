<?php

class AlumniListModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni');
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
}

class UpdateALumniModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }
    // $prevTitle="";
    // $prevTitle=$_GET['title'];
    // UPDATE `events` SET `title` = 'Constraint programming' WHERE `events`.`eventId` = 'E-1';
    public function updateAlumni($prevAlumniId,$name,$gender,$department,$icNumber,$imageId,$graduated,$biography,$email) {
            try{
             $sql = "UPDATE alumni SET name=?,gender=?,icNumber=?,graduated=?,department=?,email=?,biography=? WHERE alumniId=?";
             $stmt = $this->connection->prepare($sql);  
             $stmt->execute([$prevAlumniId,$name,$gender,$department,$icNumber,$imageId,$graduated,$biography,$email]);
            }catch (PDOException $exception) {
                error_log('UpdateAlumniModel: construct: ' . $exception->getMessage());
                throw $exception;
            }
            
            //  $stmt ->bindParam(':title',$title);
            //  $stmt ->bindParam(':dateTime',$newDate);
            //  $stmt ->bindParam(':description',$description);
            //  $stmt ->bindParam(':imageId',$imageId);
            //  $stmt ->bindParam(':location',$locate);
            //  $result = $stmt->execute(array(':eventId'=>$eventId,':adminId'=>$adminId,':title'=>$title,':dateTime'=>$dateTime,':description'=>$description,'imageId'=>$imageId,':location'=>$locate));

    }
    public function editJob($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location){
        $sql = "UPDATE job SET jobId=?, title=?, alumniId=?, description=?, salary=?, email=?, postedDateTime=?, imageId=?, company=?, location=? WHERE jobId=?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$jobId,$title,$alumniId,$description,$salary,$email,$postedDateTime,$imageId,$company,$location,$jobId]);
        // echo("success");
    }
    
}


