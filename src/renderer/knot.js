var Class = require('../class');

var Knot = Class.extend({
  initialize: function(ctx, opt) {
    opt = opt || {};
    this.ctx = ctx;
    this.fillStyle = opt.fillStyle || '#666';
    this.strokeStyle = opt.strokeStyle || '#fff';
    this.lineWidth = opt.lineWidth || 1;
    this.radius = opt.radius || 3;
  },
  draw: function(spline) {
    var ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.lineWidth = this.lineWidth;
    for(var i = 0; i < spline.points.length; i++) {
      this.drawKnot(spline, i);
    }
    ctx.restore();
  },
  drawKnot: function drawKnot(spline, i) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(spline.points[i].x, spline.points[i].y, this.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
  }
});

module.exports = Knot;
