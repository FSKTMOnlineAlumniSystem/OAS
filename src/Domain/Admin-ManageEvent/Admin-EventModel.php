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
            $stmt = $this->connection->prepare('SELECT * FROM event');
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
   public function getEvent($eventId)
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM event WHERE eventId=?');
            $stmt->execute([$eventId]);
            $data = $stmt->fetchAll();
            if (!$data) {
                include_once '../src/Domain/General_Pages/admin_page_not_found.php';
                return exit;
            }
            return $data;
        } catch (PDOException $exception) {
            error_log('ActivityModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
        
   }
   public function deleteEvent($eventId) {
    $sql ="DELETE FROM alumni_event WHERE eventId=?";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute([$eventId]);

    $sql = "DELETE FROM event WHERE eventId=?";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute([$eventId]);
    
    $sql = "DELETE FROM image WHERE imageId=?";
    $stmt = $this->connection->prepare($sql);
    $stmt->execute([$eventId]);
    }

    public function getPicture(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM event
            LEFT JOIN image 
            ON event.imageId=image.imageId');
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageId']=='Default'||$eachuser['imageId']==null){
                array_push($image,null);
            }
            else if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }

    public function getSearch($id) {
        $stmt = $this->connection->prepare("
            SELECT * FROM event
            LEFT JOIN image 
            ON event.imageId=image.imageId 
            WHERE eventId='$id' ");
        $stmt->execute();
        $data = $stmt->fetch();
        if($data['imageId']=='Default'||$data['imageId']==null){
            return '/Assets/imgs/default_events.jpg';
        }
        else if($data['imageData']!=null){
            return 'data::'. $data['type'].';base64,'.base64_encode($data['imageData']);
        }
    }
    public function search($searchterm){
        $query = "SELECT * FROM `event` WHERE (title LIKE '%$searchterm%' OR description LIKE '%$searchterm%' OR location LIKE '%$searchterm%') ";  
        $stmt = $this->connection->prepare($query); 
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data; 
    }
    public function getNumberOfEvent(): int{
        $sql ="SELECT COUNT(eventId) FROM event";
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
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE isActive=1 AND isVerified =1');
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
    public function getPicture(): array{
        $stmt = $this->connection->prepare('
        SELECT * FROM alumni
        LEFT JOIN image 
        ON alumni.imageId=image.imageId WHERE isActive=1 AND isVerified =1');
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageId']=='Default'||$eachuser['imageId']==null){
                array_push($image,null);
            }
            else if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }
    public function getSearch($id) {
        $stmt = $this->connection->prepare("
            SELECT * FROM alumni 
            LEFT JOIN image 
            ON alumni.imageId=image.imageId 
            WHERE alumniId='$id' AND (isActive=1 AND isVerified =1)");
        $stmt->execute();
        $data = $stmt->fetch();
        if($data['imageId']=='Default'||$data['imageId']==null){
            return '/Assets/imgs/default_user.jpg';
        }
        else if($data['imageData']!=null){
            return 'data::'. $data['type'].';base64,'.base64_encode($data['imageData']);
        }
    }
    public function search($searchterm){
        $query = "SELECT * FROM `alumni` WHERE (isActive=1 AND isVerified =1) AND (name LIKE '%$searchterm%' OR department LIKE '%$searchterm%') "; 
         $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data; 
    }
    public function searchDepartment($searchterm){
        $query = "SELECT * FROM `alumni` WHERE (isActive=1 AND isVerified =1) AND (department LIKE '%$searchterm%') ";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data; 
    }
    public function searchStatus($status, $eventId){
        $query = "SELECT alumniId FROM `alumni_event` WHERE eventId=?";  
        $stmt = $this->connection->prepare($query);  
        $stmt->execute([$eventId]);
        $data = $stmt->fetchAll();
        $alumni = array();
        foreach($data as $eachAlumni){
            $query = "SELECT * FROM `alumni` WHERE alumniId=? AND (isActive=1 AND isVerified =1) ";  
            $stmt = $this->connection->prepare($query);  
            $stmt->execute([$eachAlumni['alumniId']]);
            $alumniData = $stmt->fetch(PDO::FETCH_ASSOC);
            array_push($alumni,$alumniData);
        }
        if(!$data){
            return array();
        }
        if($status=='Invited'){
            return $alumni; 
        }else{
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE isActive=1 AND isVerified =1');
            $stmt->execute();
            $allAlumni = $stmt->fetchAll();
            foreach($alumni as $eachAlumni){
                if(in_array($eachAlumni,$allAlumni)){
                    $key=array_search($eachAlumni,$allAlumni);
                    unset($allAlumni[$key]);
                }
            }
            $allAlumni = array_values($allAlumni);
            return $allAlumni;
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
    public function updateEvent($eventId,$adminId,$title,$newDate,$description,$imageId,$locate) {
             try{
             $sql = "UPDATE event SET adminId=?, title=?,dateTime=?,description=?,imageId=?,location=? WHERE eventId=?";
             $stmt = $this->connection->prepare($sql);  
             $stmt->execute([$adminId,$title,$newDate,$description,$imageId,$locate,$eventId]);
            }catch (PDOException $exception) {
                error_log('UpdateEventModel: construct: ' . $exception->getMessage());
                throw $exception;
            }     
    }
    public function getImageId($eventId) :string {
         $sql = "SELECT imageId FROM `event` WHERE eventId=?";
         $stmt = $this->connection->prepare($sql);  
         $stmt->execute([$eventId]);
         $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if($data['imageId']!=null){
            // echo $data['imageId'];
            return $data['imageId'];
        }
        else{
            // echo 'default';
            return "Default";
        }
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
             $sql = "INSERT INTO event (eventId,adminId,title,dateTime,description,imageId,location) VALUES(:eventId,:adminId,:title,:dateTime,:description,:imageId,:location)";
             $stmt = $this->connection->prepare($sql);
             $result = $stmt->execute(array(':eventId'=>$eventId,':adminId'=>$adminId,':title'=>$title,':dateTime'=>$newDate,':description'=>$description,'imageId'=>$imageId,':location'=>$locate));
    }
    public function getMaxId(): int{
        $stmt = $this->connection->query("SELECT max( CONVERT ( substring_index(eventId,'-',-1), UNSIGNED ) ) AS max FROM event")->fetchColumn();
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
                }catch (PDOException $exception) {
                    error_log('InviteAlumniModel: construct: ' . $exception->getMessage());
                    throw $exception;
                }     
            }
        }
}
?>