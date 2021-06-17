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
      SELECT * FROM event
      LEFT JOIN image 
      ON event.imageId=image.imageId;');
      $stmt->execute();
      $data = $stmt->fetchAll();

      if (!$data) {
        include_once '../src/Domain/General_Pages/page_not_found.php';
        include_once '../src/templates/footer.php';
        include_once '../src/templates/GeneralScripts.php';
        exit();
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
      SELECT * FROM event 
      LEFT JOIN image 
      ON event.imageId=image.imageId 
      WHERE eventId= ?');
      $stmt->execute([$id]);
      $data = $stmt->fetch();
      $this->event = $data;
      if (!$data) {
        $GLOBALS['title'] = TITLE_NOT_FOUND;
        http_response_code(404);
        include '../src/utilities/includeWithVariable.php';
        includeWithVariables('../src/templates/header.php', array(
          'index' => '/css/Alumni/index.css'
        ));
        include '../src/templates/nav.php';
        include '../src/Domain/General_Pages/page_not_found.php';
        include_once '../src/templates/footer.php';
        include_once '../src/templates/GeneralScripts.php';
        exit();
      }
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: getEvent: ' . $exception->getMessage() . ' id: ' . $id);
      throw $exception;
    }
  }
  public function getEventPicture() // this method must be called after calling getEvent()
  {
    //handle if image is missing in database
    if (!$this->event['type'] || !$this->event['imageData']) {
      return './Assets/imgs/default_events.jpg';
    }
    return 'data::' . $this->event['type'] . ';base64,' . base64_encode($this->event['imageData']);
  }
  public function get6LatestEvent(): array // for home page to use
  {
    try {
      $stmt = $this->connection->prepare('
      SELECT * FROM event');
      $stmt->execute();
      $data = $stmt->fetchAll();
      if (!$data) {
        return array();
      }
      // sort the event based on datetime
      usort($data, fn ($a, $b) => strtotime($a['dateTime']) - strtotime($b['dateTime']));
      $data = array_reverse(array_slice($data, -6, 6));
      return $data;
    } catch (PDOException $exception) {
      error_log('EventModel: get6LatestEvent: ' . $exception->getMessage());
      throw $exception;
    }
  }
  
  public function getEvents(string $alumniId): array // for alumni to get their own events
  {
    try {
      $stmt = $this->connection->prepare('
      SELECT * FROM event
      LEFT JOIN image 
      ON event.imageId=image.imageId
      LEFT JOIN alumni_event 
      ON alumni_event.eventId=event.eventId
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
    $queryAftertrim = trim($search);
    if (!$queryAftertrim) { // if not searching, just return all event
      return !$isMyEvent ? $this->getAll() : $this->getEvents($alumniId);
    }
    try {
      if ($isMyEvent) {
        $query = "SELECT event.*, image.type, image.imageData, alumni_event.alumniId, alumni_event.viewedByAlumni, alumni_event.notificationClosedByAlumni FROM event
                  LEFT JOIN image 
                  ON event.imageId=image.imageId
                  LEFT JOIN alumni_event 
                  ON alumni_event.eventId=event.eventId
                  WHERE (alumniId=?)
                  AND (title LIKE '%$search%'
                  OR description LIKE '%$search%'
                  OR location LIKE '%$search%');
      ";
        $stmt = $this->connection->prepare($query);
        $stmt->execute([$alumniId]);
      } else {
        $query = "SELECT event.*, image.type, image.imageData FROM event
                  LEFT JOIN image 
                  ON event.imageId=image.imageId
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
  public function EventImages($eventId)
  {
    try {
      $stmt = $this->connection->prepare('SELECT * FROM event LEFT JOIN image ON event.imageId=image.imageId WHERE eventId=:eventId');
      $stmt->bindParam(':eventId', $eventId);
      $stmt->execute();
      $data = $stmt->fetchAll();
      $image = array();
      foreach ($data as $eachuser) {
        if (!is_null($eachuser['imageData'])) {
          $temp_string = 'data::' . $eachuser['type'] . ';base64,' . base64_encode($eachuser['imageData']);
          array_push($image, $temp_string);
        } else {
          $temp_path = './Assets/imgs/default_events.jpg';
          array_push($image, $temp_path);
        }
      }
      return $image;
    } catch (PDOException $exception) {
      error_log('EventModel: EventImages: ' . $exception->getMessage());
      throw $exception;
    }
  }
}
