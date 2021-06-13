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
        if($status=="Verified"){
            $query = "
            SELECT * FROM `alumni` WHERE (name LIKE '%$name%' AND department LIKE '%$department%') AND approvedBy!='' AND isActive=1 AND isVerified=1
            ";  
        }else if($status == "All"){
            $query = "
            SELECT * FROM `alumni` WHERE (name LIKE '%$name%' AND department LIKE '%$department%') AND isActive=1 AND isVerified=1
            ";   
        }else if($status=="Not Verified"){
            $query = "
            SELECT * FROM `alumni` WHERE (name LIKE '%$name%' AND department LIKE '%$department%') AND approvedBy='' AND isActive=1 AND isVerified=1
            ";  
        }
        // SELECT * FROM `alumni` WHERE isVerified=1 AND isActive=1 AND CONCAT( `name`) LIKE '%".$name."%' AND CONCAT(`department`) LIKE '%".$department."%' AND approvedBy !='' 

        $stmt = $this->connection->prepare($query);
        $stmt->execute(); 
        $data = $stmt->fetchAll();
        if(!$data){
            return array();
        }
        return $data;
    }

    public function getSearch($id) {
    $stmt = $this->connection->prepare("
    SELECT * FROM alumni
    LEFT JOIN image 
    ON alumni.imageId=image.imageId 
    WHERE WHERE isActive=1 AND isVerified =1 AND imageId='$id' ");
    $stmt->execute();
    $data = $stmt->fetch();
    if(!is_null($data['imageData'])){
        return 'data::'. $data['type'].';base64,'.base64_encode($data['imageData']);
    }else{
        return '/Assets/imgs/default_user.png.jpg';
}
}

}
// public function getProfilePicture(): array{
//     $stmt = $this->connection->prepare('
//         SELECT * FROM alumni
//         LEFT JOIN image 
//         ON alumni.imageId=image.imageId WHERE isActive=1 AND isVerified =1');
    
//     $stmt->execute();
//     $data = $stmt->fetchAll();
//     $image = array();
//     foreach($data as $eachuser){
//         if($eachuser['imageId']==null){
//             array_push($image,null);
//         }
//         else if($eachuser['imageData']){
//         $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
//         array_push($image,$temp_string);
//         }
//     }
//     return $image;
// }

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
