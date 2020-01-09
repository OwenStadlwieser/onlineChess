<!DOCTYPE html>
<link rel="stylesheet" type="text/css" href="mystyle3.css">
<html>
<body>
<div id='usersadded'>
    Active Friends:
    <br>
    <?php
    include_once '../class/dbh.php';
    include_once '../class/model.php'; 
    $model = new model();
    session_start();
    if (isset($_GET['error']))
    {
        $error = $_GET['error'];
        if ($error == 'none')
        {
            echo $_SESSION['user'];
            echo "<br>";
            echo $_SESSION['number'];
            echo "<br>";
        }
        elseif ($error == 'nonexsistent')
        {
            echo "Could not find user";
        }
        elseif ($error == 'alreadyused')
        {
            echo "User in group already";
        }
    }
    echo "<br>";
    $sql = "SELECT * FROM friends WHERE user1id = ? OR user2id = ?;";
    $model->prepare($sql);
    $model->execute(array($_SESSION['id'], $_SESSION['id']));
    $results = ($model->getresults());
    for($i=0; $i<sizeof($results); $i++)
    {
    $sql = "SELECT * FROM users WHERE user_id = ?;";
    $model->prepare($sql);
    if($results[$i]['user1id'] == $_SESSION['id'])
    {
        $store = $results[$i]['user2id'];
    }
    else
    {
        $store = $results[$i]['user1id'];
    }
    $model->execute(array($store));
    $row = $model->getresult();
    echo($row['4']);
    echo "<br>";
    }
    ?>
</div>
<div id='findusers'>
    <form method = post action = 'includes/search.php'>
    <input name = 'uid'>
    <button>Add</button>
    </form>
</div>
<form action = 'openchess2.php'>
<button id='home'>Home</button>
</form>
</body>