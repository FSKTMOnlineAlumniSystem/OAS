<?php

class HomePageModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM event');
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

        // try {
        //     $stmt_jobs = $this->connection->prepare('SELECT * FROM jobs');
        //     $stmt_jobs->execute();
        //     $data_jobs = $stmt_jobs->fetchAll();

        //     if (!$data_jobs) {
        //         return array();
        //     }
        //     return $data_jobs;

        // } catch (PDOException $exception) {
        //     error_log('ActivityModel: getAll: ' . $exception->getMessage());
        //     throw $exception;
        // }
    
        // try {
        //     $stmt_alumni = $this->connection->prepare('SELECT * FROM alumni');
        //     $stmt_alumni->execute();
        //     $data_alumni = $stmt_alumni->fetchAll();

        //     if (!$data_alumni) {
        //         return array();
        //     }
        //     return $data_alumni;

        // } catch (PDOException $exception) {
        //     error_log('ActivityModel: getAll: ' . $exception->getMessage());
        //     throw $exception;
        // }
        // try {
        //     $stmt_admin = $this->connection->prepare('SELECT * FROM admin');
        //     $stmt_admin->execute();
        //     $data_admin = $stmt_admin->fetchAll();

        //     if (!$data_admin) {
        //         return array();
        //     }
        //     return $data_admin;

        // } catch (PDOException $exception) {
        //     error_log('ActivityModel: getAll: ' . $exception->getMessage());
        //     throw $exception;
        // }
        // try {
        //     $stmt_alumni_events = $this->connection->prepare('SELECT * FROM alumni_events');
        //     $stmt_alumni_events->execute();
        //     $data_alumni_events = $stmt_alumni_events->fetchAll();

        //     if (!$data_alumni_events) {
        //         return array();
        //     }
        //     return $data_alumni_events;

        // } catch (PDOException $exception) {
        //     error_log('ActivityModel: getAll: ' . $exception->getMessage());
        //     throw $exception;
        // }
    }
}
