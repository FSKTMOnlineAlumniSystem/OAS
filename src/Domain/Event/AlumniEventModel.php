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
      $query = 'SELECT * FROM alumni_event';
      $stmt = $this->connection->prepare($query);
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

  public function getAllEventInfoByAlumniId(string $id): array
  {
    try {
      $query =
        'SELECT * FROM alumni_event 
       RIGHT JOIN event
       ON alumni_event.eventId = event.eventId 
       WHERE alumniId = ?';
      $stmt = $this->connection->prepare($query);
      $stmt->execute([$id]);
      $data = $stmt->fetchAll();

      if (!$data) {
        return array();
      }
      // push time string for notification panel into the array
      foreach ($data as &$alumni_event) {
        // format the time string into human readable form
        $temp = new DateTime($alumni_event['dateTime']);
        $pastDateTimeSecond = (int)($temp->format("U"));
        $curMilliSeconds = (microtime(true));
        $secondSinceInvitation = (int)round(($curMilliSeconds - $pastDateTimeSecond));
        $minute = floor($secondSinceInvitation / 60);
        $hour = floor($minute / 60);
        $day = floor($hour / 24);
        if ($day === 0) {
          if ($hour % 60 === 0) {
            $timeStr = "$minute minute(s) ago";
          } else {
            $timeStr = "$hour hour(s) ago";
          }
        } else {
          $timeStr = "$day day(s) ago";
        }
        $alumni_event['timeStr'] = $timeStr;
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
      WHERE eventId = ?;');
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
