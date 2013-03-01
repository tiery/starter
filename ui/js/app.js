/*
 * Scripts
 * Conditional Loader & Initializer
 */

/* Usage
 
PX.plugins.register({
	name: 'presentation',
	condition: function () {
		return PX.test('touch')
	},
	callback: function () {
		$('div').presentation();
	}
});

 */