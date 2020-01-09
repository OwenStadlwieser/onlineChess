<?php
    include_once '../class/dbh.php';
    include_once '../class/model.php'; 
    session_start();
    $newmove = $_POST['name'];
    $gameID = $_SESSION['gameID'];
    $sql = "SELECT moves from games where gameID = ?";
    $model = new model;
    $model->prepare($sql);
    $model->execute(array($gameID));
    $allmoves = $model->getresult();
    echo $gameID;
    echo var_dump($allmoves);
    echo $allmoves[0];
    $allmove = $allmoves[0].$newmove;
    echo $allmove;
    echo $gameID;
    $sql = "UPDATE games SET moves = ? where gameID = ?";
    $model->prepare($sql);
    $model->execute(array($allmove, $gameID));

?>