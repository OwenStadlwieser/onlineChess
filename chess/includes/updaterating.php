<?php
$team = $_POST['team'];
$result = $_POST['result'];
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
$whiterating = $whiteplayerdata[6];
$blackrating = $blackplayerdata[6];
$EW=(1+(10^(($blackrating-$whiterating)/400)))^-1;
$EB=(1+(10^(($whiterating-$blackrating)/400)))^-1;
$newblackrating = 0;
$newwhiterating = 0;
if($team == "w" && $result)
{
    $newwhiterating = $whiterating + 10*(1 - $EW);
    $newblackrating = $blackrating + (10*(0 + $EB));
    $winner = $whiteplayerdata[4];
}
else if($team == "b" && $result)
{
    $winner = $blackplayerdata[4];
    $newwhiterating = $whiterating + 10*(0 + $EW);
    $newblackrating = $blackrating + 10*(1 - $EB);
}
else if($result == 0.5)
{
    $winner = $draw;
    $newwhiterating = $whiterating + 10*(0.5 - $EW);
    $newblackrating = $blackrating + 10*(0.5 - $EB);
}
else
{

}
$sql = "UPDATE games SET winner = ? where gameID = ?";
$model->prepare($sql);
$model->execute(array($winner, $gameID));
$sql = "UPDATE users SET rating = ? where user_id = ?";
$model->prepare($sql);
$model->execute(array($newblackrating, $result['blackplayerid']));
$sql = "UPDATE users SET rating = ? where user_id = ?";
$model->prepare($sql);
$model->execute(array($newwhiterating, $result['whiteplayerid']));
echo $newwhiterating;
echo ' ';
echo $newblackrating;
echo ' ';
echo $winner;
echo ' ';
echo $blackrating;
echo ' ';
echo $whiterating;
echo ' ';
echo $EB;
echo ' ';
echo $EW
?>