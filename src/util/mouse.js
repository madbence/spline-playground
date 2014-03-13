module.exports = function(btn, fn, context) {
  return function(e) {
    if(e.button != btn) return;
    var x = e.pageX;
    var y = e.pageY;
    fn.call(context, x, y);
  };
};
