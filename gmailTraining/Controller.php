<?php
include("GInbox.php");


$view = "";
if(isset($_GET["view"]))
    $view = $_GET["view"];
if(isset($_POST["view"]))
    $view = $_POST["view"];
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
    case "sentmail":
        $Gmail = new Ginbox();
        echo $Gmail->getSentMail($_GET["id"]);
        break;
    case "savesent":
        $Gmail = new Ginbox();
        $a='"';
        $x = $a.$_REQUEST["to"].$a;
        $y = $a.$_REQUEST["subject"].$a;
        $z = $a.$_REQUEST["msg"].$a;
        $data=',{ "to" :'.$x.',"subject" :'.$y.', "Message" :'.$z."}";
        $Gmail->saveSentMail($data);
        echo  "Mail SuccesFully Send";
        break;
    case "search":
        $Gmail = new Ginbox();
        echo $Gmail->searchMails($_GET["q"]);
        break;
    case "" :
        //404 - not found;
        break;
}
?>