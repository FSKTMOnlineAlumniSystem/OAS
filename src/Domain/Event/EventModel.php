<?php

declare(strict_types=1);
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
      ON events.imageId=image.imageId;');
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
    //handle if image is missing in database
    if (!$this->event['type'] || !$this->event['imageData']) {
      return '/Assets/imgs/default_event.png';
    }
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
  public function getEvents(string $alumniId): array
  {
    try {
      $stmt = $this->connection->prepare('
      SELECT * FROM events
      LEFT JOIN image 
      ON events.imageId=image.imageId
      LEFT JOIN alumni_event 
      ON alumni_event.eventId=events.eventId
      WHERE alumniId=?
      ');
      $stmt->execute([$alumniId]);
      $data = $stmt->fetchAll();

      if (!$data) {
        return array();
      }
      // return the sorted event based on datetime
      usort($data, fn ($a, $b) => strtotime($a['dateTime']) - strtotime($b['dateTime']));
      $data = array_reverse($data);
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: getEvents: ' . $exception->getMessage());
      throw $exception;
    }
  }
  public function searchEvents(string $alumniId, string $search, bool $isMyEvent): array
  {
    if (!$search) {
      return $this->getAll();
    }
    try {
      if ($isMyEvent) {
        $query = "SELECT * FROM events
      LEFT JOIN image 
      ON events.imageId=image.imageId
      LEFT JOIN alumni_event 
      ON alumni_event.eventId=events.eventId
      WHERE (alumniId=?)
      AND (title LIKE '%$search%'
      OR description LIKE '%$search%'
      OR location LIKE '%$search%');
      ";
      $stmt = $this->connection->prepare($query);
      $stmt->execute([$alumniId]);
      } else {
        $query = "SELECT * FROM events
      LEFT JOIN image 
      ON events.imageId=image.imageId
      LEFT JOIN alumni_event 
      ON alumni_event.eventId=events.eventId
      WHERE (title LIKE '%$search%'
      OR description LIKE '%$search%'
      OR location LIKE '%$search%');
      ";
      $stmt = $this->connection->prepare($query);
      $stmt->execute();
      }
      $data = $stmt->fetchAll();
      if (!$data) {
        return array();
      }
      // return the sorted event based on datetime
      usort($data, fn ($a, $b) => strtotime($a['dateTime']) - strtotime($b['dateTime']));
      $data = array_reverse($data);
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: searchMyEvents: ' . $exception->getMessage());
      throw $exception;
    }
  }
}
