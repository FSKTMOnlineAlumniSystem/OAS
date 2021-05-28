<?php

class EventModel
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
            error_log('EventModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

  public function getEvent(string $id): array
  {
    try {
      $stmt = $this->connection->prepare('SELECT * FROM events WHERE eventId = ?');
      $stmt->execute([$id]);
      $data = $stmt->fetch();

      if (!$data) {
        return array();
      }
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: getEvent: ' . $exception->getMessage() . ' id: ' . $id);
      throw $exception;
    }
  }
}
