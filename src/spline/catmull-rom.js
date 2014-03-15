var KochanekBartels = require('./kochanek-bartels');

var CatmullRom = KochanekBartels.extend({
  constructor: function(points) {
    KochanekBartels.call(this, points, {
      tension: 0,
      bias: 0,
      continuity: 0
    });
  }
});

module.exports = CatmullRom;
