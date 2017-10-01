<?php

class Loi
{
    public $id, $titre, $detail, $date; //public is usefu for json

    public function __construct($id, $titre, $detail, $date)
    {
        $this->id = $id;
        $this->titre = $titre;
        $this->detail = $detail;
        $this->date = $date;
    }

}