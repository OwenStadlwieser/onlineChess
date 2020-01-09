<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="../css/open2.css?version=53"></head>
</head>
<body>
<div id = 'header'>
    <span class  = 'title'>OpenChess</span>
    <form action = '../includes/logout.php' method = POST>
            <button class = 'button'>Log Out</button>
    </form>
    <div id = 'userinfo'>
        <?php
        session_start();
        echo '<span class = "userdetails">'. $_SESSION['uid'].'</span><br>';
        echo '<span class = "userdetails">'. $_SESSION['email'].'</span><br>';
        echo '<span class = "userdetails">Rating:'. $_SESSION['rating'].'</span>';
        ?>
</div>
</div>
<div class = 'gameoptions' id = 'offline'>
    <button onclick="window.location.href='offlinegame.php'" class  = 'subtitle'>Play offline</button>
</div>
<div class = 'gameoptions' id = 'playafriend'>
    <button onclick="window.location.href='friendplay.php'" class  = 'subtitle'>Play a friend</button>
</div>
    <div class = 'gameoptions' id = 'playonline'>
        <button class  = 'subtitle'>Find a match</button>
    </div>
    <div id='usersadded'>
        Active Friends
        <br>
        <?php
        include_once '../class/dbh.php';
        include_once '../class/model.php'; 
        $model = new model();
        if (isset($_GET['error']))
        {
            $error = $_GET['error'];
            if ($error == 'none')
            {
                echo $_SESSION['user'];
                echo $_SESSION['number'];
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
        <div id='findusers'>
            <form method = post action = '../includes/search.php'>
                <input name = 'uid'>
                <button>Add</button>
            </form>
        </div>
    </div>
</body>
</html>
