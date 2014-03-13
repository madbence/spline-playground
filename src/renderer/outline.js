var Class = require('../class');

var Outline = Class.extend({
  initialize: function(ctx, opt) {
    opt = opt || {};
    this.ctx = ctx;
    this.strokeStyle = opt.strokeStyle || '#222';
    this.lineWidth = opt.lineWidth || 1;
  },
  draw: function(spline) {
    this.ctx.save();
    this.ctx.strokeStyle = this.strokeStyle;
    this.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.drawSpline(spline);
    this.ctx.stroke();
  },
});

module.exports = Outline;
