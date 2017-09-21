<?php
require 'logger.php';
require 'dto/Amendement.php';

execute($_GET["amendement_id"]);

function execute($amendement_id)
{
    try {
        $amendement = fetchAmendement($amendement_id);// TODO replace with SQL request
        if ($amendement) {
            $json = json_encode($amendement);
//        debug($json); // not echo when real call from html page
            $fake_delay = rand(0, 4);
            sleep($fake_delay);
            echo $json;
        } else {
            http_response_code(404);
        }
    } catch (Exception $e) {
        debug($e);
    }
}

function fetchAmendement($amendement_id)
{
    if ($amendement_id == 16) {
        $amendement = new Amendement(
            16,
            "Article 16 - Chef de filât des politiques de jeunesse confié aux régions avec mission de coordination de l'information des jeunes",
            "Les politiques de la jeunesse mises en œuvre par les institutions publiques ont toutes pour objectif de permettre aux jeunes de devenir autonomes, de s'épanouir dans leurs projets de vie, d'utiliser leurs droits et de devenir des citoyens à part entière",
            71);
    } else if ($amendement_id == 17) {
        $amendement = new Amendement(
            17,
            "Article 17 - Information santé, couverture sociale et prévention régulière pour tous les jeunes",
            "Faciliter l'information des jeunes en matière de santé, de prévention et de couverture sociale",
            71);
    } else if ($amendement_id == 11) {
        $amendement = new Amendement(
            11,
            "Article 11 - Chef de filât des politiques de jeunesse confié aux régions avec mission de coordination de l'information des jeunes",
            "Les politiques de la jeunesse mises en œuvre par les institutions publiques ont toutes pour objectif de permettre aux jeunes de devenir autonomes, de s'épanouir dans leurs projets de vie, d'utiliser leurs droits et de devenir des citoyens à part entière",
            13);
    } else if ($amendement_id == 12) {
        $amendement = new Amendement(
            12,
            "Article 12 - Information santé, couverture sociale et prévention régulière pour tous les jeunes",
            "Faciliter l'information des jeunes en matière de santé, de prévention et de couverture sociale",
            13);
    } else {
        $amendement = null;
    }
    return $amendement;
}
