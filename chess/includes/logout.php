<?php
    include_once '../class/dbh.php';
    include_once '../class/model.php'; 
    session_start();
    session_destroy();
    header("Location: ../pages/openchess.html")

?>