<?php

class Admin_EventModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM events');
            $stmt->execute();
            $data = $stmt->fetchAll();

            // $data = $stmt->fetch(PDO::FETCH_ASSOC);
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

class Admin_Alumni_EventModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni_event');
            $stmt->execute();
            $data = $stmt->fetchAll();

            // $data = $stmt->fetch(PDO::FETCH_ASSOC);
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
class AlumniModel
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

            // $data = $stmt->fetch(PDO::FETCH_ASSOC);
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


class UpdateEventModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }
    // $prevTitle="";
    // $prevTitle=$_GET['title'];
    // UPDATE `events` SET `title` = 'Constraint programming' WHERE `events`.`eventId` = 'E-1';
    public function updateEvent($prevtitle,$eventId,$adminId,$title,$newDate,$description,$imageId,$locate) {
            //  $sql = "UPDATE events SET title='$title',dateTime='$newDate',description='$description',imageId='$imageId',location='$locate' WHERE events,title='$prevtitle'";
            try{
             $sql = "UPDATE events SET title=?,dateTime=?,description=?,imageId=?,location=? WHERE title=?";
             $stmt = $this->connection->prepare($sql);  

             $stmt->execute([$title,$newDate,$description,$imageId,$locate,$prevtitle]);
            }catch (PDOException $exception) {
                error_log('UpdateEventModel: construct: ' . $exception->getMessage());
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
class createEventModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }
    public function updateEvent($eventId,$adminId,$title,$newDate,$description,$imageId,$locate) {
             $sql = "INSERT INTO events (eventId,adminId,title,dateTime,description,imageId,location) VALUES(:eventId,:adminId,:title,:dateTime,:description,:imageId,:location)";
             $stmt = $this->connection->prepare($sql);
            //  $stmt->execute();
             $result = $stmt->execute(array(':eventId'=>$eventId,':adminId'=>$adminId,':title'=>$title,':dateTime'=>$newDate,':description'=>$description,'imageId'=>$imageId,':location'=>$locate));

    }
    
    // SELECT max( CONVERT ( substring_index(jobId,'-',-1), UNSIGNED ) ) AS max FROM job
    public function getMaxId(): int{
        $stmt = $this->connection->query("SELECT max( CONVERT ( substring_index(eventId,'-',-1), UNSIGNED ) ) AS max FROM Events")->fetchColumn();
        return (int)$stmt;

    }
}
// class deleteEventModel
// {
//   private PDO $connection;

//     public function __construct(PDO $connection)
//     {
//         $this->connection = $connection;
//     }
//     public function updateEvent($eventId,$adminId,$title,$newDate,$description,$imageId,$locate) {
//              $sql = "INSERT INTO events (eventId,adminId,title,dateTime,description,imageId,location) VALUES(:eventId,:adminId,:title,:dateTime,:description,:imageId,:location)";
//              $stmt = $this->connection->prepare($sql);
//             //  $stmt->execute();
//              $result = $stmt->execute(array(':eventId'=>$eventId,':adminId'=>$adminId,':title'=>$title,':dateTime'=>$newDate,':description'=>$description,'imageId'=>$imageId,':location'=>$locate));

//     }
    
//     // SELECT max( CONVERT ( substring_index(jobId,'-',-1), UNSIGNED ) ) AS max FROM job
//     public function getMaxId(): int{
//         $stmt = $this->connection->query("SELECT max( CONVERT ( substring_index(eventId,'-',-1), UNSIGNED ) ) AS max FROM Events")->fetchColumn();
//         return (int)$stmt;

//     }
// }
// DELETE FROM `events` WHERE `events`.`eventId` = 'E-18';
?>