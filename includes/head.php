<?php
$title = '';
if (isset($page)) {
	$title .= $page . ' - ';
}
$title .= _SITENAME_;
$htmlClasses = 'no-js no-touch';
?>
<!doctype html>
<!--[if lt IE 7 ]> <html lang="fr" class="<?=$htmlClasses?> ie  lte-ie8 lte-ie7 lt-ie7"> <![endif]-->
<!--[if IE 7 ]>    <html lang="fr" class="<?=$htmlClasses?> ie7 lte-ie8 lte-ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="fr" class="<?=$htmlClasses?> ie8 lte-ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="fr" class="<?=$htmlClasses?> ie9 lte-ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="fr" class="<?=$htmlClasses?>"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><?=$title?></title>
	<meta name="description" content="">
	<meta property="og:type" content="Website">
	<meta property="og:title" content="<?=$title?>">
	<meta property="og:description" content="">
	<meta property="og:image" content="">
	<meta property="og:url" content=""> 
	<meta property="og:site_name" content="<?=_SITENAME_?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="cleartype" content="on">
	<meta name="format-detection" content="telephone=no">
	<script>
	(function(ua,h,c) {
		h[c] = h[c].replace('no-js', 'js');
		var os = ['windows','macintosh','linux','android','iphone', 'ipad'];
		for (var i=0, l=os.length; i<l; i++) {
			if (new RegExp(os[i]).test(ua)) { h[c] += ' ' + os[i]; break; }
		}
	})(navigator.userAgent.toLowerCase(), document.documentElement, 'className');
	</script>
	<link rel="stylesheet" href="<?=_UICSS_?>screen.css?v=<?=_CACHE_?>">
	<!--[if lt IE 9]>
		<script src="<?=_UIJS_?>libraries/html5shiv.js"></script>
		<link rel="stylesheet" href="<?=_UICSS_?>print.css" media="print">
	<![endif]-->
	<link rel="shortcut icon" href="<?=_WEBROOT_?>favicon.ico">
</head>
<body>
<div id="site" class="site">
<?php include_once(_ROOT_ . 'includes/header.php'); ?>