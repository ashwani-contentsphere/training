<?php

$q = $_REQUEST["q"];
$str = file_get_contents("newfile.txt");
$str=$str."]";
$array = json_decode($str, true);
//$data=$array[0][];
//echo $array;


echo "<h1>".$array[$q]["to"]."</h1>"."<br>"."</h2>".$array[$q]["subject"]."<br>"."</h2>".$array[$q]["Message"]."</h2>";

//print_r($array);

?>