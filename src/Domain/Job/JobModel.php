<?php

class JobModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM job ORDER BY postedDateTime DESC');
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
        return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
    }
    
}

?>