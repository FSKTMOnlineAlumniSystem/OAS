<?php


function Encrypt($email)
{
    // Store the cipher method
    $ciphering = "AES-128-CTR";

    // Use OpenSSl Encryption method
    $iv_length = openssl_cipher_iv_length($ciphering);
    $options = 0;

    // Non-NULL Initialization Vector for encryption
    $encryption_iv = '1234567891011121';

    // Store the encryption key
    $encryption_key = "ASTeam2";

    // Use openssl_encrypt() function to encrypt the data
    $encryption = openssl_encrypt(
        $email,
        $ciphering,
        $encryption_key,
        $options,
        $encryption_iv
    );

    // Display the encrypted string
    return base64_encode($encryption);
}


function Decrypt($encryption)
{
    // Store the cipher method
    $ciphering = "AES-128-CTR";

    // Use OpenSSl Encryption method
    $iv_length = openssl_cipher_iv_length($ciphering);
    $options = 0;
    // Non-NULL Initialization Vector for decryption
    $decryption_iv = '1234567891011121';

    // Store the decryption key
    $decryption_key = "ASTeam2";

    // Use openssl_decrypt() function to decrypt the data
    $decryption = openssl_decrypt(
        base64_decode($encryption),
        $ciphering,
        $decryption_key,
        $options,
        $decryption_iv
    );

    // Display the decrypted string
    return $decryption;
}


function emailExists($conn, $email)
{

    $stmt = $conn->prepare("SELECT * FROM alumni WHERE email=? AND isActive=1");
    $stmt->execute(array($email));

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($row['email'] === $email) {
            //email exists
            return $row;
        }
    }
    //email not Exists
    return false;
}


function adminApproved($conn,$email)
{

    $stmt = $conn->prepare('SELECT * FROM alumni WHERE email=:email AND approvedBy!=""');
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    $data = $stmt->fetchAll();

    if(!$data){
        return false;
    }else{
        return true;
    }
}
