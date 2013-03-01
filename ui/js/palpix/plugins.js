/*
 * PX plugins management
 * Loader based on http://yepnopejs.com/
 */	
(function(loader) {
	
	// Module declaration
	var moduleName = 'plugins',
		logPrefix = 'px.' + moduleName;
	
	// Dependency
	if (!PX.mod.test(moduleName, ['test'])) {
		return;
	}
	
	// Private vars
	var _path = PX.path.scripts + 'plugin/',
		_defaults = {
			name: '',
			selector: '',
			condition: function(){},
			callback: function(){}
		};
	
	// Module definition
	PX[moduleName] = {
	
		// Plugins registred list 
		list: {},
		
		// Plugin registration
		register: function (options) {
			var that = this,
				opts = $.extend({}, _defaults, options);
			if (!opts.name) {
				PXU.log(logPrefix + ' : Name missing for Plugins registration', 'error');
				return;
			}
			that.list[opts.name] = opts;
			that.list[opts.name].loaded = false;
			that.loadProcess(opts.name, opts.init);
		},
		
		// Plugin initialization
		init: function (pluginName, callback) {
			var that = this,
				plugin = that.list[pluginName],
				cb;
				
			if (!plugin) {
				PXU.log(logPrefix + ' : Plugin "' + pluginName + '" missing', 'error');
				return;
			}
			cb = (typeof callback === 'function') ? callback : plugin.callback;
			if (plugin.loaded) {
				cb();
			}
			else {
				that.loadProcess(pluginName, callback);
			}
		},
		
		// Plugin loader
		loadProcess: function (name, callback) {
			var that = this,
				path = _path + name + '.js',
				plugin = that.list[name];
			
			if (plugin.condition()) {
				loader([{
					load: path,
					callback: function () {
						plugin.loaded = true;
						callback();
					}
				}]);
			}
		}
	};
	
})(yepnope);