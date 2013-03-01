/*
 * Palpix testing module
 * for conditional loader
 *
 * PX.test(type, data);
 * 
 * PX.test('rwd'); // return string (desktop|tablet|wide-mobile|mobile)
 * PX.test('tpl'); // return string (frontpage|article|...)
 * PX.test('rwd', ['desktop', 'tablet', 'wide-mobile']); // return boolean
 * PX.test('rwd', 'mobile'); // return boolean
 * PX.test('tpl', ['article', 'diaporama', 'portfolio']); // return boolean
 * PX.test('tpl', 'homepage'); // return boolean
 * PX.test('retina'); // return boolean
 * PX.test('touch'); // return boolean
 */

(function() {
	
	// Module declaration
	var moduleName = 'test',
		logPrefix = 'px.' + moduleName;
	
	if (!PX.mod.test(moduleName)) {
		return;
	}
	
	// Getter en fonction du type
	var _get = {
		
		// Responsive break point
		rwd: function () {
			var style,
				breakpoint = 'desktop',
				regQuotes = /^('|")|('|")$/g;
			
			if (window.getComputedStyle) {
				style = window.getComputedStyle(document.documentElement, ":before");
	            if (style) {
	                breakpoint = style['content'] || null;
	                if (typeof breakpoint === 'string' || breakpoint instanceof String) {
	                    breakpoint = breakpoint.replace(regQuotes, "");
	                }
	            }
			}
			return breakpoint;
		},
		
		// Template
		tpl: function () {
			return PX.config.template;
		},
		
		// Retina
		retina: function () {
			return _unitTest.retina();
		},
		
		// Touch
		touch: function () {
			return _unitTest.touch();
		}
	};
	
	// Test unitaire en fonction du type
	var _unitTest = {
		
		// Responsive
		rwd: function (str) {
			if (str === _get.rwd()) {
				return true;
			}
			return false;
		},
		
		// Template
		tpl: function (str) {
			if (PX.config.template && str === PX.config.template) {
				return true;
			}
			return false;
		},
		
		// Retina
		retina: function () {
			return window.devicePixelRatio && window.devicePixelRatio >= 1.5;
		},
		
		// Touch
		touch: function () {
			return !!('ontouchstart' in window) || !!(window.DocumentTouch && document instanceof DocumentTouch);
		}
	};
	
	// Module definition
	PX[moduleName] = function (type, data) {
		var i,
			args = arguments.length;
		if (args === 1) {
			return _get[type] && _get[type]();
		}
		if (_unitTest[type]) {
			if (typeof data === 'string') {
				return _unitTest[type](data);
			}
			if (PXU.isArray(data) && data.length) {
				if (data.length === 1) {
					return _unitTest[type] && _unitTest[type](data[0]);
				}
				i = data.length;
				while (i--) {
					if (_unitTest[type](data[i])) {
						return true;
					}
				}
			}
		}
		return false;
	};	
})();