<?php
    include_once '../class/dbh.php';
    include_once '../class/model.php'; 
    session_start();
    $gameID = $_SESSION['gameID'];
    $sql = "SELECT * from games where gameID = ?";
    $model = new model;
    $model->prepare($sql);
    $model->execute(array($gameID));
    $result = $model->getresult();
    $sql = "SELECT * from users where user_uid = ?";
    $model->prepare($sql);
    $model->execute(array($result['whiteplayerid']));
    $whiteplayerdata = $model->getresult();
    $sql = "SELECT * from users where user_uid = ?";
    $model->prepare($sql);
    $model->execute(array($result['blackplayerid']));
    $blackplayerdata = $model->getresult();
    $sql = "SELECT moves from games where gameID = ?";
    $model->prepare($sql);
    $model->execute(array($gameID));
    $moves = $model->getresult();
    echo ($moves[0]);
    echo ' ';
    if($blackplayerdata[4] == $_SESSION['uid'])
    {
        echo 'b'.$_SESSION['uid'];
    }
    else
    {
        echo  'w'.$_SESSION['uid'];
    }
    $sql = "SELECT starter from games where gameID = ?";
    $model -> prepare($sql);
    $model->execute(array($gameID));
    $starter = $model->getresult();
    if(empty($starter[0]))
    {
        $starter = rand(1, 2);
        $sql = "UPDATE games SET starter = ? where gameID = ?";
        $model->prepare($sql);
        $model->execute(array($starter, $gameID));
        echo ' ';
        echo $starter;
    }
    else
    {
        echo ' ';
        echo ($starter[0]);
    }
    echo ' ';

?>