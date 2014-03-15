var Class = require('./class');
var Dzhugashvili = require('./spline/dzhugashvili');
var CatmullRom = require('./spline/catmull-rom');
//var SimpleOutline = require('./renderer/simple-outline');
var PerSegmentOutline = require('./renderer/per-segment-outline');
var Knot = require('./renderer/knot');
var KnotVel = require('./renderer/knot-vel');
var KnotAcc = require('./renderer/knot-acc');
var ObservableArray = require('./util/observable-array');
var PointDragger = require('./control/drag-point');
var mouse = require('./util/mouse');

function devnull(e) {
  e.stopPropagation && e.stopPropagation();
  e.preventDefault && e.preventDefault();
  return false;
}

var Playground = Class.extend({
  initialize: function(el) {

    this.ctx = el.getContext('2d');
    var rect = el.getBoundingClientRect();
    this.ctx.translate(-rect.left, -rect.top);

    var doc = el.ownerDocument;
    doc.addEventListener('contextmenu', devnull);

    this.points = new ObservableArray();
    var pointDragger = new PointDragger(this.points);

    el.addEventListener('click', mouse(0, this.add, this));
    el.addEventListener('mousedown', mouse(2, pointDragger.start, pointDragger));
    el.addEventListener('mouseup', mouse(2, pointDragger.end, pointDragger));
    el.addEventListener('mousemove', mouse(2, pointDragger.move, pointDragger));

    this.loop = this.loop.bind(this);


    this.splines = [
      new Dzhugashvili(this.points),
      new CatmullRom(this.points)
    ];

    this.renderers = [];
    this.renderers.push(new PerSegmentOutline(this.ctx));
    this.renderers.push(new Knot(this.ctx));
    this.renderers.push(new KnotVel(this.ctx));
    this.renderers.push(new KnotAcc(this.ctx));

    this.loop();
  },
  loop: function() {
    //try {
      this.draw();
    //} catch(ex) {
    //  throw ex;
    //}
    window.requestAnimationFrame(this.loop);
  },
  add: function add(x, y) {
    this.points.push({
      x: x, y: y, t: Date.now()
    });
    this.splines.forEach(function(spline) {
      spline.recompile();
    });
  },
  draw: function draw() {
    if(this.points.length < 2) return;
    this.ctx.clearRect(0, 0, 1000, 1000);
    this.renderers.forEach(function(renderer) {
      this.splines.forEach(function(spline) {
        renderer.draw(spline);
      }, this);
    }, this);
  }
});

module.exports = Playground;
