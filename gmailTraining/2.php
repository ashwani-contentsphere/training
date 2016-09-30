<?php

//$json = file_get_contents('php://input');
//$obj = json_decode($json);
$a='"';
$x = $a.$_REQUEST["to"].$a;
$y = $a.$_REQUEST["subject"].$a;
$z = $a.$_REQUEST["msg"].$a;
$data=',{ "to" :'.$x.',"subject" :'.$y.', "Message" :'.$z."}";

$myfile = fopen("newfile.txt", "a");
//fwrite($myfile,"[{to:ashwani,subject:none,message:Empty}");

fwrite($myfile,$data);


echo     "Mail SuccesFully Send";
?>