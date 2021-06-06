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
   public function deleteEvent($eventId) {
       //deleteInviteAlumni
    $sql ="DELETE FROM alumni_event WHERE eventId=?";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute([$eventId]);

    $sql = "DELETE FROM events WHERE eventId=?";
    $stmt = $this->connection->prepare($sql);
   //  $stmt->execute();
    $stmt->execute([$eventId]);
    
    // IF EXISTS（SELECT * FROM image WHERE imageId=?)
    $sql = "DELETE FROM image WHERE imageId=?";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute([$eventId]);
    }

    public function getPicture(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM events
            LEFT JOIN image 
            ON events.imageId=image.imageId');
        $stmt->execute();
        $data = $stmt->fetchAll();

        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageId']=='Default'){
                array_push($image,null);
            }
            else if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }
    public function getDefaultPicture(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM image WHERE imageId="Default"');
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
    public function getNumberOfEvent(): int{
        $sql ="SELECT COUNT(eventId) FROM events";
        $result = $this->connection->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn(); 
        return $number_of_rows;
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
    public function updateEvent($eventId,$adminId,$title,$newDate,$description,$imageId,$locate) {
            //  $sql = "UPDATE events SET title='$title',dateTime='$newDate',description='$description',imageId='$imageId',location='$locate' WHERE events,title='$prevtitle'";
            try{
             $sql = "UPDATE events SET title=?,dateTime=?,description=?,imageId=?,location=? WHERE eventId=?";
             $stmt = $this->connection->prepare($sql);  

             $stmt->execute([$title,$newDate,$description,$imageId,$locate,$eventId]);
            }catch (PDOException $exception) {
                error_log('UpdateEventModel: construct: ' . $exception->getMessage());
                throw $exception;
            }     
    }
}

            //  $stmt ->bindParam(':title',$title);
            //  $stmt ->bindParam(':dateTime',$newDate);
            //  $stmt ->bindParam(':description',$description);
            //  $stmt ->bindParam(':imageId',$imageId);
            //  $stmt ->bindParam(':location',$locate);
            //  $result = $stmt->execute(array(':eventId'=>$eventId,':adminId'=>$adminId,':title'=>$title,':dateTime'=>$dateTime,':description'=>$description,'imageId'=>$imageId,':location'=>$locate));

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

class InviteAlumniModel
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
     public function InviteAlumni($alumniId,$eventId,$dateTime) {
        //  $sql = "UPDATE events SET title='$title',dateTime='$newDate',description='$description',imageId='$imageId',location='$locate' WHERE events,title='$prevtitle'";

        $sql ="SELECT * FROM alumni_event WHERE alumniId=? AND eventId=?";
            $stmt = $this->connection->prepare($sql);

            $stmt->execute([$alumniId,$eventId]);
        
        if($stmt->rowCount() == 0)//no row
        {
            try{
                $sql ="INSERT INTO alumni_event (alumniId, eventId, viewedByAlumni, dateTime, notificationClosedByAlumni)
                    VALUES (?,?,'false',?,'false')";
                $stmt = $this->connection->prepare($sql);
    
                $stmt->execute([$alumniId,$eventId,$dateTime]);
                
                // [$alumniId,$eventId,"false",$dateTime,"false"]
                }catch (PDOException $exception) {
                    error_log('InviteAlumniModel: construct: ' . $exception->getMessage());
                    throw $exception;
                }     
            }
        }
       
       
        
}
?>