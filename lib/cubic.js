var Spline = require('./spline');

function revrange(s, e) {
  return Array(s-e+1).join(0).split(0).map(function(n, i) { return s-i; });
}

function derive(deg, n) {
  return n ? deg * derive(deg-1, n-1) : 1;
}

var Cubic = Spline.extend({
  constructor: function() {
    Spline.apply(this, arguments);
  },
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
  pos: function(n, dir) {
    return this.points[n][dir];
  },
  par: function(n) {
    return this.points[n].t;
  },
  seg: function(t) {
    for(var i=0; i < this.points.length; i++) {
      if(this.points[i].t > t) return i - 1;
    }
    return this.points.length - 1;
  },
  compile: function(dir, deg) {
    deg = deg || 0;
    return new Function('t', this.points.slice(0, this.points.length - 1).map(function(seg, i) {
      return 'if(t <= ' + this.points[i+1].t + ') return ' +
      revrange(3, deg).map(function(n) {
        return derive(n, deg) * this.coeff(i, n, dir) + '*Math.pow(t - ' + seg.t + ', ' + (n-deg) + ')'
      }, this).join(' + ') + ';';
    }, this).join('\n'));
  },
  compileLaTeX: function(dir) {
    return 'f_' + dir + '(t)=\\left\\{\\begin{matrix}' +
      this.points.slice(0, this.points.length - 1).map(function(seg, i) {
      return [3,2,1,0].map(function(n) {
        return this.coeff(i, n, dir).toFixed(2) + (n ? '(t-t{' + i + '})' + (n > 1 ? '^' + n : '') : '')
      }, this).join('+') + '&\\text{if}&' + seg.t.toFixed(2) + '\\leq t<' + this.points[i+1].t.toFixed(2);
    }, this).join('\\\\') + '\\end{matrix}\\right.';
  }
});

module.exports = Cubic;
