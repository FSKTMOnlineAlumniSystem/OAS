<?php


class JobDetailsModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM job');
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

    public function getRow($id): array{
            $stmt = $this->connection->prepare("SELECT * FROM job WHERE jobId='$id'");
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$data) {
                include_once '../src/Domain/General_Pages/page_not_found.php';
                include_once '../src/templates/footer.php';
                include_once '../src/templates/GeneralScripts.php';
                exit;
                // return array();
            }
            return $data;     

    }

    public function getJobImage($id): array{
        $stmt = $this->connection->prepare("
            SELECT * FROM job 
            LEFT JOIN image 
            ON job.imageId=image.imageId 
            WHERE jobId='$id'
            ORDER BY postedDateTime DESC");
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
}

?>