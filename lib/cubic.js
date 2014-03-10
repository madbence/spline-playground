var Spline = require('./spline');

/**
 * The cubic spline is made from 3rd degree polynoms
 */
var Cubic = Spline.extend({
  constructor: function() {
    Spline.apply(this, arguments);
    this.degree = Cubic.degree;
  },
  /**
   * Get the `n`th coefficient for the `segment`th segment
   * in `dir` dimension
   */
  coeff: function coeff(segment, n, dir) {
    var curr = segment,
        next = segment + 1,
        r0 = this.pos(curr, dir),
        r1 = this.pos(next, dir),
        v0 = this.vel(curr, dir),
        v1 = this.vel(next, dir, true),
        t0 = this.par(curr),
        t1 = this.par(next),
        td = t1 - t0;
    switch(n) {
      case 0: return r0;
      case 1: return v0;
      case 2: return 3*(r1-r0)/td/td - (v1+2*v0)/td;
      case 3: return 2*(r0-r1)/td/td/td + (v1+v0)/td/td;
    }
  },
});

Cubic.degree = 3;

module.exports = Cubic;
