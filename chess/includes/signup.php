<?php
include_once '../class/dbh.php';
include_once '../class/model.php'; 
    $model = new model();
    $first = ($_POST['first']);
    $last = ($_POST['last']);
    $email = ($_POST['email']);
    $uid = ($_POST['uid']);
    $password = ($_POST['password']);
    $password2 = ($_POST['password2']);
    $sql = "SELECT * from USERS where user_uid = ? OR user_email = ?";
    if(isset($_POST['submit']))
    {
        $model->prepare($sql);
        $model->execute(array($uid, $email));
        if($model->checkforresult())
        {
            header("Location: ../pages/signupform.php?signup=alreadyused");
        } 
        else
        {
            if (!empty($first) and !empty($last) and !empty($email) and !empty($uid) and !empty($password) and !empty($password2) and $password == $password2 and filter_var($email, FILTER_VALIDATE_EMAIL))
            {
                $sql = "Insert into users (user_first,
                    user_last, user_email, user_uid, user_pwd, rating)
                    Values (? , ?, ?, ?, ?, ?)";
                $model->prepare($sql);
                $model->execute(array($first, $last, $email, $uid, password_hash($password, PASSWORD_BCRYPT), 1200));
                header("Location: ../pages/loginform.php?signup=success");
            }
            elseif ($password != $password2)
            {
                header("Location: ../pages/signupform.php?signup=fail&first=$first&last=$last&uid=$uid");
            }
            elseif (!filter_var($email, FILTER_VALIDATE_EMAIL))
            {
                header("Location: ../pages/signupform.php?signup=email&first=$first&last=$last&uid=$uid");
            }
            else
            {
                header("Location: ../pages/signupform.php?signup=empty&first=$first&last=$last&uid=$uid");
            }
        }
    }
    else
    {
        header("Location: ../pages/signupform.php?signup=fail1");
    }
?>
