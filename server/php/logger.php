<?php
/**
 * Created by PhpStorm.
 * User: maxx
 * Date: 04/09/2017
 * Time: 15:42
 */

function debug($data)
{
    echo("<script>console.log('PHP: " . json_encode($data) . "');</script>");
//    if(is_array($data) || is_object($data)) {
//        echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
//    } else {
//        echo("<script>console.log('PHP: $data');</script>");
//    }
}