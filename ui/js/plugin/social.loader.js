(function() {
    // module config
    var module = {
        name: 'palpix_social',
        cond: function() {
        	return PX.test('rwd', ['desktop', 'tablet', 'wide-mobile']);
        },
        load: function () {
            loader([{
              load: jsPath + PX.utils.modulePath(module.name),
              callback: function () {
                PX.modules[module.name].loaded = true;
                PX.modules[module.name].init();
              }
            }]);
        }
    };

    // module registration
    PX.modules[module.name] = {
        loaded: false,
        init: null,
        presets: {}
    };
    
    // module init function
    PX.modules[module.name].init = function (context) {
        if (!module.cond()) {
            return false;
        }
        if (PX.modules[module.name].loaded) {
            if (PX.social) {
                PX.social.init();
            }
            else {
                var dummy = setTimeout(function(){
                    clearTimeout(dummy);
                    console.log('dummy - PX.social.init');
                    PX.social.init();
                },50);
            }
        }
        else {
            module.load();
        }
    };

    // first initialization
    if (module.cond()) {
        PX.modules[module.name].init();
    }
    else {
        document.documentElement.className += ' no-' + PX.utils.moduleClass(module.name);
    }
    
})();