<?php

	$p1 = '';

	if (isset($_GET['p1']) == true) {
		$p1 = $_GET['p1'];
	}

	if (preg_match("/^[a-zA-Z0-9_]+$/", $p1) == false) {
		header("HTTP/1.1 404 Not Found");
		die();
	}

	$fn = getcwd().'/'.$p1.'.xml';

	if (file_exists($fn) == false) {
		twitter_tlget($p1, $fn);
	} else {
		if (time() - filemtime($fn) > 36000) {
			twitter_tlget($p1, $fn);
		}
	}

	header ("Content-Type: application/xhtml+xml; charset=UTF-8");
	readfile($fn);

	function twitter_tlget($p1, $fn) {

		$res = @file_get_contents('http://api.twitter.com/1/account/rate_limit_status.xml');

		if ($res == false) {
			header("HTTP/1.1 404 Not Found");
			die();
		}

		$xml = simplexml_load_string($res);

		// 読み込み制限を越えてのアクセスできないようにします。

		if ($xml->{'remaining-hits'} = 0) {
			header("HTTP/1.1 404 Not Found");
			die();
		}

		// 読み込み制限の回数調査

		$res = @file_get_contents('http://api.twitter.com/1/statuses/user_timeline.xml?screen_name='.$p1);

		if ($res == false) {
			header("HTTP/1.1 404 Not Found");
			die();
		}

		$xml = simplexml_load_string($res);

		// XML ファイルを保存します。

		file_put_contents($fn, $res);

	}
