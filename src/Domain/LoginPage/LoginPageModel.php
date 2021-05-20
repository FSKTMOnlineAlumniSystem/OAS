<?php

include '../../../config/config.php';
include '../Database.php';


$servername = "localhost";

$conn = mysqli_connect(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD);

if(!$conn){
    die("Connection failed: ".mysqli_connect_error());
}