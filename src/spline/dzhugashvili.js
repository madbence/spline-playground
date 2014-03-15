var Quartic = require('./quartic');

var Dzhugashvili = Quartic.extend({
  initialize: function() {
    this._accCache = [];
    this.points.on('change', function() {
      this._accCache = [];
    }, this);
  },
  acc: function(n, dir) {
    if(n == 0) return 0;
    if(this._accCache[n] && this._accCache[n][dir] != undefined) return this._accCache[n][dir];
    return (this._accCache[n] = this._accCache[n] || {})[dir] = this.evaluate(this.par(n), dir, 2, n-1);
  },
  vel: function(n, dir, end) {
    if(n == 0 || n == this.points.length - 1) return 0;
    var r0 = this.pos(n-1, dir),
        r1 = this.pos(n, dir),
        r2 = this.pos(n+1, dir),
        t0 = this.par(n-1, dir),
        t1 = this.par(n, dir),
        t2 = this.par(n+1, dir);
    return ((r1-r0)/(t1-t0)+(r2-r1)/(t2-t1))/2;
  }
});

module.exports = Dzhugashvili;
