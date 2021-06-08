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
      $stmt = $this->connection->prepare('
      SELECT * FROM events
      LEFT JOIN image 
      ON events.imageId=image.imageId');
      $stmt->execute();
      $data = $stmt->fetchAll();

      if (!$data) {
        return array();
      }
      // return the sorted event based on datetime
      usort($data, fn ($a, $b) => strtotime($a['dateTime']) - strtotime($b['dateTime']));
      $data = array_reverse($data);
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: getAll: ' . $exception->getMessage());
      throw $exception;
    }
  }

  public function getEvent(string $id): array
  {
    try {
      $stmt = $this->connection->prepare('
      SELECT * FROM events 
      LEFT JOIN image 
      ON events.imageId=image.imageId 
      WHERE eventId= ?');
      $stmt->execute([$id]);
      $data = $stmt->fetch();
      $this->event = $data;
      if (!$data) {
        return array();
      }
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: getEvent: ' . $exception->getMessage() . ' id: ' . $id);
      throw $exception;
    }
  }
  public function getEventPicture()
  {
    return 'data::' . $this->event['type'] . ';base64,' . base64_encode($this->event['imageData']);
  }
  public function get6LatestEvent(): array
  {
    try {
      $stmt = $this->connection->prepare('
      SELECT * FROM events 
      LEFT JOIN image 
      ON events.imageId=image.imageId');
      $stmt->execute();
      $data = $stmt->fetchAll();
      $this->event = $data;
      if (!$data) {
        return array();
      }
      // sort the event based on datetime
      usort($data, fn ($a, $b) => strtotime($a['dateTime']) - strtotime($b['dateTime']));
      $data = array_reverse(array_slice($data, -6, 6));
      // foreach($data as $row){
      //   echo $row['dateTime'].'<br>';
      // }
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: get6LatestEvent: ' . $exception->getMessage());
      throw $exception;
    }
  }
  private function user_compare($eventA, $eventB)
  {
    $dateTimeA = new DateTime($eventA['datetime']);
    $dateTimeB = new DateTime($eventB['datetime']);
    $interval = date_diff($dateTimeA, $dateTimeB);
    // if ($interval === 0)
    // return 0;
    // else if ($x > $y)
    // return 1;
    // else
    // return -1;
  }
}
