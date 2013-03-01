/*
 * PX definintion & settings
 */	
(function() {

	var PX = window.PX || {};
	
	// Configuration variables (should be intializing in site context)
	PX.config = PX.config || {};
	
	// Ads variables (should be intializing in site context)
	PX.ads = PX.ads || {};
	
	// Debug mode
	PX.debug = !!(window.location.href.indexOf('pxdebug') > -1);
	
	// Expose PX to context
	window.PX = PX;
	
})();

/*
 * PX.utils / PXU
 * Toolbox
 */
(function() {
	
	PX.utils = {
		// Check if variable is an array
		isArray: function (arr) {
			return !!(Object.prototype.toString.call(arr) === '[object Array]');
		},
		
		// Search an item in an array
		inArray: function(find, arr) {
			var i;
			if (arr && this.isArray(arr)) {
				i = arr.length;
				while (i--) {
					if (i in arr && arr[i] === find) {
						return i;
					}
				}
			}
			return -1;
		},
		
		// Custom log
		log: function (datas, type) {
			var type = type || 'log';
			if (datas && PX.debug && window.console && window.console.log) {
				eval('console[type](datas)'); // Eval is evil... i know
			}
		},
		
		// Check undifned variable
		isUndefined: function (variable) {
			return (typeof variable === 'undefined') ? true : false;
		},
		
		// Find & Replace
		findReplace: function (str, find, replace) {
			var reg = new RegExp(find, 'g');
			return str.replace(reg, replace);
		}
	};
	
	// Shortcut => PX.utils.foo() === PXU.foo()
	window.PXU = PX.utils;
	
})();

/*
 * PX.mod
 * Modules dependency management
 */	
(function() {
	
	// Loaded modules list
	var _list = [];
	
	// Modules dependency object
	PX.mod = {
	
		// Test
		test: function (defined, required) {
			var bool;
			if (arguments.length > 0) {
				bool = this.define(defined);
			}
			else if (bool && required) {
				bool = this.require(required);
			}
			return bool;
		},
	
		// Module loading test
		isLoaded: function (module) {
			return !!(PXU.inArray(module, _list) > -1);
		},
		
		// Define new module
		define: function (module) {
			if (this.isLoaded(module)) {
				PXU.log('Module déjà chargé: px.' + module, 'error');
				return;
			}
			_list.push(module);
			return true;
		},
		
		// Wrapper for modules testing
		require: function (modules) {
			var i,
				ref,
				res,
				bool = true,
				error = function () {
					PXU.log('Module requis: "' + ref + '"', 'error');
				};
			if (!modules) {
				return;
			}
			if (typeof modules === 'string') {
				ref = modules;
				res = this.isLoaded(ref);
				if (!res) {
					error();
				}
			}
			if (PXU.isArray(modules) && modules.length > 0) {
				if (modules.length === 1) {
					ref = modules[0];
					res = this.isLoaded(ref);
					if (!res) {
						error();
					}
				}
				else {
					i = modules.length;
					while (i--) {
						ref = modules[i];
						res = this.isLoaded(ref);
						if (!res) {
							bool = false;
							error();
						}
					}
					res = bool;
				}
			}
			return res;
		}
	};
	
})();