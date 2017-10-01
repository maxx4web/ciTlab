<?php
require '../logger.php';

execute();

function execute()
{
    try {
        $uid = uniqid();
//        $json = json_encode($uid);
//        debug($json); // not echo when real call from html page
        echo $uid;
    } catch (Exception $e) {
        debug($e);
    }
}
