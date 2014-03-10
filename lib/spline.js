function Spline() {
  this.points = [];
}

function revrange(s, e) {
  return Array(s-e+1).join(0).split(0).map(function(n, i) { return s-i; });
}

function derive(deg, n) {
  return n ? deg * derive(deg-1, n-1) : 1;
}

Spline.extend = function(proto) {
  var self = this;
  var ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') ? proto.constructor : function() {
    self.apply(this, arguments);
  };
  ctor.prototype = Object.create(self.prototype);
  Object.keys(proto).forEach(function(key) {
    ctor.prototype[key] = proto[key];
  });
  ctor.prototype.constructor = ctor;
  ctor.super = self;
  ctor.extend = self.extend;
  return ctor;
};

Spline.prototype = {
  /**
   * Get the `dir` component of the position vector of the `n`th knot
   * @param {number} n
   * @param {string} dir Either `x` or `y` (but it should work in with arbitrary dimensions)
   * @return {number}
   */
  pos: function(n, dir) {
    return this.points[n][dir];
  },
  /**
   * Get the parameter of the `n`th knot
   * @param {number} n
   * @return {number}
   */
  par: function(n) {
    return this.points[n].t;
  },
  /**
   * Get current segment based on the parameter
   * @param {number} t
   * @return {number} Current segment index
   */
  seg: function(t) {
    for(var i=0; i < this.points.length; i++) {
      if(this.points[i].t > t) return i - 1;
    }
    return this.points.length - 1;
  },
  /**
   * Get the compiled version of the curves function
   * @param {string} dir Either `x` or `y`, but it should work in 3, 4, etc dimensions
   * @param {number} deg Get the `n`th derivative curve function
   */
  compile: function(dir, deg) {
    deg = deg || 0;
    return new Function('t', this.points.slice(0, this.points.length - 1).map(function(seg, i) {
      return 'if(t <= ' + this.points[i+1].t + ') return ' +
      revrange(this.degree, deg).map(function(n) {
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
  },
  draw: function draw(ctx, opt) {
    opt = opt || {};
    opt.derivatives = opt.derivatives || ['#222'];
    opt.details = opt.details || 100;
    var ps = this.points,
        psl = ps.length;
    if(!this.compiled) {
      this.recompile();
    }
    if(opt.derivatives[0]) {
      ctx.strokeStyle = opt.derivatives[0];
      ctx.beginPath();
      for(var i = 0; i < opt.details; i++) {
        var t = ps[0].t + (ps[psl-1].t-ps[0].t)/(opt.details-1)*i;
        var c = this.compiled[0];
        var x = c.x(t);
        var y = c.y(t);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  },
  recompile: function recompile() {
    this.compiled = [0,1,2].map(function(deg) {
      return {
        x: this.compile('x', deg),
        y: this.compile('y', deg)
      };
    }, this);
  }
};

module.exports = Spline;
