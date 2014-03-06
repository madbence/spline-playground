var KochanekBartels = require('./kochanek-bartels');

var CatmullRom = KochanekBartels.extend({
  constructor: function() {
    KochanekBartels.call(this, {
      tension: 0,
      bias: 0,
      continuity: 0
    });
  }
});

module.exports = CatmullRom;
