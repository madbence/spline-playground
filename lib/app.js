var CatmullRom = require('./catmull-rom');
var KochanekBartels = require('./kochanek-bartels');
var Dzhugashvili = require('./dzhugashvili');

//var cr = new CatmullRom();
var cr = new Dzhugashvili();

cr.points = [];

var px = cr.compile('x');
var py = cr.compile('y');
var vx = cr.compile('x', 1);
var vy = cr.compile('y', 1);
var ax = cr.compile('x', 2);
var ay = cr.compile('y', 2);

function addPoint(e) {
  cr.points.push({
    x: e.offsetX,
    y: e.offsetY,
    t: Date.now()/1000
  });
  cr.recompile();
  px = cr.compiled[0].x;
  py = cr.compiled[0].y;
  vx = cr.compiled[1].x;
  vy = cr.compiled[1].y;
  ax = cr.compiled[2].x;
  ay = cr.compiled[2].y;
  console.log(cr.points, px, py, vx, vy, ax, ay);
  document.getElementById('dbg').innerText = cr.compileLaTeX('x');
}

window.onload = function() {
  var c = document.getElementById('playground').getContext('2d');
  document.getElementById('playground').addEventListener('click', addPoint);
  var dbg = document.getElementById('dbg');
  var d = function() {
    c.clearRect(0, 0, 1200, 500);
    if(cr.points.length < 2) {
      return window.requestAnimationFrame(d);
    }
    cr.draw(c);
    var len = cr.points.length;
    t = (Date.now()/10000)%(cr.points[len-1].t-cr.points[0].t)+cr.points[0].t;
    c.beginPath();
    c.fillStyle = '#222';
    var x = px(t), y = py(t);
    c.moveTo(x, y);
    c.arc(x, y, 10, 0, Math.PI*2);
    c.fill();
    window.requestAnimationFrame(d);
  }
  window.requestAnimationFrame(d);
};
