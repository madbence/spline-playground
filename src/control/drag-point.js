var Class = require('../class');

function d(p1, p2) {
  return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}

var PointDragger = Class.extend({
  initialize: function(points, opts) {
    opts = opts || {};
    this.dragging = null;
    this.points = points;
    this.threshold = opts.threshold || 20;
  },
  start: function(x, y) {
    var p = {x: x, y: y};
    var threshold = this.threshold;
    var closest = this.points.reduce(function(closest, current) {
      var dst = d(p, current);
      if(!closest && dst < threshold) {
        return current;
      } else if(closest && d(closest, p) > dst) {
        return current;
      }
      return closest;
    }, null);
    if(!closest) {
      return;
    }
    this.dragging = closest;
  },
  move: function(x, y) {
    if(!this.dragging) {
      return;
    }
    this.dragging.x = x;
    this.dragging.y = y;
    this.points.emit('change');
  },
  end: function(x, y) {
    this.dragging = null;
  }
});

module.exports = PointDragger;
