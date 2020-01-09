<?php
class model extends dbh
{
    public $stmt;
    public function prepare($statement)
    {
        $sql = $statement;
        $this->stmt = $this->connect()->prepare($sql);
    }
    public function execute($array)
    {
        $this->stmt->execute($array);
    }
    public function checkforresult()
    {
        if($this->stmt->rowCount()) 
        {
            return true;
        }
        else {
            return false;
        }
    }
    public function getresult()
    {
        if($this->stmt->rowCount()) 
        {
           $row = $this->stmt->fetch();
           return $row;
        }
    }
    public function getresults()
    {
        $results = $this->stmt->fetchAll();
        return $results;
    }
};