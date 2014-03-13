var Knot = require('./knot');

var KnotVel = Knot.extend({
  initialize: function(ctx, opt) {
    opt = opt || {};
    this.strokeStyle = opt.strokeStyle || '#f00';
  },
  drawKnot: function(spline, i) {
    this.ctx.beginPath();
    var t = spline.par(i);
    var px = spline.getCompiled('x');
    var py = spline.getCompiled('y');
    var vx = spline.getCompiled('x', 1);
    var vy = spline.getCompiled('y', 1);
    this.ctx.moveTo(px(t), py(t));
    this.ctx.lineTo(px(t)+vx(t)*100, py(t)+vy(t)*100);
    this.ctx.stroke();
  }
});

module.exports = KnotVel;
