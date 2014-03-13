var Class = require('./class');
var Dzhugashvili = require('./spline/dzhugashvili');
//var SimpleOutline = require('./renderer/simple-outline');
var PerSegmentOutline = require('./renderer/per-segment-outline');
var Knot = require('./renderer/knot');
var KnotVel = require('./renderer/knot-vel');
var KnotAcc = require('./renderer/knot-acc');
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

    el.addEventListener('click', mouse(0, this.add, this));

    this.loop = this.loop.bind(this);

    this.points = [];

    this.spline = new Dzhugashvili(this.points);

    this.renderer = [];
    //this.renderer.push(new SimpleOutline(this.ctx));
    this.renderer.push(new PerSegmentOutline(this.ctx));
    this.renderer.push(new Knot(this.ctx));
    this.renderer.push(new KnotVel(this.ctx));
    this.renderer.push(new KnotAcc(this.ctx));

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
    this.spline.recompile();
  },
  draw: function draw() {
    if(this.points.length < 2) return;
    this.ctx.clearRect(0, 0, 1000, 1000);
    for(var i = 0; i < this.renderer.length; i++) {
      this.renderer[i].draw(this.spline);
    }
  }
});

module.exports = Playground;
