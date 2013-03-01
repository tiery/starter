(function() {
    // module config
    var module = {
        name: 'plugin_presentation',
        cond: function() {
        	return !PX.test('rwd', 'mobile') && !!document.getElementById('presentation');
        },
        load: function () {
            loader([{
              load: jsPath + PX.utils.modulePath(module.name),
              callback: function () {
                PX.modules[module.name].loaded = true;
              }
            }]);
        }
    };

    // module registration
    PX.modules[module.name] = {
        loaded: false
    };
    
    // module init function
    PX.modules[module.name].init = function (context) {
        if (!module.cond()) {
            return false;
        }
        if (!PX.modules[module.name].loaded) {
            module.load();
        }
    };

    // first initialization
    if (module.cond()) {
        PX.modules[module.name].init();
    }
    
})();