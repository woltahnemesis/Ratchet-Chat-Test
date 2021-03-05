<?php

echo $_GET['chatInput'];
echo $_GET['name'];

if(isset($_GET['chatInput'])) {

  $txt = "<p>".$_GET['name'].': '.$_GET['chatInput']."</p>\n";

  $chatFile = fopen('chat.txt', 'a');
  fwrite($chatFile, $txt);
  fclose($chatFile);
}

?>
