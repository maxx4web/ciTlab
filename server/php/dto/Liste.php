<?php

class Liste
{
    public $total, $ids; //public nécessaire pour encodage json

    public function __construct($total, $ids)
    {
        $this->total = $total;
        $this->ids = $ids;
    }
}