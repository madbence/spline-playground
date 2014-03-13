var Spline = require('./spline');

var Quartic = Spline.extend({
  initialize: function() {
    this.degree = Quartic.degree;
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
        a0 = this.acc(curr, dir),
        t0 = this.par(curr),
        t1 = this.par(next),
        td = t1 - t0;
    switch(n) {
      case 0: return r0;
      case 1: return v0;
      case 2: return a0/2;
      case 3: return 4*(r1-r0)/td/td/td-(v1+3*v0)/td/td-a0/td;
      case 4: return 3*(r0-r1)/td/td/td/td+(v1+2*v0)/td/td/td+a0/2/td/td;
    }
  },
});

Quartic.degree = 4;

module.exports = Quartic;
