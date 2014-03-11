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

var pick = null;

function addPoint(e) {
  if(e.button == 2) {
    var x = e.offsetX;
    var y = e.offsetY;
    pick = cr.points.reduce(function(best, point) {
      var dst = Math.sqrt((x-point.x)*(x-point.x) + (y-point.y)*(y-point.y));
      console.log(dst);
      if(!best && dst > 20) return best;
      if(!best) return point;
      if(dst < Math.sqrt((x-best.x)*(x-best.x) + (y-best.y)*(y-best.y))) return point;
      return best;
    }, null);
    var move = function(e) {
      pick.x = e.offsetX;
      pick.y = e.offsetY;
      cr._accCache = [];
      cr.recompile();
      px = cr.compiled[0].x;
      py = cr.compiled[0].y;
      vx = cr.compiled[1].x;
      vy = cr.compiled[1].y;
      ax = cr.compiled[2].x;
      ay = cr.compiled[2].y;
      document.getElementById('dbg').innerText = cr.compileLaTeX('x');
    };
    if(!pick) return;
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', function(e) {
      document.removeEventListener('mousemove', move);
      pick = null;
    });
    return;
  }
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
  console.log(px);
  document.getElementById('dbg').innerText = cr.compileLaTeX('x');
}

window.onload = function() {
  var c = document.getElementById('playground').getContext('2d');
  document.getElementById('playground').addEventListener('mousedown', addPoint);
  document.body.addEventListener('contextmenu', function(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  });
  var dbg = document.getElementById('dbg');
  var d = function() {
    c.clearRect(0, 0, 1200, 500);
    if(cr.points.length < 2) {
      return window.requestAnimationFrame(d);
    }
    var len = cr.points.length;
    c.beginPath();
    c.strokeStyle = '#aaa'
    for(var i = 0; i < len; i++) {
      c.lineTo(px(cr.points[i].t), py(cr.points[i].t));
    }
    c.stroke();
    c.fillStyle = '#999'
    for(var i = 0; i < len; i++) {
      var t = cr.points[i].t;
      var x = px(t), y = py(t);
      c.beginPath();
      c.arc(px(cr.points[i].t), py(cr.points[i].t), 3, 0, Math.PI*2);
      c.fill();
      c.strokeStyle = '#f00';
      c.beginPath();
      c.strokeStyle = '#0f0';
      c.moveTo(x, y);
      c.lineTo(x+vx(t)/10, y+vy(t)/10);
      c.stroke();
      c.beginPath();
      c.strokeStyle = '#f00';
      c.moveTo(x, y);
      c.lineTo(x+ax(t)/50, y+ay(t)/50);
      c.stroke();
    }
    t = (Date.now()/10000)%(cr.points[len-1].t-cr.points[0].t)+cr.points[0].t;
    c.beginPath();
    c.fillStyle = '#222';
    var x = px(t), y = py(t);
    c.moveTo(x, y);
    c.arc(x, y, 5, 0, Math.PI*2);
    c.fill();
    cr.draw(c);
    c.lineWidth = 2;
    c.beginPath();
    c.strokeStyle = '#0f0';
    c.moveTo(x, y);
    c.lineTo(x+vx(t)/10, y+vy(t)/10);
    c.stroke();
    c.beginPath();
    c.strokeStyle = '#f00';
    c.moveTo(x, y);
    c.lineTo(x+ax(t)/50, y+ay(t)/50);
    c.stroke();
    c.lineWidth = 1;
    window.requestAnimationFrame(d);
  }
  window.requestAnimationFrame(d);
};
