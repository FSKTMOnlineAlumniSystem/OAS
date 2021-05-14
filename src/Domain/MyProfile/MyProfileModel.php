<?php

class MyProfile
{

    private PDO $connection;
    private $id;
    private $user;

    public function __construct(PDO $connection, $id)
    {
        $this->connection = $connection;
        $this->id = $id;

        try {
            $stmt = $this->connection->prepare('SELECT * FROM alumni WHERE alumniId=:id');
            $stmt->bindParam(':id', $this->id);
            $stmt->execute();
            $data = $stmt->fetch();
            $this->user = $data;
            if (!$data) {
                return array();
            }
            return $data;
        } catch (PDOException $exception) {
            error_log('MyProfileModel: construct: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function getAlumniId()
    {
        return $this->user['alumniId'];
    }
    public function getProfilePicture()
    {
        return $this->user['imageId'];
    }

    public function getName()
    {
        return $this->user['name'];
    }
    public function getGender()
    {
        return $this->user['gender'];
    }

    public function getGraduatedYear()
    {
        return $this->user['graduated'];
    }

    public function getDepartment()
    {
        return $this->user['department'];
    }

    public function getEmail()
    {
        return $this->user['email'];
    }

    public function getBiography()
    {
        return $this->user['biography'];
    }

    public function setUpdatedData($email, $biography)
    {
        try {
            $stmt = $this->connection->prepare('UPDATE');
        } catch (PDOException $exception) {
            error_log('MyProfileModel: construct: ' . $exception->getMessage());
            throw $exception;
        }
    }
}
