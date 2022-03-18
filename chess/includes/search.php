    <?php
include_once '../class/dbh.php';
include_once '../class/model.php'; 
session_start();
$model = new model;
$uid =  $_POST['user_uid'];
if ($uid != $_SESSION['user_uid'])
{
    $sql = "SELECT * from users where user_uid = ?";
    $model->prepare($sql);
    $model->execute(array($uid));
    $row = $model->getresult();
    $output = $row;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";

    if (!empty($row['user_uid']))
    {
        $sql = "SELECT * from friends where (user1id = ? AND user2id = ?) OR (user1id = ? AND user2id = ?)";
        $model->prepare($sql);
        $model->execute(array($row['user_uid'], $_SESSION['id'], $_SESSION['id'], $row['user_uid']));
        $results = $model->getresult();
        if(empty($results))
        {
            $id = $row['user_uid'];
            $sql = "INSERT INTO `friends`(`user1id`, `user2id`) VALUES (?,?)";
            $model->prepare($sql);
            $model->execute(array($_SESSION['id'], $id));
            header("Location: ../pages/openchess2.php");
        }
        else
        {
            header("Location: ../pages/openchess2.php?error=alreadyfriends");
        }
    }
    else
    {
        header("Location: ../pages/openchess2.php?error=nonexssistent");
    }
}
else
{
    header("Location:../pages/openchess2.php?error=addedself");
}
?>