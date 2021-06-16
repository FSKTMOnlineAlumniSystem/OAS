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
            $stmt = $this->connection->prepare('
            SELECT * FROM alumni WHERE isActive = 1 AND isVerified =1
            ');
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

    public function getProfilePicture(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM alumni
            LEFT JOIN image 
            ON alumni.imageId=image.imageId WHERE isActive=1 AND isVerified =1');
        
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageId']==null){
                array_push($image,null);
            }
            else if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }

    public function getNumberOfApprovedAlumni(): int{
        $sql ='SELECT COUNT(alumniId) FROM alumni WHERE approvedBy!="" AND isActive=1 AND isVerified =1';
        $result = $this->connection->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn(); 
        return $number_of_rows;
    }

    public function getNumberOfUnapprovedAlumni(): int{
        $sql ='SELECT COUNT(alumniId) FROM alumni WHERE approvedBy="" AND isActive=1 AND isVerified =1';
        $result = $this->connection->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn(); 
        return $number_of_rows;
    }

    public function search($name, $department, $status){
        if($status=="Approved"){
            $query = "
            SELECT * FROM `alumni` WHERE (name LIKE '%$name%' AND department LIKE '%$department%') AND approvedBy!='' AND isActive=1 AND isVerified=1
            ";  
        }else if($status == "All"){
            $query = "
            SELECT * FROM `alumni` WHERE (name LIKE '%$name%' AND department LIKE '%$department%') AND isActive=1 AND isVerified=1
            ";   
        }else if($status=="Pending Approval"){
            $query = "
            SELECT * FROM `alumni` WHERE (name LIKE '%$name%' AND department LIKE '%$department%') AND approvedBy='' AND isActive=1 AND isVerified=1
            ";  
        }

        $stmt = $this->connection->prepare($query);
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data;
    }

   
public function getSearch($alumniId) {
    $stmt = $this->connection->prepare("
    SELECT * FROM alumni LEFT JOIN image ON alumni.imageId=image.imageId WHERE alumniId='$alumniId' AND isActive=1 AND isVerified=1
    ");
    $stmt->execute();
    $data = $stmt->fetch();
    if($data['imageId']=='Default'||$data['imageId']==null){
        return '/Assets/imgs/default_user.png';
    }
    else if($data['imageData']!=null){
        return 'data::'. $data['type'].';base64,'.base64_encode($data['imageData']);
    }
}

        public function getAlumni($alumniId)
        {
            try {
                $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE alumniId=?');
                $stmt->execute([$alumniId]);
                $data = $stmt->fetchAll();
                // $data = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$data) {
                    include_once '../src/utilities/includeWithVariable.php' ;
                    includeWithVariables('../src/templates/header.php');
                        include_once '../src/Domain/General_Pages/admin_page_not_found.php';
                        include_once '../src/templates/GeneralScripts.php';;     
                        exit;                     
                }
                return $data;
    
            } catch (PDOException $exception) {
                error_log('ActivityModel: getAll: ' . $exception->getMessage());
                throw $exception;
            }
            
       }

    

}

class DeleteAlumniModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }
    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE isActive = 1 AND isVerified =1');
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

    public function getProfilePicture(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM alumni
            LEFT JOIN image 
            ON alumni.imageId=image.imageId WHERE isActive=1 AND isVerified =1');
        
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageId']==null){
                array_push($image,null);
            }
            else if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }

    public function deleteAlumni($alumniId) {
            try{
             $sql = "UPDATE alumni SET isActive = 0 WHERE alumniId=?";
             $stmt = $this->connection->prepare($sql); 
             $stmt->execute([$alumniId]);
            }catch (PDOException $exception) {
                error_log('DeleteAlumniModel: construct: ' . $exception->getMessage());
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

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('
            SELECT * FROM alumni WHERE isActive = 1 AND isVerified =1');
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

    public function getProfilePicture(): array{
        $stmt = $this->connection->prepare('
            SELECT * FROM alumni
            LEFT JOIN image 
            ON alumni.imageId=image.imageId WHERE isActive=1 AND isVerified =1');
        $stmt->execute();
        $data = $stmt->fetchAll();
        $image = array();
        foreach($data as $eachuser){
            if($eachuser['imageId']==null){
                array_push($image,null);
            }
            else if($eachuser['imageData']){
            $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
            array_push($image,$temp_string);
            }
        }
        return $image;
    }
    
    public function updateAlumni($prevAlumniId,$name,$gender,$department,$icNumber,$graduated,$biography,$imageId) {
            try{
             $sql = "UPDATE alumni SET name=?,gender=?,icNumber=?,graduated=?,department=?,biography=?, imageId=? WHERE alumniId=?";
             $stmt = $this->connection->prepare($sql); 
             $stmt->execute([$name,$gender,$icNumber,$graduated,$department,$biography,$imageId,$prevAlumniId]);
            }catch (PDOException $exception) {
                error_log('UpdateAlumniModel: construct: ' . $exception->getMessage());
                throw $exception;
            }
    }

    public function updateApprovedby($adminId,$alumniId) {
        try{
         $sql = "UPDATE alumni SET approvedBy=? WHERE alumniId=?";
         $stmt = $this->connection->prepare($sql);  
         $stmt->execute([$adminId,$alumniId]);
        }catch (PDOException $exception) {
            error_log('UpdateApprovedByModel: construct: ' . $exception->getMessage());
            throw $exception;
        }       
} 
}
