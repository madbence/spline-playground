var Class = require('../class');

var SimpleOutline = Class.extend({
  initialize: function initialize(ctx, opt) {
    opt = opt || {};
    this.ctx = ctx;
    this.segments = opt.segments || 1000;
  },
  draw: function draw(spline) {
    var ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    var last = spline.points.length - 1;
    for(var i = 0; i < this.segments; i++) {
      var t = spline.par(0) + i * (spline.par(last) - spline.par(0)) / (this.segments - 1);
      var x = spline.getCompiled('x');
      var y = spline.getCompiled('y');
      ctx.lineTo(x(t), y(t));
    }
    ctx.stroke();
    ctx.restore();
  }
});

module.exports = SimpleOutline;
