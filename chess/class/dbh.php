<?php
class dbh
{
    private $dbServername;
    private $dbUsername;
    private $dbPassword;
    private $dbName;
    private $charset;
    public function connect()
    {
        $this->dbServername = "localhost";
        $this->dbUsername = "root";
        $this->dbPassword = "";
        $this ->charset = "utf8mb4";
        $this->dbName = "chess";
        try
        {
            $dsn = "mysql:host=".$this->dbServername.";dbname=".$this->dbName.";charset=".$this->charset;
            $pdo = new PDO($dsn, $this->dbUsername, $this->dbPassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch(PDOException $e)
        {
            echo "connection Failed".$e->getMessage();
        }
    }
    
}
?>