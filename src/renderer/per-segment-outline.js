var Outline = require('./outline');

var PerSegmentOutline = Outline.extend({
  initialize: function initialize(ctx, opt) {
    opt = opt || {};
    this.segments = opt.segments || 50;
  },
  drawSpline: function draw(spline) {
    var ctx = this.ctx;
    for(var i = 0; i < spline.points.length - 1; i++) {
      for(var j = 0; j < this.segments; j++) {
        var t = spline.par(i) + j * (spline.par(i+1) - spline.par(i)) / (this.segments -1);
        var x = spline.getCompiled('x');
        var y = spline.getCompiled('y');
        ctx.lineTo(x(t), y(t));
      }
    }
  }
});

module.exports = PerSegmentOutline;
