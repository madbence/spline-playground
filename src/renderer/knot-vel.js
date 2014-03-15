var Knot = require('./knot');

var KnotVel = Knot.extend({
  initialize: function(ctx, opt) {
    opt = opt || {};
    this.strokeStyle = opt.strokeStyle || '#f00';
  },
  drawKnot: function(spline, i) {
    this.ctx.beginPath();
    var px = spline.pos(i, 'x');
    var py = spline.pos(i, 'y');
    var vx = spline.vel(i, 'x');
    var vy = spline.vel(i, 'y');
    this.ctx.moveTo(px, py);
    this.ctx.lineTo(px+vx*100, py+vy*100);
    this.ctx.stroke();
  }
});

module.exports = KnotVel;
