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

        /* 
        //testing get data (worked), this will print a string on the screen if connected.
        $sql = "SELECT * FROM `logindetails`";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);
        if($resultCheck > 0) {
            while ($row = mysqli_fetch_assoc($result) ) {
                echo $row['id'];
            }
        }
        */

        /* 
        //testing set data (worked)
        */
        // $register_adduser = "INSERT INTO `logindetails` (`id`, `username`, `password`) VALUES ('105', 'user105', 'user105');";
        // $result = mysqli_query($conn, $register_new);

        /* 
        //testing delete data (worked)
        */
        // $register_deleteuser = "DELETE FROM `logindetails` WHERE `logindetails`.`id` = 101;";
        // $result = mysqli_query($conn, $register_new);


    ?>


</body>


</html>