<?php
require '../logger.php';
require 'dto/Liste.php';


execute($_GET["loi_id"]);

function execute($loi_id)
{
    try {
//debug("Executing Lois");
// TODO SQL request
        if ($loi_id == 13) {
            $amendements = new Liste(2, array(11, 12));

        } else if ($loi_id == 71) {
            $amendements = new Liste(2, array(16, 17));

        }
        $json = json_encode($amendements);
        echo $json;
//        debug($json); // not echo uncomment this line to json
    } catch (Exception $e) {
        debug($e);
    }
}