var CatmullRom = require('./catmull-rom');
var KochanekBartels = require('./kochanek-bartels');

//var cr = new CatmullRom();
var cr = new KochanekBartels({
  tension: 0,
  bias: 0,
  continuity: 0
});

cr.points = [{
  x: 100, y: 100, t: 0
}, {
  x: 100, y: 200, t: 1
}, {
  x: 200, y: 200, t: 2
}];

window.onload = function() {
  var c = document.getElementById('playground').getContext('2d');
  var dbg = document.getElementById('dbg');
  var x = cr.compile('x');
  var y = cr.compile('y');
  dbg.innerText = x.toString();
  var d = function() {
    c.clearRect(0, 0, 1200, 500);
    cr.draw(c);
    t = Date.now()%2000/1000;
    c.beginPath();
    c.fillStyle = '#222';
    c.moveTo(x(t), y(t));
    c.arc(x(t), y(t), 10, 0, Math.PI*2);
    c.fill();
    window.requestAnimationFrame(d);
  }
  window.requestAnimationFrame(d);
};
