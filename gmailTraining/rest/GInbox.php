<?php
/**
 *A domain Class to demonstrate RESTful web services
 *example getInboxMessages() returns the all inbox mails of user

 **/
Class Ginbox
{
    private $inmessages;
   /**
   /*
    * reads the json file and then returns the all contents of json file
    */
    public function getInboxMessages()
    {
        $inmessages = file_get_contents('../rest/data/data1.json');
        file_put_contents("results.txt", print_r($inmessages, 1), 8);
        return $inmessages;
    }
    /**
     * read json file then converts in to php array
     * then returns the results
     */
    public function getInboxMessage($id)
    {
        $str = file_get_contents('../rest/data/data1.json');
        $array = json_decode($str, true);
        $inmessages = (object)$array[$id-1];
        $data = json_encode((array)$inmessages);
        return $data;

    }
    /**
     * this function save the sent mail of the user in to a file
     * simply appends the data
     */
    public function saveSentMail($data){
        $myfile = fopen("../rest/data/newfile.txt", "a");
        fwrite($myfile,$data);
    }
    /**
     * returns the all sent mails data in to json format
     */
    public function getSentMails()
    {

        $str = file_get_contents("../rest/data/newfile.txt");
        $str=$str."]";
        return $str;
    }
    /**
     * returns the particular sent mail data in json format
     */
    public function getSentMail($id)
    {
        $str = file_get_contents("../rest/data/newfile.txt");
        $str=$str."]";
        $array = json_decode($str, true);
        $inmessages = (object)$array[$id];
        $data = json_encode((array)$inmessages);
         return $data;
    }
    /**
     * this is the search function for searching mails
     *  it finds the matching results and  returns matching results
     */
    public function searchMails($string)
    {

        $str = file_get_contents('../rest/data/data1.json');
        $array = json_decode($str, true);
        $data="[";
        for($i=0;$i<count($array);$i++)
        {
            if (strpos(strtolower($array[$i]["firstName"]), strtolower($string)) !== false||
                strpos(strtolower($array[$i]["message"]), strtolower($string)) !== false)
            {
                $data=$data.'{"id":'.'"'.$array[$i]["id"].'"'.','.'"firstName":'.'"'.$array[$i]["firstName"].
                    '"'.','.'"message":'.'"'.$array[$i]["message"].'"'.'},';
            }
        }

        $data=substr($data, 0, -1);
        $data=$data.']';
        return $data;

    }

}
?>