<?php
include("GInbox.php");


$view = "";
if(isset($_GET["view"]))
    $view = $_GET["view"];
/*
controls the RESTful services
URL mapping
*/
switch($view){

    case "all":

        $Gmail = new Ginbox();
        echo $Gmail->getInboxMessages();
        break;

    case "single":
        $Gmail = new Ginbox();
        echo $Gmail->getInboxMessage($_GET["id"]);
        break;
    case "sentmails":
        $Gmail = new Ginbox();
        echo $Gmail->getSentMails();
        break;
    case "savesent":
        $Gmail = new Ginbox();
        /*
         * code to form mail data
         *
         */
        echo $Gmail->getInboxMessage($_GET["mail"]);
        break;
    case "search":
        $Gmail = new Ginbox();
        echo $Gmail->searchMails($_GET["string"]);
        break;
    case "" :
        //404 - not found;
        break;
}
?>