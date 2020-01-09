<?php 
    include_once '../class/dbh.php';
    include_once '../class/model.php'; 
    $uid = ($_POST['uid']);
    $password = ($_POST['pass']);
    $model = new model();
    $sql = "SELECT * FROM users WHERE user_uid =? OR user_email = ?";
    if(isset($_POST['submit']))
    {
        $model->prepare($sql);
        $model->execute(array($uid, $uid));
        $row = $model->getresult();
        $pwdCheck = password_verify($password, $row['user_pwd']);
        if($pwdCheck == false)
        {
            header("Location: ../pages/loginform.php?login=fuck");
        }
        else if ($pwdCheck == true)
        {
            session_start();
            $_SESSION['uid'] = $row['user_uid'];
            $_SESSION['name'] = $row['user_first'];
            $_SESSION['email'] = $row['user_email'];
            $_SESSION['id'] = $row['user_id'];
            $_SESSION['rating'] = $row['rating'];
            header("Location: ../pages/openchess2.php?login=success");
        }
    }
    else
    {
        header("Location: ../pages/loginform.php?login=fail");
    }
?>