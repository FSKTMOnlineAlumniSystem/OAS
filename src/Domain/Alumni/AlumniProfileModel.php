<?php

class AlumniProfileModel
{
  private PDO $connection;

    public function __construct(PDO $connection,$id)
    {
        $this->connection = $connection;
        $this->id = $id;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni
            WHERE alumniId = :id;
            ');
            $stmt->bindParam(':id', $this->id);
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
    
    public function getProfilePicture()
    {
        return 'data::'.$this->data['type'].';base64,'.base64_encode($this->user['imageData']);
    }
}
