<?php

class Alumni_EventModel
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
            error_log('Alumni_EventModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

  public function getByAlumniId(int $id): array
  {

    try {
      $stmt = $this->connection->prepare('SELECT * FROM alumni_event WHERE alumniId = ?');
      $stmt->execute([$id]);
      $data = $stmt->fetch();

      if (!$data) {
        return array();
      }
      return $data;
    } catch (PDOException $exception) {
      error_log('Alumni_EventModel: getByAlumniId: ' . $exception->getMessage() . ' AlumniId: ' . $id);
      throw $exception;
    }
  }
}
