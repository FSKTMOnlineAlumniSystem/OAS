<?php

class AdminMyProfile
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
            SELECT * FROM admin 
            LEFT JOIN image 
            ON admin.imageId=image.imageId 
            WHERE adminId=:id');
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

    public function getAdminId()
    {
        return $this->user['adminId'];
    }

    public function getPassword()
    {
        return $this->user['password'];
    }

    public function getProfilePicture()
    {
        //handle if image is missing in database
        if(!$this->user['type'] || !$this->user['imageData']){
            return '/Assets/imgs/default_user.png';
        }
        return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
    }

    public function getName()
    {
        return $this->user['name'];
    }

    public function getEmail()
    {
        return $this->user['email'];
    }

    public function setUpdatedData($name, $email)
    {
        try {
            $stmt = $this->connection->prepare('UPDATE admin SET name=:name, email=:email WHERE adminId=:adminId');
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':adminId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Update Data: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function changePassword($newPassword){
        try {
            $stmt = $this->connection->prepare('UPDATE admin SET password=:password WHERE adminId=:adminId');
            $stmt->bindParam(':password', $newPassword);
            $stmt->bindParam(':adminId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Change Password: ' . $exception->getMessage());
            throw $exception;
        }
    }
}
