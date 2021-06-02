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
            $stmt = $this->connection->prepare('
            SELECT * FROM alumni 
            LEFT JOIN image 
            ON alumni.imageId=image.imageId 
            WHERE alumniId=:id');
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

    public function getPassword()
    {
        return $this->user['password'];
    }

    public function getProfilePicture()
    {
        return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
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

    public function getIsActive()
    {
        return $this->user['isActive'];
    }
    public function getIsEmailPublic()
    {
        return $this->user['isEmailPublic'];
    }

    public function setIsEmailPublic($isEmailPublic)
    {
        try {
            $stmt = $this->connection->prepare('UPDATE alumni SET isEmailPublic=:isEmailPublic WHERE alumniId=:alumniId');
            $stmt->bindParam(':isEmailPublic', $isEmailPublic);
            $stmt->bindParam(':alumniId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Update Email Privacy: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function setUpdatedData($email, $biography)
    {
        try {
            $stmt = $this->connection->prepare('UPDATE alumni SET email=:email, biography=:biography WHERE alumniId=:alumniId');
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':biography', trim($biography));
            $stmt->bindParam(':alumniId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Update Data: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function deleteAccount(){
        try {
            $stmt = $this->connection->prepare('UPDATE alumni SET isActive=0 WHERE alumniId=:alumniId');
            $stmt->bindParam(':alumniId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Delete Account: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function changePassword($newPassword){
        try {
            $stmt = $this->connection->prepare('UPDATE alumni SET password=:password WHERE alumniId=:alumniId');
            $stmt->bindParam(':password', $newPassword);
            $stmt->bindParam(':alumniId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Change Password: ' . $exception->getMessage());
            throw $exception;
        }
    }
}
