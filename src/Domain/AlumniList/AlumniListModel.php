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
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE isActive = 1');
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
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE isActive = 1');
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
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE isActive = 1');
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
    
    public function updateAlumni($prevAlumniId,$name,$gender,$department,$icNumber,$graduated,$biography,$email) {
            try{
             $sql = "UPDATE alumni SET name=?,gender=?,icNumber=?,graduated=?,department=?,email=?,biography=? WHERE alumniId=?";
             $stmt = $this->connection->prepare($sql); 
             $stmt->execute([$name,$gender,$icNumber,$graduated,$department,$email,$biography,$prevAlumniId]);
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


