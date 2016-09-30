<?php
//search
$q = $_REQUEST["q"];
$str = file_get_contents('data1.json');
$array = json_decode($str, true);
$data="[";
for($i=0;$i<count($array);$i++)
{
    if (strpos($array[$i]["firstName"], $q) !== false||strpos($array[$i]["message"], $q) !== false)
    {
        $data=$data.'{"firstName":'.'"'.$array[$i]["firstName"].'"'.','.'"message":'.'"'.$array[$i]["message"].'"'.'},';
    }
}
$data=substr($data, 0, -1);
$data=$data.']';
echo $data;
?>