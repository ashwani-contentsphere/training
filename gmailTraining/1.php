<?php


$q = $_REQUEST["q"];

$str = file_get_contents('data1.json');
$array = json_decode($str, true);
//$data=$array[0][];
//echo $array;


echo "<h1>".$array[$q]["firstName"]."</h1>"."<br>"."</h2>".$array[$q]["message"]."</h2>";

//print_r($array);

?>