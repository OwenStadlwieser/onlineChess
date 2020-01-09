
<!DOCTYPE html>
<link rel="stylesheet" type="text/css" href="../css/mystyle2.css">
<html>
<body>
<form action = "loginform.php">
    <button class = 'button'>Log in</button>
</form>
<form action = "openchess2.php">
    <button class = 'button' id = 'right'>Home Page</button>
</form>
<form action = "../includes/signup.php" method = "POST" id = 'bigform'>
<?php
if (isset($_GET['first']))
{
    $first = $_GET['first'];
    echo '<input type = "text" name = "first" placeholder = "firstname" value ="'.$first.'" class = "input">';
}
else
{
    echo '<input type = "text" name = "first" placeholder = "firstname" class = "input">';
}
?>
<br>
<?php
if (isset($_GET['last']))
{
    $last = $_GET['last'];
    echo '<input type = "text" name = "last" placeholder = "lastname" value ="'.$last.'" class = "input">';
}
else
{
    echo '<input type = "text" name = "last" placeholder = "lastname" class = "input">';
}
?>
<br>
<input type = 'text' name = 'email' placeholder = 'E-mail' class = 'input'>
<br>
<?php
if (isset($_GET['uid']))
{
    $uid = $_GET['uid'];
    echo '<input type = "text" name = "uid" placeholder = "Username" value ="'.$uid.'" class = "input">';
}
else
{
    echo '<input type = "text" name = "uid" placeholder = "Username" class = "input">';
}
?>
<br>
<input type = 'password' name = 'password' placeholder = 'Password' class = 'input'>
<br>
<input type = 'password' name = 'password2' placeholder = 'Password2' class = 'input'>
<button type = 'submit' name = 'submit' class = 'button'>Sign Up</button>
</form>
<br>
<?php
    if (isset($_GET['signup']))
    {
        $signup = $_GET['signup'];
        if ($signup == "success")
        {
            echo "Sign up successful<br>";
        }
        elseif ($signup == "fail")
        {
            echo "Ensure your password is consistent<br>";
        }
        elseif ($signup == "fail1")
        {
            echo "Please complete all fields<br>";
        }
        elseif ($signup == "email")
        {
            echo "Invalid email<br>";
        }
        elseif ($signup == "alreadyused")
        {
            echo "your username or email is already in our database<br>";
        }
        elseif ($signup == "empty")
        {
            echo "Please complete all fields<br>";
        }
    }
?>
</head>
</body>
</html>


