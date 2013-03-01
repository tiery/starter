/*
PX.utils = (function($) {
  return {
    replace: function (str, find, replace) {
      var reg = new RegExp(find, 'g');
      return str.replace(reg, replace);
    },
    moduleClass: function (str) {
      return this.moduleFormat(str, '_', '-');
    },
    modulePath: function (str) {
      return this.moduleFormat(str, '_', '/') + '.js?t=' + PX.config.cacheQuery;
    }
  };
})(jQuery);
*/