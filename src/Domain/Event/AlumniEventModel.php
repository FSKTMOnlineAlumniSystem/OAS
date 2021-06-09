<?php

class AlumniEventModel
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
            error_log('AlumniEventModel: getAll: ' . $exception->getMessage());
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
      error_log('AlumniEventModel: getByAlumniId: ' . $exception->getMessage() . ' alumniId: ' . $id);
      throw $exception;
    }
  }
  public function setNotificationClosedTrue(string $eventId): array
  {
    try {
      $stmt = $this->connection->prepare('
      UPDATE alumni_event 
      SET notificationClosedByAlumni = 1 
      WHERE eventId = ?');
      $stmt->execute([$eventId]);
      $data = $stmt->fetch();

      if (!$data) {
        return array();
      }
      return $data;
    } catch (PDOException $exception) {
      error_log('AlumniEventModel: setNotificationClosedTrue: ' . $exception->getMessage() . ' eventId: ' . $eventId);
      throw $exception;
    }
  }
  public function setViewedByAlumniTrue(string $eventId): array
  {
    try {
      $stmt = $this->connection->prepare('
      UPDATE alumni_event 
      SET viewedByAlumni = 1 
      WHERE eventId = ?');
      $stmt->execute([$eventId]);
      $data = $stmt->fetch();

      if (!$data) {
        return array();
      }
      return $data;
    } catch (PDOException $exception) {
      error_log('AlumniEventModel: setViewedByAlumniTrue: ' . $exception->getMessage() . ' eventId: ' . $eventId);
      throw $exception;
    }
  }
}
