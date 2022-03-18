<?php
include_once '../class/dbh.php';
include_once '../class/model.php'; 
session_start();
$model = new model;
$uid =  $_POST['user'];
if ($uid != $_SESSION['uid'])
{
    $sql = "SELECT * from users where user_uid = ?";
    $model->prepare($sql);
    $model->execute(array($uid));
    $row = $model->getresult();
    if (!empty($row['user_uid']))
    {
        $sql = "SELECT * from friends where (user1id = ? AND user2id = ?) OR (user1id = ? AND user2id = ?)";
        $model->prepare($sql);
        $model->execute(array($row['user_uid'], $_SESSION['id'], $_SESSION['id'], $row['user_uid']));
        $results = $model->getresult();
        if(!empty($results))
        {
            $random = rand(0,10);
            while($random == 5)
            {
                $random = rand(0,10);
            }
            if($random < 5)
            {
                $id = $row['user_uid'];
                $sql = "INSERT INTO games (`whiteplayerid`, `blackplayerid`) VALUES (?,?)";
                $model->prepare($sql);
                $model->execute(array($_SESSION['id'], $id));
                header("Location: ../pages/friendplay.php");
            }
            else
            {
                $id = $row['user_uid'];
                $sql = "INSERT INTO games (`whiteplayerid`, `blackplayerid`) VALUES (?,?)";
                $model->prepare($sql);
                $model->execute(array($id, $_SESSION['id']));
                header("Location: ../pages/friendplay.php");
            }
        }
        else
        {
            header("Location: ../pages/friendplay.php?error=notfriends");
        }
    }
    else
    {
        header("Location: ../pages/friendplay.php?error=nonexssistent");
    }
}
else
{
    header("Location:../pages/friendplay.php?error=addedself");
}
?>