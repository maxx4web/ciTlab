<?php
/**
 * Created by PhpStorm.
 * User: maxx
 * Date: 04/09/2017
 * Time: 11:19
 */

// recup de la requete : userID, email
// lazy creation du user/email
// creation session avec userID et envoi du token

if (!session_id()) @ session_start();

session_start();
$user_id = $_GET["user_id"];

$_SESSION["user"] = user_id;
echo SID;