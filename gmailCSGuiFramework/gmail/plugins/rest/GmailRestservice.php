<?php

include_once '../admin/modules/gui/plugins/rest/GuiRestservice.php';

class GmailRestservice extends GuiRestservice
{
    /**
     * returns the all Inbox mails data in to json format
     */
    public function getStartScreenName()
    {
        return 'home';
    }

    public function executeGetData()
    {
        return $array = file_get_contents('d:/data1.json');
    }
    /**
     * this is the search function for searching mails
     *  it finds the matching results and  returns matching results
     */

    public function executeSearchMail()
    {
        $string = $this->getExternalParam('string');
        $array = file_get_contents('d:/data1.json');
        $array = json_decode($array, true);
        $data = "[";
        for ($i = 0; $i < count($array); $i++) {
            if (strpos(strtolower($array[$i]["firstName"]), strtolower($string)) !== false ||
                strpos(strtolower($array[$i]["message"]), strtolower($string)) !== false
            ) {
                $data = $data . '{"id":' . '"' . $array[$i]["id"] . '"' . ',' . '"firstName":' . '"' .
                    $array[$i]["firstName"] .
                    '"' . ',' . '"message":' . '"' . $array[$i]["message"] . '"' . '},';
            }
        }
        if (strlen($data) - 1)
            $data = substr($data, 0, -1);
        $data = $data . ']';

        return $data;
    }

    /**
     * this function save the sent mail of the user in to a file
     * simply appends the data
     */
    public function executeSendMail()
    {
        $string = $this->getExternalParam('string');
        file_put_contents('d:/sendmails.txt', $string, FILE_APPEND);

        return true;
    }
    /**
     * returns the all sent mails data in to json format
     */
    public function executeGetSentMails()
    {
        $str = file_get_contents("d:/sendmails.txt");
        $str = $str . "]";

        return $str;
    }

    public function getAdditionalStyleFilesForApplication () {
        $mergedArray = array('..\admin\modules\gmail\apps\gmail\screens\home\css\main.css');

        return $mergedArray;
    }

    /**
     * returns the particular Inbox mail data in json format
     */
    public function executeGetSingleMail(){
        $object="[";
        $id=$this->getExternalParam('index');
        $str = file_get_contents('d:/data1.json');
        $array = json_decode($str, true);
        $inmessages = (object)$array[$id];
        $data = json_encode((array)$inmessages);
        $object=$object.$data;
        
        return $object."]";
    }

    /**
     * returns the particular sent mail data in json format
     */
    public function executeGetSingleSentMail()
    {   $id=$this->getExternalParam('index');
        $str = file_get_contents("d:/sendmails.txt");
        $str=$str."]";
        $array = json_decode($str, true);
        $inmessages = (object)$array[$id];
        $data = json_encode((array)$inmessages);
        $object="[";
        $object=$object.$data;
        
        return $object."]";
    }

}