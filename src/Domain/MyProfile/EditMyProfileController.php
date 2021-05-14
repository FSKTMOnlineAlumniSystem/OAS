<?php

if(!isset($_POST['email']) || !isset($_POST['biography'])){
    header("Location: /myprofile/edit");
    return;
}

$email = $_POST['email'];
$biography = $_POST['biography'];

if(preg_match('/^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z]$/i',$email)){
    echo 'OK';
}