<?php

    include_once 'dbh.inc.php';

    function createUser() {

        /*
        // create user using user's input https://www.youtube.com/watch?v=2HVKizgcfjo
        */
        // change to suragate key later
        $id = 1000;
        $username = $_POST['register_username'];
        $password = $_POST['register_password'];

        $stmt = $conn->prepare("INSERT INTO 'user' (`id`, `username`, `password`) 
            VALUES (?, ?, ?);");
        $stmt->bind_param("iss", $id, $username, $password);
        $stmt->execute();
        echo "registration successfully...";
        $stmt->close();
    }

?>