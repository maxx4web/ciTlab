<?php
require 'logger.php';
require 'dto/Liste.php';


execute();


function execute()
{
    try {
//debug("Executing Lois");
        //  load des lois pour le front
// TODO SQL request
        $lois = new Liste(2, array(13, 71));
        $json = json_encode($lois);
        echo $json;
//        debug($json); // not echo uncomment this line to json
    } catch (Exception $e) {
        debug($e);
    }
}


