<?php

$ch = curl_init();

$email = "email@totest.com";
$qs = "email=" . urlencode($email);
$url = "http://emailpie.com/v1/check?" . $qs;
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

$data = json_decode(curl_exec($ch));
curl_close($ch);

echo $data;
exit;