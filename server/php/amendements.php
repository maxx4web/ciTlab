<?php
/**
 * Created by PhpStorm.
 * User: maxx
 * Date: 04/09/2017
 * Time: 15:39
 */

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

log("Executing fetchAmendements handler");
$id_loi = $_GET["id_loi"];
$amendements = array();
if ($id_loi > 50) {
    $amendements[0] = new Amendement(
        16,
        "Article 16 - Chef de filât des politiques de jeunesse confié aux régions avec mission de coordination de l'information des jeunes",
        "Les politiques de la jeunesse mises en œuvre par les institutions publiques ont toutes pour objectif de permettre aux jeunes de devenir autonomes, de s'épanouir dans leurs projets de vie, d'utiliser leurs droits et de devenir des citoyens à part entière",
        $id_loi);
    $amendements[1] = new Amendement(
        17,
        "Article 17 - Information santé, couverture sociale et prévention régulière pour tous les jeunes",
        "Faciliter l'information des jeunes en matière de santé, de prévention et de couverture sociale",
        $id_loi);
} else {
    $amendements[0] = new Amendement(
        11,
        "Article 11 - Chef de filât des politiques de jeunesse confié aux régions avec mission de coordination de l'information des jeunes",
        "Les politiques de la jeunesse mises en œuvre par les institutions publiques ont toutes pour objectif de permettre aux jeunes de devenir autonomes, de s'épanouir dans leurs projets de vie, d'utiliser leurs droits et de devenir des citoyens à part entière",
        $id_loi);
    $amendements[1] = new Amendement(
        12,
        "Article 12 - Information santé, couverture sociale et prévention régulière pour tous les jeunes",
        "Faciliter l'information des jeunes en matière de santé, de prévention et de couverture sociale",
        $id_loi);

}
log($amendements);

echo json_encode($amendements);
