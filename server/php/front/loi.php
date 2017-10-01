<?php
require '../logger.php';
require 'dto/Loi.php';

execute($_GET["id"]);

function execute($loi_id)
{
    try {
//        debug("Executing fetchLoi");
        $loi = fetchLoi($loi_id);// TODO replace with SQL request
        if ($loi) {
            $json = json_encode($loi);
//        debug($json); // not echo uncomment this line to json
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

function fetchLoi($loi_id)
{
    if ($loi_id == 13) {
        $loi = new Loi(
            13,
            "Citoyenneté et émancipation des jeunes",
            "Il s'agit de proposer un modèle de société reposant sur une citoyenneté active, sur des valeurs de fraternité, d'altruisme, de générosité. Le texte facilite l'engagement civique de tous, et notamment des jeunes, avec la création de la réserve citoyenne, la reconnaissance systématique de l'engagement dans les formations de l'enseignement supérieur, et de nouvelles opportunités de faire un service civique.",
            "2016-05-09");
    } else if ($loi_id == 71) {
        $loi = new Loi(
            71,
            "Mixité sociale et égalité d'accès au logement",
            "Le titre II du projet de loi engage des mesures structurantes dans le domaine du logement, pour favoriser le vivre-ensemble et lutter contre les phénomènes de ségrégation territoriale et de « ghettoïsation » de certains quartiers. En effet, agir pour l'égalité et la citoyenneté impose à l'origine d'œuvrer contre les divisions spatiales et sociales qui minent le quotidien et pèsent sur les parcours de vie de chacun comme sur la solidarité entre tous. Un urbanisme qui concentre les populations les plus pauvres dans les territoires les moins attractifs en termes d'emplois, de desserte et d'équipements culturels ne peut que mettre en cause la cohésion sociale de la France et les valeurs de la République, au premier rang desquelles l'égalité et la fraternité. La politique du logement doit être l'un des leviers privilégiés pour organiser la mixité sociale et le développement harmonieux de nos villes et de nos territoires.",
            "2016-11-02");
    } else {
        $loi = null;
    }
    return $loi;
}



