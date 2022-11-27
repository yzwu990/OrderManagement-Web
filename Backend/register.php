<?php
    include_once 'dbh.inc.php';
    //   sendRequest('https://jsonplaceholder.typicode.com/posts', 'GET', undefined, domUpdate);

?> 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Register</title>
    <link rel="stylesheet" href="./Style/portal.css">
    <link rel="stylesheet" href="./Style/index.css">
</head>

<body>

    <form name="register_form" action="register_submit.php" method="post" onsubmit="return validate_register();">
        <div class="box">
            <h2>User Register</h2>
            <div class="inputBox">
                <input type="text" name="register_username" id="register_username" placeholder="username">
                <i></i>
            </div>
            <div class="inputBox">
                <input type="password" name="register_password" id="register_password" placeholder="password">
                <i></i>
            </div>
            <div class="inputBox">
                <input type="password" name="register_password_retype" id="register_password_retype" placeholder="retype password">
                <i></i>
            </div>

            <div class="buttonBox">
                <button type="submit">REGISTER</button>
            </div>
        </div>
    </form>
    <img src="./Image/earth.svg" alt="">
    <!-- Footer -->
    <footer>
        <div>
            <p>Copyright @Yanzhang Wu, Thanwa Chaichankanchang, Boling Zhang, Xingyun Zeng </p>
        </div>
    </footer>

    
    <?php 

        // MUST give all arguments a dummy value first
        $id = 0;
        $username = 'n';
        $password = 'n';
        $table = 'user';
        $newName = 'n';
        $newPassword = 'n';


        /* 
        // set data
        */
        function addUser($id, $username, $password) {

            include 'dbh.inc.php';

            $register_adduser = "INSERT INTO 'user' (`id`, `username`, `password`) VALUES ($id, $username, $password);";
            // $register_adduser = "INSERT INTO 'user' (`id`, `username`, `password`) VALUES (103, '103', '103');";
            
            echo $register_adduser;
            $result = mysqli_query($conn, $register_adduser);
            echo $result;

            $conn->close();
        }

        
        addUser(105, '105', '105');
        
        /* 
        // delete data
        */
        function deleteRecord($id, $table) {

            include 'dbh.inc.php';

            $register_deleterecord = "DELETE FROM $table WHERE $table.`id` = $id;";
            $result = mysqli_query($conn, $register_deleterecord);

            // $conn->close();

            echo "user deleted !!";
        }

        /* 
        // update data 
        */
        function updateUser($id, $newName, $newPassword) {
            
            include 'dbh.inc.php';

            $register_updateuser = "UPDATE user SET username = $newName WHERE id = $id;";
            $result = mysqli_query($conn, $register_updateuser);

            $conn->close();

        }

        function updateItem($id, $newName, $newPassword) {
            
            include 'dbh.inc.php';

            $register_updateuser = "UPDATE user SET username = $newName WHERE id = $id;";
            $result = mysqli_query($conn, $register_updateuser);

            $conn->close();

        }

        /* 
        // search data (worked), this will print a string on the screen if connected.
        */  
        // function searchRecord() {
            
        //     $sql = "SELECT * FROM 'user'";
        //     $result = mysqli_query($conn, $sql);
        //     $resultCheck = mysqli_num_rows($result);
        //     if($resultCheck > 0) {
        //         while ($row = mysqli_fetch_assoc($result) ) {
        //             echo $row['id'];
        //         }
        //     }

        // }

        


    ?>


</body>


</html>