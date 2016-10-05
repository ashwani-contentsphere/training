<?php
/*
A domain Class to demonstrate RESTful web services
*/
Class Ginbox
{
    private $inmessages;

    public function getInboxMessages()
    {
        $inmessages = file_get_contents('data1.json');
        file_put_contents("results.txt", print_r($inmessages, 1), 8);
        return $inmessages;
    }

    public function getInboxMessage($id)
    {
        $str = file_get_contents('data1.json');
        $array = json_decode($str, true);
        $inmessages = (object)$array[$id];
        $data = json_encode((array)$inmessages);
        file_put_contents("results.txt", print_r($data, 1), 8);
        return $data;

    }

    public function saveSentMails($data){
        $myfile = fopen("newfile.txt", "a");
        fwrite($myfile,$data);
    }

    public function getSentMails()
    {

        $str = file_get_contents("newfile.txt");
        $str=$str."]";
        return $str;
    }

    public function searchMails($string)
    {

        $str = file_get_contents('data1.json');
        $array = json_decode($str, true);
        $data="[";
        for($i=0;$i<count($array);$i++)
        {
            if (strpos($array[$i]["firstName"], $string) !== false||strpos($array[$i]["message"], $string) !== false)
            {
                $data=$data.'{"firstName":'.'"'.$array[$i]["firstName"].'"'.','.'"message":'.'"'.$array[$i]["message"].'"'.'},';
            }
        }
        $data=substr($data, 0, -1);
        $data=$data.']';
        return $data;

    }

}
?>