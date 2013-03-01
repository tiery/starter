// Social Networks
PX.social = (function() {
  var loadAPI = function () {
    // Facebook
    (function(d, s, id) {
  	  var js, fjs = d.getElementsByTagName(s)[0];
  	  if (d.getElementById(id)) return;
  	  js = d.createElement(s); js.id = id;
  	  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=" + PX.config.facebookAppId;
  	  fjs.parentNode.insertBefore(js, fjs);
  	}(document, 'script', 'facebook-jssdk'));
  	
  	// Twitter
  	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  	
  	// Google plus
  	(function() {
  		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  		po.src = 'https://apis.google.com/js/plusone.js';
  		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	  })();
	  
  };
  
  var _init = function() {
    loadAPI();
  };
  
  return { init: _init };
})();