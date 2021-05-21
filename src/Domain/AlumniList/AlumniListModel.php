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

// class UpdateAlumniModel
// {
//   private PDO $connection;

//     public function __construct(PDO $connection)
//     {
//         $this->connection = $connection;
//     }
//     // $prevTitle="";
//     // $prevTitle=$_GET['title'];
//     // UPDATE `events` SET `title` = 'Constraint programming' WHERE `events`.`eventId` = 'E-1';
//     public function updateAlumni($alumniId,$name,$gender,$icNumber,$department,$email,$imageId,$contactNumber) {
//             try{
//              $sql = "UPDATE alumni SET name=?,gender=?,icNumber=?,department=?,email=?, imageId=?, contactNumber=? WHERE alumniId=?";
//              $stmt = $this->connection->prepare($sql);  

//              $stmt->execute([$alumniId,$name,$gender,$icNumber,$department,$email,$imageId,$contactNumber]);
//             }catch (PDOException $exception) {
//                 error_log('UpdateAlumniModel: construct: ' . $exception->getMessage());
//                 throw $exception;
//             }     
//     }
// }
