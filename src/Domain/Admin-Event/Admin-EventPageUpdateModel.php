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
