<?php
/*
A domain Class to demonstrate RESTful web services
*/
Class Ginbox
{

    private $inmessages;


    public function getMessages()
    {
        $inmessages = file_get_contents('data1.json');
        file_put_contents("results.txt", print_r($inmessages, 1), 8);
        return $inmessages;
    }

    public function getMessage($id)
    {
        $str = file_get_contents('data1.json');
        $array = json_decode($str, true);
        $inmessages = (object)$array[$id];
        $data = json_encode((array)$inmessages);
        file_put_contents("results.txt", print_r($data, 1), 8);
        return $data;

    }

    public function sentMails($data){
        $myfile = fopen("newfile.txt", "a");
        fwrite($myfile,$data);
    }

    public function getSentMails()
    {

        $str = file_get_contents("newfile.txt");
        $str=$str."]";
        return $str;
    }

    public function




}




$obj=new Ginbox();


echo $obj->getMessage(0);


?>