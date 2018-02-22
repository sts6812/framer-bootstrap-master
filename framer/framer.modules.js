require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer, debug) {
  var css, key, styleObj, t, val;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent,
    text: layer._info.metadata.string
  });
  styleObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr, prop, value;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    prop = _.camelCase(arr[0]);
    value = arr[1].replace(';', '');
    if (["fontSize", "letterSpacing", "lineHeight"].indexOf(prop) > -1) {
      value = parseInt(value);
    }
    return styleObj[prop] = value;
  });
  if (styleObj.hasOwnProperty("lineHeight")) {
    styleObj["lineHeight"] = styleObj.lineHeight / styleObj.fontSize;
  } else {
    styleObj["lineHeight"] = 1.3;
  }
  for (key in styleObj) {
    val = styleObj[key];
    t[key] = val;
  }
  t.y -= (t.fontSize / t.lineHeight) / (4 - t.lineHeight);
  t.x -= t.fontSize * 0.07;
  t.width += t.fontSize * 0.5;
  if (debug) {
    layer.opacity = .5;
  } else {
    layer.destroy();
  }
  return t;
};

Layer.prototype.convertToTextLayer = function(debug) {
  return convertToTextLayer(this, debug);
};

convertTextLayers = function(obj, debug) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer, debug));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"distributeLayers":[function(require,module,exports){
module.exports.distributeLayers = {
  globalDefaults: {
    direction: "vertical",
    startOffset: 0
  },
  sameDistance: function(options) {
    var defaults, index, layer, offset, ref;
    defaults = {
      distance: 500
    };
    options = Object.assign({}, this.globalDefaults, defaults, options);
    this._validateOptions(options);
    offset = options.startOffset;
    ref = options.layers;
    for (index in ref) {
      layer = ref[index];
      if (options.direction === "vertical") {
        layer.y = offset;
      } else {
        layer.x = offset;
      }
      offset += options.distance;
    }
    return this._setLayerMetadata(layer, 'methodUsed', 'sameDistance');
  },
  sameMargin: function(options) {
    var defaults, index, layer, offset, ref;
    defaults = {
      margin: 10
    };
    options = Object.assign({}, this.globalDefaults, defaults, options);
    this._validateOptions(options);
    offset = options.startOffset;
    ref = options.layers;
    for (index in ref) {
      layer = ref[index];
      if (options.direction === "vertical") {
        layer.y = offset;
        if (layer.height > 0) {
          offset += layer.height + options.margin;
        }
      } else {
        layer.x = offset;
        if (layer.width > 0) {
          offset += layer.width + options.margin;
        }
      }
    }
    return this._setLayerMetadata(layer, 'methodUsed', 'sameMargin');
  },
  spaced: function(options) {
    var defaults, index, layer, offset, ref, ref1, spacing, totalArea;
    defaults = {
      max: 1000
    };
    options = Object.assign({}, this.globalDefaults, defaults, options);
    this._validateOptions(options);
    totalArea = 0;
    ref = options.layers;
    for (index in ref) {
      layer = ref[index];
      if (options.direction === "vertical") {
        totalArea += layer.height;
      } else {
        totalArea += layer.width;
      }
    }
    spacing = (options.max - totalArea) / (options.layers.length - 1);
    offset = options.startOffset;
    ref1 = options.layers;
    for (index in ref1) {
      layer = ref1[index];
      if (options.direction === "vertical") {
        layer.y = offset;
        if (layer.height > 0) {
          offset += layer.height + spacing;
        }
      } else {
        layer.x = offset;
        if (layer.width > 0) {
          offset += layer.width + spacing;
        }
      }
    }
    return this._setLayerMetadata(layer, 'methodUsed', 'spaced');
  },
  _validateOptions: function(options) {
    if (!options.layers) {
      throw this._error('noLayers');
    }
    if (!_.isArray(options.layers)) {
      throw this._error('layersNotArray');
    }
    if (options.layers.length === 0) {
      throw this._error('layersArrayEmpty');
    }
    if (typeof options.margin === "string") {
      throw this._error('numberAsString', options.margin);
    }
    if (typeof options.startOffset === "string") {
      throw this._error('numberAsString', options.startOffset);
    }
  },
  _error: function(id, value) {
    var err;
    err = null;
    if (id === "numberAsString") {
      err = new Error("Don't put quotation marks around numbers. " + "\"" + value + "\" should be written as " + value + ".");
    }
    if (id === "noLayers") {
      err = new Error("You didn't give distributeLayers.layers any value");
    }
    if (id === "layersNotArray") {
      err = new Error("distributeLayers.layers expects an array");
    }
    if (id === "layersArrayEmpty") {
      err = new Error("The array that you passed to distributeLayers.layers was empty");
    }
    return err;
  },
  _setLayerMetadata: function(layer, key, value) {
    if (!layer.custom) {
      layer.custom = {};
    }
    layer.custom.distributeLayers = {};
    return layer.custom.distributeLayers[key] = value;
  }
};


},{}],"flipCard":[function(require,module,exports){
exports.flipCard = function(front, back, perspective, flipCurve) {
  var container, perspectiveLayer;
  perspectiveLayer = new Layer({
    width: Screen.width,
    height: Screen.height,
    backgroundColor: "transparent"
  });
  perspectiveLayer.perspective = perspective;
  perspectiveLayer.center();
  container = new Layer({
    width: front.width,
    height: front.height,
    backgroundColor: "transparent",
    superLayer: perspectiveLayer
  });
  container.center();
  back.superLayer = container;
  front.superLayer = container;
  back.rotationY = 180;
  front.states.add({
    front: {
      opacity: 1
    },
    back: {
      opacity: 0
    }
  });
  front.states.animationOptions = {
    curve: flipCurve
  };
  front.states.switchInstant("front");
  back.states.add({
    front: {
      opacity: 0
    },
    back: {
      opacity: 1
    }
  });
  back.states.animationOptions = {
    curve: flipCurve
  };
  container.states.add({
    front: {
      rotationY: 0
    },
    back: {
      rotationY: 180
    }
  });
  container.states.animationOptions = {
    curve: flipCurve
  };
  container.states.switchInstant("front");
  return container.on(Events.Click, function() {
    this.states.next(["back", "front"]);
    return front.states.next(["back", "front"]);
  });
};


},{}],"gridddle":[function(require,module,exports){
exports.gridddle = function(amountOfCell, gridColor) {
  var amountSize, i, j, k, l, lineHorizontal, lineVertical, ref, ref1, results, screenHeight, screenWidth, stepHorizontal, stepVertical;
  amountSize = Screen.width / amountOfCell;
  screenWidth = Screen.width;
  screenHeight = Screen.height;
  stepHorizontal = screenWidth / amountSize;
  stepVertical = screenHeight / amountSize;
  for (i = k = 0, ref = stepHorizontal; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    lineVertical = new Layer({
      width: 1 / 2,
      height: screenHeight,
      x: amountSize * i,
      y: 0,
      backgroundColor: gridColor,
      name: "Vertical line"
    });
  }
  results = [];
  for (j = l = 0, ref1 = stepVertical; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
    results.push(lineHorizontal = new Layer({
      width: screenWidth,
      height: 1 / 2,
      x: 0,
      y: j * amountSize,
      backgroundColor: gridColor,
      name: "Horizontal line"
    }));
  }
  return results;
};


},{}],"parallaxcomponents/ParallaxComponents":[function(require,module,exports){
var applyParallax, defaultParallaxOriginZ, setupParallax, updateLayerParallax,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaultParallaxOriginZ = 200;

setupParallax = function(component) {
  var axis, descendant, fn, fn1, i, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, results, segment;
  ref = component.content.children;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    segment = ref[i];
    segment._initPoint = segment.point;
    if (segment._hasListeners == null) {
      segment.onChange("size", function() {
        return this._initPoint = this.point;
      });
      segment.onChange("z", function() {
        return applyParallax(component);
      });
      ref1 = ["x", "y"];
      fn = function(axis) {
        return segment.onChange(axis, function() {
          if (!this._parallaxUpdate) {
            return this._initPoint[axis] = this.point[axis];
          }
        });
      };
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        axis = ref1[j];
        fn(axis);
      }
      segment._hasListeners = true;
    }
    ref2 = segment.descendants;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      descendant = ref2[k];
      ref3 = ["x", "y"];
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        axis = ref3[l];
        if (component._parallaxOrigin[axis] === null) {
          component._parallaxOrigin[axis] = segment[axis];
        }
      }
      descendant._segment = segment;
      descendant._initPoint = descendant.point;
      if (descendant._hasListeners == null) {
        descendant.onChange("size", function() {
          var len4, m, ref4, results1;
          this._initPoint = this.point;
          ref4 = ["x", "y"];
          results1 = [];
          for (m = 0, len4 = ref4.length; m < len4; m++) {
            axis = ref4[m];
            results1.push(updateLayerParallax(this, axis, component.content[axis], component._parallaxOrigin));
          }
          return results1;
        });
        descendant.onChange("z", function() {
          return applyParallax(component);
        });
        ref4 = ["x", "y"];
        fn1 = function(axis) {
          return descendant.onChange(axis, function() {
            if (!this._parallaxUpdate) {
              this._initPoint[axis] = this.point[axis];
            }
            return updateLayerParallax(this, axis, component.content[axis], component._parallaxOrigin);
          });
        };
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          axis = ref4[m];
          fn1(axis);
        }
        descendant._hasListeners = true;
      }
    }
    results.push(Utils.delay(0, function() {
      return applyParallax(component);
    }));
  }
  return results;
};

updateLayerParallax = function(layer, axis, offset, origin) {
  layer._parallaxUpdate = true;
  try {
    layer[axis] = (offset + layer._segment._initPoint[axis] - origin[axis]) / origin.z * layer.z + layer._initPoint[axis];
  } catch (error) {}
  return layer._parallaxUpdate = false;
};

applyParallax = function(component, axes, offset) {
  var axis, descendant, i, len, results, segment;
  if (axes == null) {
    axes = ["x", "y"];
  }
  if (offset == null) {
    offset = 0;
  }
  results = [];
  for (i = 0, len = axes.length; i < len; i++) {
    axis = axes[i];
    results.push((function() {
      var j, len1, ref, results1;
      ref = component.content.children;
      results1 = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        segment = ref[j];
        if (segment.children.length === 0) {
          segment._parallaxUpdate = true;
          try {
            segment[axis] = offset / component._parallaxOrigin.z * segment.z + segment._initPoint[axis];
          } catch (error) {}
          results1.push(segment._parallaxUpdate = false);
        } else {
          results1.push((function() {
            var k, len2, ref1, results2;
            ref1 = segment.descendants;
            results2 = [];
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              descendant = ref1[k];
              results2.push(updateLayerParallax(descendant, axis, offset, component._parallaxOrigin));
            }
            return results2;
          })());
        }
      }
      return results1;
    })());
  }
  return results;
};

exports.ParallaxScrollComponent = (function(superClass) {
  extend(ParallaxScrollComponent, superClass);

  ParallaxScrollComponent.define("parallaxOrigin", {
    "default": {
      x: null,
      y: null,
      z: defaultParallaxOriginZ
    },
    get: function() {
      return this._parallaxOrigin;
    },
    set: function(val) {
      var base, base1, base2, key;
      this._parallaxOrigin = {};
      for (key in val) {
        this._parallaxOrigin[key] = val[key];
      }
      if ((base = this._parallaxOrigin).x == null) {
        base.x = null;
      }
      if ((base1 = this._parallaxOrigin).y == null) {
        base1.y = null;
      }
      return (base2 = this._parallaxOrigin).z != null ? base2.z : base2.z = defaultParallaxOriginZ;
    }
  });

  function ParallaxScrollComponent() {
    var axis, fn, i, len, ref;
    ParallaxScrollComponent.__super__.constructor.apply(this, arguments);
    this.content.onChange("children", (function(_this) {
      return function() {
        return Utils.delay(0, function() {
          return setupParallax(_this);
        });
      };
    })(this));
    ref = ["x", "y", "z"];
    fn = (function(_this) {
      return function(axis) {
        return _this.content.onChange(axis, function() {
          return applyParallax(_this, axis, _this.content[axis]);
        });
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      axis = ref[i];
      fn(axis);
    }
  }

  return ParallaxScrollComponent;

})(ScrollComponent);

exports.ParallaxPageComponent = (function(superClass) {
  extend(ParallaxPageComponent, superClass);

  ParallaxPageComponent.define("parallaxOrigin", {
    "default": {
      x: null,
      y: null,
      z: defaultParallaxOriginZ
    },
    get: function() {
      return this._parallaxOrigin;
    },
    set: function(val) {
      var base, base1, base2, key;
      this._parallaxOrigin = {};
      for (key in val) {
        this._parallaxOrigin[key] = val[key];
      }
      if ((base = this._parallaxOrigin).x == null) {
        base.x = null;
      }
      if ((base1 = this._parallaxOrigin).y == null) {
        base1.y = null;
      }
      return (base2 = this._parallaxOrigin).z != null ? base2.z : base2.z = defaultParallaxOriginZ;
    }
  });

  function ParallaxPageComponent() {
    var axis, fn, i, len, ref;
    ParallaxPageComponent.__super__.constructor.apply(this, arguments);
    this.content.onChange("children", (function(_this) {
      return function() {
        return Utils.delay(0, function() {
          return setupParallax(_this);
        });
      };
    })(this));
    ref = ["x", "y", "z"];
    fn = (function(_this) {
      return function(axis) {
        return _this.content.onChange(axis, function() {
          return applyParallax(_this, axis, _this.content[axis]);
        });
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      axis = ref[i];
      fn(axis);
    }
  }

  return ParallaxPageComponent;

})(PageComponent);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvcGFyYWxsYXhjb21wb25lbnRzL1BhcmFsbGF4Q29tcG9uZW50cy5jb2ZmZWUiLCIuLi9tb2R1bGVzL2dyaWRkZGxlLmNvZmZlZSIsIi4uL21vZHVsZXMvZmxpcENhcmQuY29mZmVlIiwiLi4vbW9kdWxlcy9kaXN0cmlidXRlTGF5ZXJzLmNvZmZlZSIsIi4uL21vZHVsZXMvVGV4dExheWVyLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5kZWZhdWx0UGFyYWxsYXhPcmlnaW5aID0gMjAwXG5cbnNldHVwUGFyYWxsYXggPSAoY29tcG9uZW50KSAtPlxuXHRmb3Igc2VnbWVudCBpbiBjb21wb25lbnQuY29udGVudC5jaGlsZHJlblxuXHRcdHNlZ21lbnQuX2luaXRQb2ludCA9IHNlZ21lbnQucG9pbnRcblxuXHRcdHVubGVzcyBzZWdtZW50Ll9oYXNMaXN0ZW5lcnM/XG5cdFx0XHQjIEFkZCBsaXN0ZW5lcnMgdG8gcmVjYWxjdWxhdGUgcGFyYWxsYXggd2hlbiBzaXplIG9yIHBvc2l0aW9uIHdhcyBtb2RpZmllZFxuXHRcdFx0c2VnbWVudC5vbkNoYW5nZSBcInNpemVcIiwgLT4gQF9pbml0UG9pbnQgPSBAcG9pbnRcblx0XHRcdHNlZ21lbnQub25DaGFuZ2UgXCJ6XCIsIC0+IGFwcGx5UGFyYWxsYXgoY29tcG9uZW50KVxuXG5cdFx0XHRmb3IgYXhpcyBpbiBbXCJ4XCIsIFwieVwiXVxuXHRcdFx0XHRkbyAoYXhpcykgLT5cblx0XHRcdFx0XHRzZWdtZW50Lm9uQ2hhbmdlIGF4aXMsIC0+XG5cdFx0XHRcdFx0XHRAX2luaXRQb2ludFtheGlzXSA9IEBwb2ludFtheGlzXSB1bmxlc3MgQF9wYXJhbGxheFVwZGF0ZVxuXG5cdFx0XHRzZWdtZW50Ll9oYXNMaXN0ZW5lcnMgPSB0cnVlXG5cblx0XHRmb3IgZGVzY2VuZGFudCBpbiBzZWdtZW50LmRlc2NlbmRhbnRzXG5cblx0XHRcdCMgVHJ5IHRvIGd1ZXNzIHRoZSByaWdodCBwYXJhbGxheE9yaWdpbnt4LHl9IGZvciBQYXJhbGxheFNjcm9sbENvbXBvbmVudFxuXHRcdFx0Zm9yIGF4aXMgaW4gW1wieFwiLCBcInlcIl1cblx0XHRcdFx0Y29tcG9uZW50Ll9wYXJhbGxheE9yaWdpbltheGlzXSA9IHNlZ21lbnRbYXhpc10gaWYgY29tcG9uZW50Ll9wYXJhbGxheE9yaWdpbltheGlzXSBpcyBudWxsXG5cblx0XHRcdGRlc2NlbmRhbnQuX3NlZ21lbnQgPSBzZWdtZW50XG5cdFx0XHRkZXNjZW5kYW50Ll9pbml0UG9pbnQgPSBkZXNjZW5kYW50LnBvaW50XG5cblx0XHRcdHVubGVzcyBkZXNjZW5kYW50Ll9oYXNMaXN0ZW5lcnM/XG5cdFx0XHRcdCMgQWRkIGxpc3RlbmVycyB0byByZWNhbGN1bGF0ZSBwYXJhbGxheCB3aGVuIHNpemUgb3IgcG9zaXRpb24gd2FzIG1vZGlmaWVkXG5cdFx0XHRcdGRlc2NlbmRhbnQub25DaGFuZ2UgXCJzaXplXCIsIC0+XG5cdFx0XHRcdFx0QF9pbml0UG9pbnQgPSBAcG9pbnRcblx0XHRcdFx0XHRmb3IgYXhpcyBpbiBbXCJ4XCIsIFwieVwiXVxuXHRcdFx0XHRcdFx0dXBkYXRlTGF5ZXJQYXJhbGxheCh0aGlzLCBheGlzLCBjb21wb25lbnQuY29udGVudFtheGlzXSwgY29tcG9uZW50Ll9wYXJhbGxheE9yaWdpbilcblxuXHRcdFx0XHRkZXNjZW5kYW50Lm9uQ2hhbmdlIFwielwiLCAtPiBhcHBseVBhcmFsbGF4KGNvbXBvbmVudClcblx0XHRcdFx0Zm9yIGF4aXMgaW4gW1wieFwiLCBcInlcIl1cblx0XHRcdFx0XHRkbyAoYXhpcykgLT5cblx0XHRcdFx0XHRcdGRlc2NlbmRhbnQub25DaGFuZ2UgYXhpcywgLT5cblx0XHRcdFx0XHRcdFx0QF9pbml0UG9pbnRbYXhpc10gPSBAcG9pbnRbYXhpc10gdW5sZXNzIEBfcGFyYWxsYXhVcGRhdGVcblx0XHRcdFx0XHRcdFx0dXBkYXRlTGF5ZXJQYXJhbGxheCh0aGlzLCBheGlzLCBjb21wb25lbnQuY29udGVudFtheGlzXSwgY29tcG9uZW50Ll9wYXJhbGxheE9yaWdpbilcblxuXHRcdFx0XHRkZXNjZW5kYW50Ll9oYXNMaXN0ZW5lcnMgPSB0cnVlXG5cblx0XHQjIFVnbHkgd29ya2Fyb3VuZDogV2FpdCB1bnRpbCBuZXh0IHRpaywgc28gYWxsIGNoaWxkcmVuL2Rlc2NlbmRhbnRzIGFyZSBndWFyYW50ZWVkIHRvIGJlIHJlYWR5XG5cdFx0VXRpbHMuZGVsYXkgMCwgLT4gYXBwbHlQYXJhbGxheChjb21wb25lbnQpXG5cblxuIyBBcHBseSAvIHVwZGF0ZSBwYXJhbGxheCBvZiBzaW5nbGUgbGF5ZXJcbnVwZGF0ZUxheWVyUGFyYWxsYXggPSAobGF5ZXIsIGF4aXMsIG9mZnNldCwgb3JpZ2luKSAtPlxuXHRsYXllci5fcGFyYWxsYXhVcGRhdGUgPSB0cnVlXG5cdHRyeSBsYXllcltheGlzXSA9IChvZmZzZXQgKyBsYXllci5fc2VnbWVudC5faW5pdFBvaW50W2F4aXNdIC0gb3JpZ2luW2F4aXNdKSAvIG9yaWdpbi56ICogbGF5ZXIueiArIGxheWVyLl9pbml0UG9pbnRbYXhpc11cblx0bGF5ZXIuX3BhcmFsbGF4VXBkYXRlID0gZmFsc2VcblxuXG4jIEFwcGx5IC8gdXBkYXRlIHBhcmFsbGF4IG9mIGFsbCBsYXllcnNcbmFwcGx5UGFyYWxsYXggPSAoY29tcG9uZW50LCBheGVzID0gW1wieFwiLCBcInlcIl0sIG9mZnNldCA9IDApIC0+XG5cdGZvciBheGlzIGluIGF4ZXNcblx0XHRmb3Igc2VnbWVudCBpbiBjb21wb25lbnQuY29udGVudC5jaGlsZHJlblxuXHRcdFx0aWYgc2VnbWVudC5jaGlsZHJlbi5sZW5ndGggaXMgMFxuXHRcdFx0XHRzZWdtZW50Ll9wYXJhbGxheFVwZGF0ZSA9IHRydWVcblx0XHRcdFx0dHJ5IHNlZ21lbnRbYXhpc10gPSBvZmZzZXQgLyBjb21wb25lbnQuX3BhcmFsbGF4T3JpZ2luLnogKiBzZWdtZW50LnogKyBzZWdtZW50Ll9pbml0UG9pbnRbYXhpc11cblx0XHRcdFx0c2VnbWVudC5fcGFyYWxsYXhVcGRhdGUgPSBmYWxzZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRmb3IgZGVzY2VuZGFudCBpbiBzZWdtZW50LmRlc2NlbmRhbnRzXG5cdFx0XHRcdFx0dXBkYXRlTGF5ZXJQYXJhbGxheChkZXNjZW5kYW50LCBheGlzLCBvZmZzZXQsIGNvbXBvbmVudC5fcGFyYWxsYXhPcmlnaW4pXG5cblxuY2xhc3MgZXhwb3J0cy5QYXJhbGxheFNjcm9sbENvbXBvbmVudCBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXG5cdEBkZWZpbmUgXCJwYXJhbGxheE9yaWdpblwiLFxuXHRcdGRlZmF1bHQ6IHt4OiBudWxsLCB5OiBudWxsLCB6OiBkZWZhdWx0UGFyYWxsYXhPcmlnaW5afSxcblx0XHRnZXQ6IC0+IEBfcGFyYWxsYXhPcmlnaW5cblx0XHRzZXQ6ICh2YWwpIC0+XG5cdFx0XHRAX3BhcmFsbGF4T3JpZ2luID0ge31cblx0XHRcdGZvciBrZXkgb2YgdmFsXG5cdFx0XHRcdEBfcGFyYWxsYXhPcmlnaW5ba2V5XSA9IHZhbFtrZXldXG5cblx0XHRcdEBfcGFyYWxsYXhPcmlnaW4ueCA/PSBudWxsXG5cdFx0XHRAX3BhcmFsbGF4T3JpZ2luLnkgPz0gbnVsbFxuXHRcdFx0QF9wYXJhbGxheE9yaWdpbi56ID89IGRlZmF1bHRQYXJhbGxheE9yaWdpblpcblxuXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdHN1cGVyXG5cblx0XHRAY29udGVudC5vbkNoYW5nZSBcImNoaWxkcmVuXCIsID0+IFV0aWxzLmRlbGF5IDAsID0+IHNldHVwUGFyYWxsYXgodGhpcylcblxuXHRcdGZvciBheGlzIGluIFtcInhcIiwgXCJ5XCIsIFwielwiXVxuXHRcdFx0ZG8gKGF4aXMpID0+IEBjb250ZW50Lm9uQ2hhbmdlIGF4aXMsID0+IGFwcGx5UGFyYWxsYXgodGhpcywgYXhpcywgQGNvbnRlbnRbYXhpc10pXG5cblxuY2xhc3MgZXhwb3J0cy5QYXJhbGxheFBhZ2VDb21wb25lbnQgZXh0ZW5kcyBQYWdlQ29tcG9uZW50XG5cblx0QGRlZmluZSBcInBhcmFsbGF4T3JpZ2luXCIsXG5cdFx0ZGVmYXVsdDoge3g6IG51bGwsIHk6IG51bGwsIHo6IGRlZmF1bHRQYXJhbGxheE9yaWdpblp9LFxuXHRcdGdldDogLT4gQF9wYXJhbGxheE9yaWdpblxuXHRcdHNldDogKHZhbCkgLT5cblx0XHRcdEBfcGFyYWxsYXhPcmlnaW4gPSB7fVxuXHRcdFx0Zm9yIGtleSBvZiB2YWxcblx0XHRcdFx0QF9wYXJhbGxheE9yaWdpbltrZXldID0gdmFsW2tleV1cblxuXHRcdFx0QF9wYXJhbGxheE9yaWdpbi54ID89IG51bGxcblx0XHRcdEBfcGFyYWxsYXhPcmlnaW4ueSA/PSBudWxsXG5cdFx0XHRAX3BhcmFsbGF4T3JpZ2luLnogPz0gZGVmYXVsdFBhcmFsbGF4T3JpZ2luWlxuXG5cblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0c3VwZXJcblxuXHRcdEBjb250ZW50Lm9uQ2hhbmdlIFwiY2hpbGRyZW5cIiwgPT4gVXRpbHMuZGVsYXkgMCwgPT4gc2V0dXBQYXJhbGxheCh0aGlzKVxuXG5cdFx0Zm9yIGF4aXMgaW4gW1wieFwiLCBcInlcIiwgXCJ6XCJdXG5cdFx0XHRkbyAoYXhpcykgPT4gQGNvbnRlbnQub25DaGFuZ2UgYXhpcywgPT4gYXBwbHlQYXJhbGxheCh0aGlzLCBheGlzLCBAY29udGVudFtheGlzXSlcblxuXG4jVE9ETzogYWRkIFBhcmFsbGF4Rmxvd0NvbXBvbmVudCBcblxuXG4iLCJleHBvcnRzLmdyaWRkZGxlID0gKGFtb3VudE9mQ2VsbCwgZ3JpZENvbG9yKSAtPlxuICBhbW91bnRTaXplID0gU2NyZWVuLndpZHRoIC8gYW1vdW50T2ZDZWxsXG4gIHNjcmVlbldpZHRoID0gU2NyZWVuLndpZHRoXG4gIHNjcmVlbkhlaWdodCA9IFNjcmVlbi5oZWlnaHRcbiAgc3RlcEhvcml6b250YWwgPSBzY3JlZW5XaWR0aCAvIGFtb3VudFNpemVcbiAgc3RlcFZlcnRpY2FsID0gc2NyZWVuSGVpZ2h0IC8gYW1vdW50U2l6ZVxuICBmb3IgaSBpbiBbMC4uc3RlcEhvcml6b250YWxdXG4gICAgbGluZVZlcnRpY2FsID0gbmV3IExheWVyXG4gICAgICB3aWR0aDogMS8yXG4gICAgICBoZWlnaHQ6IHNjcmVlbkhlaWdodFxuICAgICAgeDogYW1vdW50U2l6ZSAqIGlcbiAgICAgIHk6IDBcbiAgICAgIGJhY2tncm91bmRDb2xvcjogZ3JpZENvbG9yXG4gICAgICBuYW1lOiBcIlZlcnRpY2FsIGxpbmVcIlxuICBmb3IgaiBpbiBbMC4uc3RlcFZlcnRpY2FsXVxuICAgIGxpbmVIb3Jpem9udGFsID0gbmV3IExheWVyXG4gICAgICB3aWR0aDogc2NyZWVuV2lkdGhcbiAgICAgIGhlaWdodDogMS8yXG4gICAgICB4OiAwXG4gICAgICB5OiBqICogYW1vdW50U2l6ZVxuICAgICAgYmFja2dyb3VuZENvbG9yOiBncmlkQ29sb3JcbiAgICAgIG5hbWU6IFwiSG9yaXpvbnRhbCBsaW5lXCJcbiIsImV4cG9ydHMuZmxpcENhcmQgPSAoZnJvbnQsIGJhY2ssIHBlcnNwZWN0aXZlLCBmbGlwQ3VydmUpIC0+XG4gICAgIyBDcmVhdGUgYSBuZXcgY29udGFpbmVyIGxheWVyXG4gICAgcGVyc3BlY3RpdmVMYXllciA9IG5ldyBMYXllclxuICAgICAgICB3aWR0aDogU2NyZWVuLndpZHRoXG4gICAgICAgIGhlaWdodDogU2NyZWVuLmhlaWdodFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgIHBlcnNwZWN0aXZlTGF5ZXIucGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZVxuICAgIHBlcnNwZWN0aXZlTGF5ZXIuY2VudGVyKClcblxuICAgIGNvbnRhaW5lciA9IG5ldyBMYXllclxuICAgICAgICB3aWR0aDogZnJvbnQud2lkdGhcbiAgICAgICAgaGVpZ2h0OiBmcm9udC5oZWlnaHRcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgc3VwZXJMYXllcjogcGVyc3BlY3RpdmVMYXllclxuXG4gICAgIyBDZW50ZXIgdGhlIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5jZW50ZXIoKVxuXG4gICAgI1NldCBzdXBlckxheWVyIGZvciBib3RoIGZyb250IGFuZCBiYWNrIGxheWVyc1xuICAgIGJhY2suc3VwZXJMYXllciA9IGNvbnRhaW5lclxuICAgIGZyb250LnN1cGVyTGF5ZXIgPSBjb250YWluZXJcblxuICAgICMgUm90YXRlIHRoZSBiYWNrIGltYWdlIG9uIGludGlhbFxuICAgIGJhY2sucm90YXRpb25ZID0gMTgwXG5cbiAgICAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgICMgU3RhdGVzXG4gICAgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBmcm9udC5zdGF0ZXMuYWRkXG4gICAgICAgIGZyb250OiB7b3BhY2l0eTogMX1cbiAgICAgICAgYmFjazoge29wYWNpdHk6IDB9XG4gICAgZnJvbnQuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuICAgICAgICBjdXJ2ZTogZmxpcEN1cnZlXG4gICAgZnJvbnQuc3RhdGVzLnN3aXRjaEluc3RhbnQoXCJmcm9udFwiKVxuXG4gICAgYmFjay5zdGF0ZXMuYWRkXG4gICAgICAgIGZyb250OiB7b3BhY2l0eTogMH1cbiAgICAgICAgYmFjazoge29wYWNpdHk6IDF9XG4gICAgYmFjay5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG4gICAgICAgIGN1cnZlOiBmbGlwQ3VydmVcblxuICAgIGNvbnRhaW5lci5zdGF0ZXMuYWRkXG4gICAgICAgIGZyb250OiB7cm90YXRpb25ZOiAwfVxuICAgICAgICBiYWNrOiB7cm90YXRpb25ZOiAxODB9XG4gICAgY29udGFpbmVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cbiAgICAgICAgY3VydmU6IGZsaXBDdXJ2ZVxuICAgIGNvbnRhaW5lci5zdGF0ZXMuc3dpdGNoSW5zdGFudChcImZyb250XCIpXG4gICAgY29udGFpbmVyLm9uIEV2ZW50cy5DbGljaywgLT5cbiAgICAgICAgdGhpcy5zdGF0ZXMubmV4dChbXCJiYWNrXCIsXCJmcm9udFwiXSlcbiAgICAgICAgZnJvbnQuc3RhdGVzLm5leHQoW1wiYmFja1wiLFwiZnJvbnRcIl0pXG4iLCJtb2R1bGUuZXhwb3J0cy5kaXN0cmlidXRlTGF5ZXJzID1cblxuXHQjIERlZmF1bHRzIHVzZWQgYnkgZXZlcnkgcHVibGljIG1ldGhvZFxuXHRnbG9iYWxEZWZhdWx0czpcblx0XHRkaXJlY3Rpb246IFwidmVydGljYWxcIlxuXHRcdHN0YXJ0T2Zmc2V0OiAwXG5cblx0IyBBbGwgbGF5ZXJzIGhhdmUgdGhlIHNhbWUgZGlzdGFuY2UgZnJvbSBlYWNob3RoZXIuIDUwLCAxMDAsIDE1MCwgMjAwIGV0Yy5cblx0c2FtZURpc3RhbmNlOiAob3B0aW9ucykgLT5cblxuXHRcdCMgQXJndW1lbnRzIHRoYXQgYXJlIHVuaXF1ZSB0byB0aGlzIG1ldGhvZFxuXHRcdGRlZmF1bHRzID1cblx0XHRcdGRpc3RhbmNlOiA1MDBcblxuXHRcdCMgU2V0IHVwIG9wdGlvbnMgYW5kIHZhbGlkYXRlIHByb3BlcnRpZXNcblx0XHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nbG9iYWxEZWZhdWx0cywgZGVmYXVsdHMsIG9wdGlvbnMpXG5cdFx0dGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpXG5cblx0XHQjIExvb3AgdGhyb3VnaCBhbGwgbGF5ZXJzIGFuZCBwb3NpdGlvbiB0aGVtXG5cdFx0b2Zmc2V0ID0gb3B0aW9ucy5zdGFydE9mZnNldFxuXHRcdGZvciBpbmRleCwgbGF5ZXIgb2Ygb3B0aW9ucy5sYXllcnNcblx0XHRcdGlmIG9wdGlvbnMuZGlyZWN0aW9uID09IFwidmVydGljYWxcIlxuXHRcdFx0XHRsYXllci55ID0gb2Zmc2V0XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxheWVyLnggPSBvZmZzZXRcblx0XHRcdG9mZnNldCArPSBvcHRpb25zLmRpc3RhbmNlXG5cblx0XHQjIFJlbWVtYmVyIHdoaWNoIG1ldGhvZCB3YXMgdXNlZFxuXHRcdHRoaXMuX3NldExheWVyTWV0YWRhdGEobGF5ZXIsICdtZXRob2RVc2VkJywgJ3NhbWVEaXN0YW5jZScpXG5cblx0IyBMYXllcnMgZm9sbG93IG9uZSBhbm90aGVyLiBUaGV5IGFyZSBzcGFjZWQgd2l0aCB0aGUgc2FtZSBtYXJnaW4uXG5cdHNhbWVNYXJnaW46IChvcHRpb25zKSAtPlxuXG5cdFx0IyBBcmd1bWVudHMgdGhhdCBhcmUgdW5pcXVlIHRvIHRoaXMgbWV0aG9kXG5cdFx0ZGVmYXVsdHMgPVxuXHRcdFx0bWFyZ2luOiAxMFxuXG5cdFx0IyBTZXQgdXAgb3B0aW9ucyBhbmQgdmFsaWRhdGUgcHJvcGVydGllc1xuXHRcdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdsb2JhbERlZmF1bHRzLCBkZWZhdWx0cywgb3B0aW9ucylcblx0XHR0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucylcblxuXHRcdCMgTG9vcCB0aHJvdWdoIGFsbCBsYXllcnMgYW5kIHBvc2l0aW9uIHRoZW1cblx0XHRvZmZzZXQgPSBvcHRpb25zLnN0YXJ0T2Zmc2V0XG5cdFx0Zm9yIGluZGV4LCBsYXllciBvZiBvcHRpb25zLmxheWVyc1xuXHRcdFx0aWYgb3B0aW9ucy5kaXJlY3Rpb24gPT0gXCJ2ZXJ0aWNhbFwiXG5cdFx0XHRcdGxheWVyLnkgPSBvZmZzZXRcblx0XHRcdFx0b2Zmc2V0ICs9IGxheWVyLmhlaWdodCArIG9wdGlvbnMubWFyZ2luIGlmIGxheWVyLmhlaWdodCA+IDBcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGF5ZXIueCA9IG9mZnNldFxuXHRcdFx0XHRvZmZzZXQgKz0gbGF5ZXIud2lkdGggKyBvcHRpb25zLm1hcmdpbiBpZiBsYXllci53aWR0aCA+IDBcblxuXHRcdCMgUmVtZW1iZXIgd2hpY2ggbWV0aG9kIHdhcyB1c2VkXG5cdFx0dGhpcy5fc2V0TGF5ZXJNZXRhZGF0YShsYXllciwgJ21ldGhvZFVzZWQnLCAnc2FtZU1hcmdpbicpXG5cblx0IyBMYXllcnMgZmlsbCB1cCB0aGUgc3BhY2UgYmV0d2VlbiAwIGFuZCAnbWF4Jy4gVGhlIHNwYWNlXG5cdCMgYmV0d2VlbiB0aGUgbGF5ZXJzIGlzIGF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlZC5cblx0c3BhY2VkOiAob3B0aW9ucykgLT5cblxuXHRcdCMgQXJndW1lbnRzIHRoYXQgYXJlIHVuaXF1ZSB0byB0aGlzIG1ldGhvZFxuXHRcdGRlZmF1bHRzID1cblx0XHRcdG1heDogMTAwMFxuXG5cdFx0IyBTZXQgdXAgb3B0aW9ucyBhbmQgdmFsaWRhdGUgcHJvcGVydGllc1xuXHRcdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdsb2JhbERlZmF1bHRzLCBkZWZhdWx0cywgb3B0aW9ucylcblx0XHR0aGlzLl92YWxpZGF0ZU9wdGlvbnMob3B0aW9ucylcblxuXHRcdCMgQ2FsY3VsYXRlIHRoZSBoZWlnaHQvd2lkdGggb2YgYWxsIGxheWVycyBjb21iaW5lZFxuXHRcdHRvdGFsQXJlYSA9IDBcblx0XHRmb3IgaW5kZXgsIGxheWVyIG9mIG9wdGlvbnMubGF5ZXJzXG5cdFx0XHRpZiBvcHRpb25zLmRpcmVjdGlvbiA9PSBcInZlcnRpY2FsXCJcblx0XHRcdFx0dG90YWxBcmVhICs9IGxheWVyLmhlaWdodFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0b3RhbEFyZWEgKz0gbGF5ZXIud2lkdGhcblxuXHRcdCMgQ2FsY3VsYXRlIHRoZSBzcGFjaW5nIGJldHdlZW4gZWFjaCBsYXllclxuXHRcdHNwYWNpbmcgPSAob3B0aW9ucy5tYXggLSB0b3RhbEFyZWEpIC8gKG9wdGlvbnMubGF5ZXJzLmxlbmd0aCAtIDEpXG5cblx0XHQjIExvb3AgdGhyb3VnaCBhbGwgbGF5ZXJzIGFuZCBwb3NpdGlvbiB0aGVtXG5cdFx0b2Zmc2V0ID0gb3B0aW9ucy5zdGFydE9mZnNldFxuXHRcdGZvciBpbmRleCwgbGF5ZXIgb2Ygb3B0aW9ucy5sYXllcnNcblx0XHRcdGlmIG9wdGlvbnMuZGlyZWN0aW9uID09IFwidmVydGljYWxcIlxuXHRcdFx0XHRsYXllci55ID0gb2Zmc2V0XG5cdFx0XHRcdG9mZnNldCArPSBsYXllci5oZWlnaHQgKyBzcGFjaW5nIGlmIGxheWVyLmhlaWdodCA+IDBcblx0XHRcdGVsc2Vcblx0XHRcdFx0bGF5ZXIueCA9IG9mZnNldFxuXHRcdFx0XHRvZmZzZXQgKz0gbGF5ZXIud2lkdGggKyBzcGFjaW5nIGlmIGxheWVyLndpZHRoID4gMFxuXG5cblx0XHQjIFJlbWVtYmVyIHdoaWNoIG1ldGhvZCB3YXMgdXNlZFxuXHRcdHRoaXMuX3NldExheWVyTWV0YWRhdGEobGF5ZXIsICdtZXRob2RVc2VkJywgJ3NwYWNlZCcpXG5cblx0IyBTaW1wbGUgdmFsaWRhdGlvbiBmb3Igb3B0aW9ucyBvYmplY3RzLiBEZXNpZ25lZCB0byBiZSBiZWdpbm5lci1mcmllbmRseS5cblx0X3ZhbGlkYXRlT3B0aW9uczogKG9wdGlvbnMpIC0+XG5cblx0XHRpZiAhb3B0aW9ucy5sYXllcnNcblx0XHRcdHRocm93IHRoaXMuX2Vycm9yKCdub0xheWVycycpXG5cblx0XHRpZiAhXy5pc0FycmF5KG9wdGlvbnMubGF5ZXJzKVxuXHRcdFx0dGhyb3cgdGhpcy5fZXJyb3IoJ2xheWVyc05vdEFycmF5JylcblxuXHRcdGlmIG9wdGlvbnMubGF5ZXJzLmxlbmd0aCA9PSAwXG5cdFx0XHR0aHJvdyB0aGlzLl9lcnJvcignbGF5ZXJzQXJyYXlFbXB0eScpXG5cblx0XHRpZiB0eXBlb2Ygb3B0aW9ucy5tYXJnaW4gPT0gXCJzdHJpbmdcIlxuXHRcdFx0dGhyb3cgdGhpcy5fZXJyb3IoJ251bWJlckFzU3RyaW5nJywgb3B0aW9ucy5tYXJnaW4pXG5cblx0XHRpZiB0eXBlb2Ygb3B0aW9ucy5zdGFydE9mZnNldCA9PSBcInN0cmluZ1wiXG5cdFx0XHR0aHJvdyB0aGlzLl9lcnJvcignbnVtYmVyQXNTdHJpbmcnLCBvcHRpb25zLnN0YXJ0T2Zmc2V0KVxuXG5cdCMgVGhyb3dzIGRpZmZlcmVudCBlcnJvcnMgZm9yIGRpZmZlcmVudCBlcnJvciBjb2Rlc1xuXHRfZXJyb3I6IChpZCwgdmFsdWUpIC0+XG5cdFx0ZXJyID0gbnVsbFxuXHRcdGlmIGlkID09IFwibnVtYmVyQXNTdHJpbmdcIlxuXHRcdFx0ZXJyID0gbmV3IEVycm9yIFwiRG9uJ3QgcHV0IHF1b3RhdGlvbiBtYXJrcyBhcm91bmQgbnVtYmVycy4gXCIgKyBcIlxcXCJcIiArIHZhbHVlICsgXCJcXFwiIHNob3VsZCBiZSB3cml0dGVuIGFzIFwiICsgdmFsdWUgKyBcIi5cIlxuXHRcdGlmIGlkID09IFwibm9MYXllcnNcIlxuXHRcdFx0ZXJyID0gbmV3IEVycm9yIFwiWW91IGRpZG4ndCBnaXZlIGRpc3RyaWJ1dGVMYXllcnMubGF5ZXJzIGFueSB2YWx1ZVwiXG5cdFx0aWYgaWQgPT0gXCJsYXllcnNOb3RBcnJheVwiXG5cdFx0XHRlcnIgPSBuZXcgRXJyb3IgXCJkaXN0cmlidXRlTGF5ZXJzLmxheWVycyBleHBlY3RzIGFuIGFycmF5XCJcblx0XHRpZiBpZCA9PSBcImxheWVyc0FycmF5RW1wdHlcIlxuXHRcdFx0ZXJyID0gbmV3IEVycm9yIFwiVGhlIGFycmF5IHRoYXQgeW91IHBhc3NlZCB0byBkaXN0cmlidXRlTGF5ZXJzLmxheWVycyB3YXMgZW1wdHlcIlxuXHRcdHJldHVybiBlcnJcblxuXHQjIEF0dGFjaGVzIGN1c3RvbSBtZXRhZGF0YSB0byBsYXllcnNcblx0X3NldExheWVyTWV0YWRhdGE6IChsYXllciwga2V5LCB2YWx1ZSkgLT5cblx0XHRpZiAhbGF5ZXIuY3VzdG9tIHRoZW4gbGF5ZXIuY3VzdG9tID0ge31cblx0XHRsYXllci5jdXN0b20uZGlzdHJpYnV0ZUxheWVycyA9IHt9XG5cdFx0bGF5ZXIuY3VzdG9tLmRpc3RyaWJ1dGVMYXllcnNba2V5XSA9IHZhbHVlXG4iLCIjIFRPRE86IFJlbmFtZSB0aGlzIGNsYXNzIHNvIHRoZXJlIGFyZW4ndCBuYW1lc3BhY2UgY29uZmxpY3RzLlxuY2xhc3MgVGV4dExheWVyIGV4dGVuZHMgTGF5ZXJcblx0XHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdEBkb0F1dG9TaXplID0gZmFsc2Vcblx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IGZhbHNlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwiaHNsYSg2MCwgOTAlLCA0NyUsIC40KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5jb2xvciA/PSBcInJlZFwiXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDEuMjVcblx0XHRvcHRpb25zLmZvbnRGYW1pbHkgPz0gXCJIZWx2ZXRpY2FcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMjBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJVc2UgbGF5ZXIudGV4dCB0byBhZGQgdGV4dFwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBzdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtbGluZVwiICMgYWxsb3cgXFxuIGluIC50ZXh0XG5cdFx0QHN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIiAjIG5vIGJvcmRlciB3aGVuIHNlbGVjdGVkXG5cdFx0XG5cdHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlLCBweFN1ZmZpeCA9IGZhbHNlKSAtPlxuXHRcdEBzdHlsZVtwcm9wZXJ0eV0gPSBpZiBweFN1ZmZpeCB0aGVuIHZhbHVlK1wicHhcIiBlbHNlIHZhbHVlXG5cdFx0QGVtaXQoXCJjaGFuZ2U6I3twcm9wZXJ0eX1cIiwgdmFsdWUpXG5cdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRcdFxuXHRjYWxjU2l6ZTogLT5cblx0XHRzaXplQWZmZWN0aW5nU3R5bGVzID1cblx0XHRcdGxpbmVIZWlnaHQ6IEBzdHlsZVtcImxpbmUtaGVpZ2h0XCJdXG5cdFx0XHRmb250U2l6ZTogQHN0eWxlW1wiZm9udC1zaXplXCJdXG5cdFx0XHRmb250V2VpZ2h0OiBAc3R5bGVbXCJmb250LXdlaWdodFwiXVxuXHRcdFx0cGFkZGluZ1RvcDogQHN0eWxlW1wicGFkZGluZy10b3BcIl1cblx0XHRcdHBhZGRpbmdSaWdodDogQHN0eWxlW1wicGFkZGluZy1yaWdodFwiXVxuXHRcdFx0cGFkZGluZ0JvdHRvbTogQHN0eWxlW1wicGFkZGluZy1ib3R0b21cIl1cblx0XHRcdHBhZGRpbmdMZWZ0OiBAc3R5bGVbXCJwYWRkaW5nLWxlZnRcIl1cblx0XHRcdHRleHRUcmFuc2Zvcm06IEBzdHlsZVtcInRleHQtdHJhbnNmb3JtXCJdXG5cdFx0XHRib3JkZXJXaWR0aDogQHN0eWxlW1wiYm9yZGVyLXdpZHRoXCJdXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBAc3R5bGVbXCJsZXR0ZXItc3BhY2luZ1wiXVxuXHRcdFx0Zm9udEZhbWlseTogQHN0eWxlW1wiZm9udC1mYW1pbHlcIl1cblx0XHRcdGZvbnRTdHlsZTogQHN0eWxlW1wiZm9udC1zdHlsZVwiXVxuXHRcdFx0Zm9udFZhcmlhbnQ6IEBzdHlsZVtcImZvbnQtdmFyaWFudFwiXVxuXHRcdGNvbnN0cmFpbnRzID0ge31cblx0XHRpZiBAZG9BdXRvU2l6ZUhlaWdodCB0aGVuIGNvbnN0cmFpbnRzLndpZHRoID0gQHdpZHRoXG5cdFx0c2l6ZSA9IFV0aWxzLnRleHRTaXplIEB0ZXh0LCBzaXplQWZmZWN0aW5nU3R5bGVzLCBjb25zdHJhaW50c1xuXHRcdGlmIEBzdHlsZS50ZXh0QWxpZ24gaXMgXCJyaWdodFwiXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0XHRAeCA9IEB4LUB3aWR0aFxuXHRcdGVsc2Vcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRAaGVpZ2h0ID0gc2l6ZS5oZWlnaHRcblxuXHRAZGVmaW5lIFwiYXV0b1NpemVcIixcblx0XHRnZXQ6IC0+IEBkb0F1dG9TaXplXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiYXV0b1NpemVIZWlnaHRcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJjb250ZW50RWRpdGFibGVcIixcblx0XHRzZXQ6IChib29sZWFuKSAtPlxuXHRcdFx0QF9lbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IGJvb2xlYW5cblx0XHRcdEBpZ25vcmVFdmVudHMgPSAhYm9vbGVhblxuXHRcdFx0QG9uIFwiaW5wdXRcIiwgLT4gQGNhbGNTaXplKCkgaWYgQGRvQXV0b1NpemVcblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBfZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblx0XHRcdEBlbWl0KFwiY2hhbmdlOnRleHRcIiwgdmFsdWUpXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJmb250RmFtaWx5XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRGYW1pbHlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udEZhbWlseVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTaXplXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTaXplLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTaXplXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGluZUhlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5saW5lSGVpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsaW5lSGVpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFdlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250V2VpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250V2VpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFN0eWxlXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U3R5bGVcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250VmFyaWFudFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250VmFyaWFudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250VmFyaWFudFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1RvcFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nVG9wLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nUmlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1JpZ2h0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdCb3R0b21cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0JvdHRvbS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0xlZnRcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nTGVmdC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInRleHRBbGlnblwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0QWxpZ25cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJ0ZXh0VHJhbnNmb3JtXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnRleHRUcmFuc2Zvcm0gXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRUcmFuc2Zvcm1cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJsZXR0ZXJTcGFjaW5nXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxldHRlclNwYWNpbmcucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGV0dGVyU3BhY2luZ1wiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxlbmd0aFwiLCBcblx0XHRnZXQ6IC0+IEB0ZXh0Lmxlbmd0aFxuXG5jb252ZXJ0VG9UZXh0TGF5ZXIgPSAobGF5ZXIsIGRlYnVnKSAtPlxuXG5cdCMgQ3JlYXRlIGEgdGV4dCBsYXllciB3aXRoIGFsbCB0aGUgYmFzaWMgcHJvcGVydGllcy5cblx0dCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBsYXllci5uYW1lXG5cdFx0ZnJhbWU6IGxheWVyLmZyYW1lXG5cdFx0cGFyZW50OiBsYXllci5wYXJlbnRcblx0XHR0ZXh0OiBsYXllci5faW5mby5tZXRhZGF0YS5zdHJpbmdcblxuXHQjIE9iamVjdCBmb3Igc3R5bGUgcHJvcHMuXG5cdHN0eWxlT2JqID0ge31cblx0XG5cdCMgR2V0IENTUyBmcm9tIG1ldGFkYXRhLlxuXHRjc3MgPSBsYXllci5faW5mby5tZXRhZGF0YS5jc3NcblxuXHQjIEdvIHRocm91Z2ggZWFjaCBydWxlXG5cdGNzcy5mb3JFYWNoIChydWxlKSAtPlxuXG5cdFx0IyBEaXRjaCB0aGUgZHVtYiBsYXllciBuYW1lLlxuXHRcdHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcblx0XHRcblx0XHQjIFNwbGl0IHRoZSBrZXkgYW5kIHZhbHVlIG91dFxuXHRcdGFyciA9IHJ1bGUuc3BsaXQoJzogJylcblx0XHRcblx0XHQjRm9ybWF0IHRoZSBrZXkgYW5kIHZhbHVlIHByb3Blcmx5XG5cdFx0cHJvcCA9IF8uY2FtZWxDYXNlKGFyclswXSlcblx0XHR2YWx1ZSA9IGFyclsxXS5yZXBsYWNlKCc7JywnJylcblx0XHRcblx0XHQjQ29udmVydCB0byBudW1iZXJzIGZvciBudW1lcmljIHByb3BlcnRpZXNcblx0XHRpZiBbXCJmb250U2l6ZVwiLFwibGV0dGVyU3BhY2luZ1wiLFwibGluZUhlaWdodFwiXS5pbmRleE9mKHByb3ApID4gLTFcblx0XHRcdHZhbHVlID0gcGFyc2VJbnQodmFsdWUpIFxuXG5cdFx0IyBTZXQgdGhlIGtleSBhbmQgdmFsdWUgaW4gc3R5bGVPYmpcblx0XHRzdHlsZU9ialtwcm9wXSA9IHZhbHVlXG5cdFx0XG5cdCMgU2V0IHRoZSBsaW5lLWhlaWdodCBhcyBhIHByb3BvcnRpb24gaW5zdGVhZCBvZiBwaXhlbCB2YWx1ZS5cblx0aWYgc3R5bGVPYmouaGFzT3duUHJvcGVydHkoXCJsaW5lSGVpZ2h0XCIpXG5cdFx0c3R5bGVPYmpbXCJsaW5lSGVpZ2h0XCJdID0gIHN0eWxlT2JqLmxpbmVIZWlnaHQgLyBzdHlsZU9iai5mb250U2l6ZVxuXHRlbHNlXG5cdFx0c3R5bGVPYmpbXCJsaW5lSGVpZ2h0XCJdID0gMS4zXG4gXHRcdCMgVE9ETzogRmluZCBhIHdheSB0byBwcm9wZXJseSBzZXQgdGV4dCBsaW5lLWhlaWdodCBmb3IgYXV0byB2YWx1ZXMgaW4gU2tldGNoLlxuIFx0XHQjIEN1cnJlbnRseSBhdXRvIGxpbmUtaGVpZ2h0cyB2YXJ5IGJ5IGZvbnQsIHNvIHRoaXMgaXMganVzdCBzZXR0aW5nIGEgZmFsbGJhY2sgYXJiaXRyYXJpbHkuXG5cdFxuXHRcblx0IyBTZXQgdGhlIHByb3BlcnRpZXMgZm9yIGV2ZXJ5IGtleSBpbiBzdHlsZU9ialxuXHRmb3Iga2V5LCB2YWwgb2Ygc3R5bGVPYmpcblx0XHR0W2tleV0gPSB2YWxcblxuXHQjIE9mZnNldHMgdG8gY29tcGVuc2F0ZSBmb3IgU2tldGNoJ3MgcGFkZGluZy5cblx0dC55IC09ICh0LmZvbnRTaXplIC8gdC5saW5lSGVpZ2h0KSAvICg0IC0gdC5saW5lSGVpZ2h0KVxuXHR0LnggLT0gdC5mb250U2l6ZSAqIDAuMDdcblx0dC53aWR0aCArPSB0LmZvbnRTaXplICogMC41XG5cblx0IyBTZXQgdXAgZGVidWc6IGlmIHRydWUsIGl0IGRvZXNuJ3QgZGVzdHJveSB0aGUgbGF5ZXIgc28geW91IGNhblxuXHQjIG1hbnVhbGx5IHBvc2l0aW9uIGxpbmUtaGVpZ2h0IGFuZCBzdHVmZi4gIEhlbHBmdWwuXG5cdGlmIGRlYnVnIHRoZW4gbGF5ZXIub3BhY2l0eSA9IC41IGVsc2UgbGF5ZXIuZGVzdHJveSgpXG5cdFxuXHRyZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gKGRlYnVnKSAtPiBjb252ZXJ0VG9UZXh0TGF5ZXIoQCwgZGVidWcpXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaiwgZGVidWcpIC0+XG5cdGZvciBwcm9wLGxheWVyIG9mIG9ialxuXHRcdGlmIGxheWVyLl9pbmZvLmtpbmQgaXMgXCJ0ZXh0XCJcblx0XHRcdG9ialtwcm9wXSA9IGNvbnZlcnRUb1RleHRMYXllcihsYXllciwgZGVidWcpXG5cblxuIyBCYWNrd2FyZHMgY29tcGFiaWxpdHkuIFJlcGxhY2VkIGJ5IGNvbnZlcnRUb1RleHRMYXllcigpXG5MYXllcjo6ZnJhbWVBc1RleHRMYXllciA9IChwcm9wZXJ0aWVzKSAtPlxuICAgIHQgPSBuZXcgVGV4dExheWVyXG4gICAgdC5mcmFtZSA9IEBmcmFtZVxuICAgIHQuc3VwZXJMYXllciA9IEBzdXBlckxheWVyXG4gICAgXy5leHRlbmQgdCxwcm9wZXJ0aWVzXG4gICAgQGRlc3Ryb3koKVxuICAgIHRcblxuZXhwb3J0cy5UZXh0TGF5ZXIgPSBUZXh0TGF5ZXJcbmV4cG9ydHMuY29udmVydFRleHRMYXllcnMgPSBjb252ZXJ0VGV4dExheWVyc1xuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFLQUE7QURDQSxJQUFBLGdEQUFBO0VBQUE7OztBQUFNOzs7RUFFUSxtQkFBQyxPQUFEOztNQUFDLFVBQVE7O0lBQ3JCLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFDZCxJQUFDLENBQUEsZ0JBQUQsR0FBb0I7O01BQ3BCLE9BQU8sQ0FBQyxrQkFBc0IsT0FBTyxDQUFDLEtBQVgs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
