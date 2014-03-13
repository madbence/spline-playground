var Knot = require('./knot');

var KnotAcc = Knot.extend({
  initialize: function(ctx, opt) {
    opt = opt || {};
    this.strokeStyle = opt.strokeStyle || '#060';
  },
  drawKnot: function(spline, i) {
    this.ctx.beginPath();
    var t = spline.par(i);
    var px = spline.getCompiled('x');
    var py = spline.getCompiled('y');
    var vx = spline.getCompiled('x', 2);
    var vy = spline.getCompiled('y', 2);
    this.ctx.moveTo(px(t), py(t));
    this.ctx.lineTo(px(t)+vx(t)*5000, py(t)+vy(t)*5000);
    this.ctx.stroke();
  }
});

module.exports = KnotAcc;
