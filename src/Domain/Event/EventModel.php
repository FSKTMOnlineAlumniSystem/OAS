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

    public function EventImages($eventId){
      $stmt = $this->connection->prepare('SELECT * FROM events LEFT JOIN image ON events.imageId=image.imageId WHERE eventId=:eventId');
      $stmt->bindParam(':eventId',$eventId);
      $stmt->execute();
      $data = $stmt->fetchAll();
      $image = array();
      foreach($data as $eachuser){
          if(!is_null($eachuser['imageData'])){
              $temp_string = 'data::' . $eachuser['type']. ';base64,'.base64_encode($eachuser['imageData']);
              array_push($image,$temp_string);
          }else{
                  $temp_path = '/Assets/imgs/jobdefault.jpg';
                  array_push($image,$temp_path);
          }
  }
      return $image;
  }

  public function EventData(){
      $query = "SELECT * FROM events";  
      $stmt = $this->connection->prepare($query);  
      $stmt->execute(); 
      $data = $stmt->fetchAll();
      if(!$data){
          return array();
      }
      usort($data, fn ($a, $b) => strtotime($a['dateTime']) - strtotime($b['dateTime']));
      $data = array_reverse(array_slice($data, -6, 6));
      return $data; 
  }

}