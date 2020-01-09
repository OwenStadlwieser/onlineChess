<!DOCTYPE html>
<html>
<link rel="stylesheet" type="text/css" href="../css/mystyle2.css">
<body>
<form action = "../includes/signupform.php">
    <button class = 'button' id = 'sign2'>Sign Up</button>
</form>
<form action = "openchess2.php">
    <button class = 'button' id = 'sign'>Home Page</button>
</form>
<div id = 'logins'>
<form action = "../includes/login.php" method = post id = 'bigform'>
<span class = 'centered'>LOGIN</span>
<input type = 'text' name = 'uid' placeholder = 'username' class = 'input'>
<input type = 'password' name = 'pass' placeholder = 'password' class = 'input'>
<button type = 'submit' name = 'submit' class = 'button' class = 'centered' id = 'LoginButton'>Log in</button>
<br>
<span id = 'sp'> Not a member? <a id = signup href = '../includes/signupform.php'>Register now</a> </span>
</form>
</div>
</body>
</html>