<?php


class MyJobModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getRow($id): array{
        $stmt = $this->connection->prepare("SELECT * FROM job WHERE alumniId='$id' ");
        $stmt->execute();
        $data = $stmt->fetchAll();
        print_r($data);
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


}
