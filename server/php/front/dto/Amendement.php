<?php

class Amendement
{
    public $id;
    public $titre;
    public $texte;
    public $id_loi;

    public function __construct($id, $titre, $texte, $id_loi)
    {
        $this->id = $id;
        $this->titre = $titre;
        $this->texte = $texte;
        $this->id_loi = $id_loi;
    }


}