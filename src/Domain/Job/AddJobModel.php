<?php


class AddJobModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    // INSERT INTO job(jobId,alumniId,title,description,salary,email,postedDateTime,imageId,company,location) VALUES('$jobId','$alumniId','$title','$description','$salary','$email','$postedDateTime','$imageId','$company','$location')
    public function addJobs($jobId,$alumniId,$title,$description,$salary,$email,$postedDateTime,$imageId,$company,$location) {
             $sql = "INSERT INTO job (jobId,title,alumniId,description,salary,email,postedDateTime,imageId,company,location) VALUES(:jobId,:title,:alumniId,:description,:salary,:email,:postedDateTime,:imageId,:company,:location)";
             $stmt = $this->connection->prepare($sql);
             $result = $stmt->execute(array(':jobId'=>$jobId,':title'=>$title,'alumniId'=>$alumniId,':description'=>$description,'salary'=>$salary,':email'=>$email,':postedDateTime'=>$postedDateTime,':imageId'=>$imageId,':company'=>$company,':location'=>$location));
    }
    
    // SELECT max( CONVERT ( substring_index(jobId,'-',-1), UNSIGNED ) ) AS max FROM job
    public function getMaxId(): int{
        $stmt = $this->connection->query("SELECT max( CONVERT ( substring_index(jobId,'-',-1), UNSIGNED ) ) AS max FROM job")->fetchColumn();
        return (int)$stmt;

    }

}

?>