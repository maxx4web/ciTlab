<?php
//require '../logger.php';

execute();

function execute()
{
    try {
        $guid = com_create_guid();
        $json = json_encode($guid);
        debug($json); // not echo when real call from html page
        echo $json;
    } catch (Exception $e) {
        debug($e);
    }
}
