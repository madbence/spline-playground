function ObservableArray(init) {
  Array.apply(this, init);
  Object.defineProperty(this, '_listeners', {
    value: []
  });
}

ObservableArray.prototype = Object.create(Array.prototype);
ObservableArray.prototype.constructor = ObservableArray;

ObservableArray.prototype.on = function(label, fn, ctx) {
  this._listeners.push({
    label: label,
    fn: fn,
    ctx: ctx
  });
};

ObservableArray.prototype.emit = function(label) {
  this._listeners.filter(function(listener) {
    return listener.label == label;
  }).forEach(function(listener) {
    listener.fn.call(listener.ctx);
  });
};

module.exports = ObservableArray;
