var Outline = require('./outline');

var SimpleOutline = Outline.extend({
  initialize: function initialize(ctx, opt) {
    opt = opt || {};
    this.segments = opt.segments || 200;
  },
  drawSpline: function draw(spline) {
    var ctx = this.ctx;
    var last = spline.points.length - 1;
    for(var i = 0; i < this.segments; i++) {
      var t = spline.par(0) + i * (spline.par(last) - spline.par(0)) / (this.segments - 1);
      var x = spline.getCompiled('x');
      var y = spline.getCompiled('y');
      ctx.lineTo(x(t), y(t));
    }
  }
});

module.exports = SimpleOutline;
