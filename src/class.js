function Class() {}

// Poor man's inheritance
Class.extend = function extend(proto) {
  var parent = this;
  var ctor = proto.hasOwnProperty('constructor') ? proto.constructor : function ctor() {
    parent.apply(this, arguments);
    if(proto.initialize) {
      proto.initialize.apply(this, arguments);
    }
  };
  ctor.prototype = Object.create(parent.prototype);
  for(var i in proto) {
    ctor.prototype[i] = proto[i];
  }
  ctor.prototype.constructor = ctor;
  ctor.extend = parent.extend;
  return ctor;
};

module.exports = Class;
