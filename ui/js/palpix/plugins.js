/*
 * PX plugins management
 * Loader based on http://yepnopejs.com/
 */	
(function (loader, $, html) {
	'use strict';
	// Module declaration
	var moduleName = 'plugins',
		logPrefix = 'px.' + moduleName,
		_path = PX.path.scripts + 'plugin/',
		_defaults = {
			name: '',
			condition: function(){},
			callback: function(){}
		};
	
	// Dependency
	if (!PX.mod.test(moduleName, ['test'])) {
		return;
	}
	
	// Module definition
	PX[moduleName] = {
	
		// Plugins registred list 
		list: {},
		
		// Plugin registration method (use it in app.js)
		register: function (options) {
			var that = this,
				opts = $.extend({}, _defaults, options);
			if (!opts.name) {
				PXU.log(logPrefix + ' : Name missing for Plugins registration', 'error');
				return;
			}
			if (that.list[opts.name]) {
				PXU.log(logPrefix + ' : Plugin "' + opts.name + '" already registred', 'error');
				return;
			}
			that.list[opts.name] = opts;
			that.list[opts.name].loaded = false;
			html.className += ' no-' + opts.name;
			that.loadProcess(opts.name, opts.callback);
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
				that.loadProcess(pluginName, cb);
			}
		},
		
		// Plugin loader
		loadProcess: function (name, callback) {
			var that = this,
				path = _path + name + '.js?v=' + PX.config.cacheQuery,
				plugin = that.list[name];
			
			if (plugin.condition()) {
				loader([{
					load: path,
					callback: function () {
						plugin.loaded = true;
						html.className = html.className.replace('no-' + name, name);
						callback();
					}
				}]);
			}
		}
	};
	
}(yepnope, jQuery, document.documentElement));
