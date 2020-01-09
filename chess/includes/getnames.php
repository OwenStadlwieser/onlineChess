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
    $sql = "SELECT * from users where user_id = ?";
    $model->prepare($sql);
    $model->execute(array($result['whiteplayerid']));
    $whiteplayerdata = $model->getresult();
    $sql = "SELECT * from users where user_id = ?";
    $model->prepare($sql);
    $model->execute(array($result['blackplayerid']));
    $blackplayerdata = $model->getresult();
    echo $blackplayerdata[4];
    echo ' ';
    echo $blackplayerdata[6];
    echo ' ';
    echo $whiteplayerdata[4];
    echo ' ';
    echo $whiteplayerdata[6];
    ?>