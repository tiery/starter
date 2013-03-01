<?php include_once(_ROOT_ . 'includes/footer.php'); ?>
</div><!-- site -->
<div id="fb-root"></div>
<div id="scripts">
	<script>
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', '##-########-#']);
	_gaq.push(['_trackPageview']);
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	var PX = {
		config: {
			cacheQuery: <?=_CACHE_?>
		},
		path: {
			scripts: '<?=_UIJS_?>'
		}
	};
	</script>
	<script src="<?=_UIJS_?>bootstrap.combined.js?v=<?=_CACHE_?>"></script>
</div><!-- scripts -->
</body>
</html>