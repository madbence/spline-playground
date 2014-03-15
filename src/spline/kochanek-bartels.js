var Cubic = require('./cubic');

var KochanekBartels = Cubic.extend({
  initialize: function(points, opts) {
    this.tension = opts.tension;
    this.bias = opts.bias;
    this.continuity = opts.continuity;
  },
  vel: function(n, dir, end) {
    if(n == 0 || n == this.points.length - 1) return 0;
    var r0 = this.pos(n-1, dir),
        r1 = this.pos(n, dir),
        r2 = this.pos(n+1, dir),
        t0 = this.par(n-1, dir),
        t1 = this.par(n, dir),
        t2 = this.par(n+1, dir),
        t = this.tension,
        b = this.bias,
        c = this.continuity;
    return (1-t)*(1+b)*(1+(end?-c:c))*(r1-r0)/(t1-t0)/2 +
           (1-t)*(1-b)*(1+(end?c:-c))*(r2-r1)/(t2-t1)/2;
  }
});

module.exports = KochanekBartels;
