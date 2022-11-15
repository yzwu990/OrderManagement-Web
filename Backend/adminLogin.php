<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Representative Login</title>
    <link rel="stylesheet" href="./Style/login.css">
    <link rel="stylesheet" href="./Style/index.css">

<body>
    <!-- <form action="adminLogin.html" method="get" onsubmit="return validate();"> -->
    <form method="post" action="adminLogin.php">
        <div class="box">
            <h2>Administrator Login</h2>
            <div class="inputBox">
                <input type="text" placeholder="username" name="username">
                <!-- <span>username</span> -->
                <i></i>
            </div>
            <div class="inputBox">
                <input type="password" placeholder="password" name="password">
                <!-- <span>password</span> -->
                <i></i>
            </div>
            <div class="buttonBox">
                <!-- <button name="login_Btn">LOGIN</button> -->
                <input type="submit" value="Login" class="loginBtn" name="login_Btn">
            </div>
        </div>
    </form>
    <!-- Footer -->
    <footer>
        <div>
            <p>Copyright @Yanzhang Wu, Thanwa Chaichankanchang, Boling Zhang, Xingyun Zeng </p>
        </div>
    </footer>
</body>

</html>
<?php
$conn = mysqli_connect("localhost", "root", "");

if(isset($_POST['login_Btn'])) {
    $username=$_POST['username'];
    $password=$_POST['password'];
    $sql= "SELECT * FROM WebAssignment2DB.logindetails WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $resultPassword = $row['password'];
        if($password == $resultPassword) {
            header('Location:index.html');
        } else {
            echo "<script>
                    alert('Login unsuccessful');
                </script";
        }
    }
}

?>