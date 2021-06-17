<?php

class MyProfile
{

    private PDO $connection;
    private $id;
    private $user;
    private $exist = false;

    public function __construct(PDO $connection, $id)
    {
        $this->connection = $connection;
        $this->id = $id;

        try {
            $stmt = $this->connection->prepare('
            SELECT * FROM alumni 
            LEFT JOIN image 
            ON alumni.imageId=image.imageId 
            WHERE alumniId=:id AND isActive=1');
            $stmt->bindParam(':id', $this->id);
            $stmt->execute();
            $data = $stmt->fetch();
            $this->user = $data;
            if ($data) {
                $this->exist = true;
            }
            return $data;
        } catch (PDOException $exception) {
            error_log('MyProfileModel: construct: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function isAlumniExist(){
        return $this->exist;
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
        //handle if image is missing in database
        try{

            if(!$this->user['type'] || !$this->user['imageData']){
                return '/Assets/imgs/default_user.png';
            }
            return 'data::'.$this->user['type'].';base64,'.base64_encode($this->user['imageData']);
        }catch(Exception $exception){
            error_log("Exception: " . $exception->getMessage());
        }
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

    public function setUpdatedData($biography)
    {
        try {
            $stmt = $this->connection->prepare('UPDATE alumni SET biography=:biography WHERE alumniId=:alumniId');
            $stmt->bindParam(':biography', trim($biography));
            $stmt->bindParam(':alumniId', $this->id);
            $stmt->execute();
            $_SESSION['alumni']['biography'] = $biography;
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
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        try {
            $stmt = $this->connection->prepare('UPDATE alumni SET password=:password WHERE alumniId=:alumniId');
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':alumniId', $this->id);
            $stmt->execute();
        } catch (PDOException $exception) {
            error_log('MyProfileModel: Change Password: ' . $exception->getMessage());
            throw $exception;
        }
    }
}
