
<!DOCTYPE html>
<link rel="stylesheet" type="text/css" href="../css/mystyle2.css">
<html>
<body>
    <div id = 'header'>
        <span class  = 'title'>OpenChess</span>
        <button onclick="window.location.href='openchess2.php'" id = 'login'>Home</button>
        <div id = 'userinfo'>
        <?php
        session_start();
        echo '<span class = "userdetails">'. $_SESSION['uid'].'</span><br>';
        echo '<span class = "userdetails">'. $_SESSION['email'].'</span><br>';
        echo '<span class = "userdetails">Rating:'. $_SESSION['rating'].'</span>';
        include_once '../class/dbh.php';
        include_once '../class/model.php'; 
        $model = new model();
        echo '<br>Friends';
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
        echo "  ";
        echo($row['4']);
        echo "<br>";
        }
        ?>
        </div>
</div>
    </div>
    <div id = cha>
        <form method = 'post' action = '../includes/add.php'>
            <br>
            <input id = 'user' name = 'user' placeholder = 'Challenge User'>
            <br>
            <button id = 'submit'> Challenge</button>
        </form>
    </div>
    <div id = games>
        `</span id = 'subtitle'>Active Games</span>
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
        $sql = "SELECT * FROM games WHERE (whiteplayerid = ? OR blackplayerid = ?) AND Winner = '1';";
        $model->prepare($sql);
        $model->execute(array($_SESSION['id'], $_SESSION['id']));
        $results = ($model->getresults());
        for($i=0; $i<sizeof($results); $i++)
        {
        $sql = "SELECT * FROM users WHERE user_id = ?;";
        $model->prepare($sql);
        if($results[$i]['whiteplayerid'] == $_SESSION['id'])
        {
            $store = $results[$i]['blackplayerid'];
        }
        else
        {
            $store = $results[$i]['whiteplayerid'];
        }
        $model->execute(array($store));
        $row = $model->getresult();
        echo('<form action = "onlineplay.php" method = POST><button value = "'.$results[$i]['gameID'].'" name = "gameID" id = "play">Playing VS '.$row['4'].'</button></form>');
        echo "<br>";
        }
        ?>
        <span>Completed Games</span>
        <?php
        include_once '../class/model.php'; 
        $model = new model();
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
        $sql = "SELECT * FROM games WHERE (whiteplayerid = ? OR blackplayerid = ?) AND Winner != '1';";
        $model->prepare($sql);
        $model->execute(array($_SESSION['id'], $_SESSION['id']));
        $results = ($model->getresults());
        for($i=0; $i<sizeof($results); $i++)
        {
        $sql = "SELECT * FROM users WHERE user_id = ?;";
        $model->prepare($sql);
        if($results[$i]['whiteplayerid'] == $_SESSION['id'])
        {
            $store = $results[$i]['blackplayerid'];
        }
        else
        {
            $store = $results[$i]['whiteplayerid'];
        }
        $model->execute(array($store));
        $row = $model->getresult();
        if($results[$i]['Winner'] == 'draw')
        {
            echo('<form action = "onlineplay.php" method = POST><button value = "'.$results[$i]['gameID'].'" name = "gameID" id = "play">Playing VS '.$row['4'].'</button><span> Match drawn</span></form>');
            echo "<br>";
        }
        else if($results[$i]['Winner'] == $_SESSION['uid'])
        {
            echo('<form action = "onlineplay.php" method = POST><button value = "'.$results[$i]['gameID'].'" name = "gameID" id = "play">Playing VS '.$row['4'].'</button><span> Match won</span></form>');
            echo "<br>";
        }
        else 
        {
            echo('<form action = "onlineplay.php" method = POST><button value = "'.$results[$i]['gameID'].'" name = "gameID" id = "play">Playing VS '.$row['4'].'</button><span> Match Lost</span></form>');
            echo "<br>";
        }
        }
        ?>`
    </div>
    </div>
</body>
</html>