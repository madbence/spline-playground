function Spline() {
  this.points = [];
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
