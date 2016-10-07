<?php
include("GInbox.php");
$view = "";
if(isset($_GET["view"]))
    $view = $_GET["view"];
if(isset($_POST["view"]))
    $view = $_POST["view"];
/**
*controls the RESTful services
URL mapping
**/
switch($view){
    /**
     * calls the GInbox class getInboxmessages method
     * when view is set to all then all inbox messages is to be returned
     */
    case "all":
        $Gmail = new Ginbox();
        echo $Gmail->getInboxMessages();
        break;
    /**
     * when view is set to single then a particular message is returned
     * and the id of the particular message extracted from get request
     */
    case "single":
        $Gmail = new Ginbox();
        echo $Gmail->getInboxMessage($_GET["id"]);
        break;
    /**
     * when view is set to sentmails then all sentmessages is to be returned
     */
    case "sentmails":
        $Gmail = new Ginbox();
        echo $Gmail->getSentMails();
        break;
    /**
     * when view is set to sentmail then a particular message is returned
     * and the id of the particular message extracted from get request
     */
    case "sentmail":
        $Gmail = new Ginbox();
       echo $Gmail->getSentMail($_GET["id"]);
        break;
    /**
     * when the view is set to savesent the message data is save to the server
     * and all message data is extracted by the post request
     */
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
    /**
     * when the view is set to search then it finds the matching results and  returns matching results
     */
    case "search":
        $Gmail = new Ginbox();
        echo $Gmail->searchMails($_GET["q"]);
        break;
    case "" :
        //404 - not found;
        break;
}
?>