<?php

$req ="http://twitter.com/statuses/user_timeline/2ken10.xml";  

header("Content-Type: text/xml; charset=utf-8");

echo file_get_contents($req);

?>

