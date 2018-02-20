module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/DebugPath.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DebugPath;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }



function DebugPath(_ref) {
  var d = _ref.d;

  var markers = [];

  var m = d.matchAll(/([A-z])(?:(-?\d+\.?\d*(?:e-?\d+)?)[ ,])?(?:(-?\d+\.?\d*(?:e-?\d+)?)[ ,])?(?:(-?\d+\.?\d*(?:e-?\d+)?)[ ,])?(?:(-?\d+\.?\d*(?:e-?\d+)?)[ ,])?(?:(-?\d+\.?\d*(?:e-?\d+)?)[ ,])?(-?\d+\.?\d*(?:e-?\d+)?)/);
  var xLast = 0,
      yLast = 0;

  Array.from(m).map(function (match) {
    if (!match) {
      console.warn(match);
      return [];
    }

    var _match = _toArray(match),
        original = _match[0],
        command = _match[1],
        pointsDirty = _match.slice(2);

    var points = pointsDirty.filter(function (p) {
      return p != null;
    }).map(parseFloat);
    console.assert(original === command + points.join(','));
    return [command, points];
  }).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        command = _ref3[0],
        points = _ref3[1];

    if (command === 'C') {
      var _points = _slicedToArray(points, 6),
          x1 = _points[0],
          y1 = _points[1],
          x2 = _points[2],
          y2 = _points[3],
          x = _points[4],
          y = _points[5];

      markers.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'g',
        { className: '-bezier-handle' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { r: 2, cx: x, cy: y, fill: 'blue', opacity: '0.5' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { r: 2, cx: x1, cy: y1, fill: 'red', opacity: '0.5' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { r: 2, cx: x2, cy: y2, fill: 'green', opacity: '0.5' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('line', { x1: xLast, y1: yLast, x2: x1, y2: y1, stroke: 'grey', opacity: '0.5' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('line', { x1: x, y1: y, x2: x2, y2: y2, stroke: 'grey', opacity: '0.5' })
      ));xLast = x;
      yLast = y;
    }
    if (command === 'M') {
      var _points2 = _slicedToArray(points, 2),
          _x = _points2[0],
          _y = _points2[1];

      markers.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'g',
        { className: '-point-handle' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { r: 2, cx: _x, cy: _y, fill: 'steelblue' })
      ));xLast = _x;
      yLast = _y;
    }
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'g',
    null,
    markers.map(function (compo, i) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'g',
        { key: i },
        compo
      );
    })
  );
}

/***/ }),

/***/ "./src/components/PetalChart.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PetalChart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__("d3-scale");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape__ = __webpack_require__("d3-shape");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_DebugPath__ = __webpack_require__("./src/components/DebugPath.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_curve_normal_bezier__ = __webpack_require__("./src/lib/curve-normal-bezier.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var DEFAULT_COLORS = ['#00D066', '#00DB69', '#00E56F', '#4FD1F3', '#44BFE6', '#3AABDA', '#2E97CC', '#3377B0', '#345494', '#342D75', '#00A352', '#00BB5B'];

function dumbHash() {
  return window.btoa(Math.random().toString().slice(2)).slice(0, 10);
}

var PetalChart = function (_React$Component) {
  _inherits(PetalChart, _React$Component);

  function PetalChart() {
    _classCallCheck(this, PetalChart);

    return _possibleConstructorReturn(this, (PetalChart.__proto__ || Object.getPrototypeOf(PetalChart)).apply(this, arguments));
  }

  _createClass(PetalChart, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
          _props$margin = _props.margin,
          margin = _props$margin === undefined ? 0 : _props$margin,
          dataDirty = _props.data,
          domain = _props.domain,
          debug = _props.debug,
          _props$highlightedSec = _props.highlightedSector,
          highlightedSector = _props$highlightedSec === undefined ? null : _props$highlightedSec,
          _props$enableBlur = _props.enableBlur,
          enableBlur = _props$enableBlur === undefined ? false : _props$enableBlur,
          _props$colors = _props.colors,
          colors = _props$colors === undefined ? DEFAULT_COLORS : _props$colors;

      var radius = size / 2 - margin;
      var dotRadius = radius / 50;
      var innerRadius = radius / 30;

      var scale = Object(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])().domain(domain).range([10, radius]);
      var count = dataDirty.length;
      var angleSlice = Math.PI * 2 / count;
      var degreeSlice = 360 / count;
      var data = dataDirty.map(function (v, i) {
        return v === null ? scale.invert(0) : v;
      });

      var CPRs = [3, 4, 5, 6, 7, 8, 9];
      var allCPRsMissing = CPRs.every(function (i) {
        return dataDirty[i] === null;
      });
      var dataMissingIndexesIncludedCPRs = dataDirty.map(function (v, i) {
        return v === null ? i : null;
      }).filter(function (v) {
        return v !== null;
      });
      var dataMissingIndexes = allCPRsMissing ? dataMissingIndexesIncludedCPRs.filter(function (i) {
        return !CPRs.includes(i);
      }) : dataMissingIndexesIncludedCPRs;

      if (highlightedSector < 0 || highlightedSector >= count) throw new Error('Petalchart: invalid highlightedSector');

      var radarLine = Object(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["lineRadial"])().curve(__WEBPACK_IMPORTED_MODULE_4_lib_curve_normal_bezier__["a" /* default */]).radius(scale).angle(function (d, i) {
        return i * angleSlice;
      });

      var radarPath = radarLine(data);

      var slicePath = Object(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["arc"])().innerRadius(innerRadius).outerRadius(radius + 20).startAngle(0).endAngle(angleSlice);

      var sliceCenterPath = Object(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["arc"])().innerRadius(innerRadius).outerRadius(radius + 20).startAngle(0).endAngle(angleSlice).cornerRadius(5);

      var sliceHighlightedMaskPath = Object(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["arc"])().innerRadius(0).outerRadius(radius + 5).startAngle(angleSlice * highlightedSector + angleSlice / 2).endAngle(2 * Math.PI + angleSlice * highlightedSector - angleSlice / 2);

      var sliceMissingDatumPath = Object(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["arc"])().innerRadius(innerRadius).outerRadius(radius).startAngle(function (sliceIndex) {
        return angleSlice * sliceIndex + angleSlice / 2;
      }).endAngle(function (sliceIndex) {
        return angleSlice * sliceIndex - angleSlice / 2;
      });

      var hash = dumbHash();
      var clipPathId = 'clipping-area-radar--' + hash;
      var maskCenterCornersId = 'mask-center-corners--' + hash;
      var blurId = 'blur--' + hash;
      var missingDataPatternId = 'missing-data--' + hash;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: { width: '100%', height: '100%', position: 'relative' } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'svg',
          { width: size, height: size },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'defs',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'clipPath',
              { id: clipPathId },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: radarPath })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'mask',
              { id: maskCenterCornersId },
              data.map(function (d, i) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', {
                  key: i,
                  d: sliceCenterPath(),
                  transform: 'rotate(' + i * degreeSlice + ')',
                  fill: 'white'
                });
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'filter',
              { id: blurId, x: '0', y: '0' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('feGaussianBlur', { 'in': 'SourceGraphic', stdDeviation: '6' })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'pattern',
              { id: missingDataPatternId, x: '10', y: '0', width: '40', height: '40', patternUnits: 'userSpaceOnUse' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', { width: '40', height: '40', fill: 'black', fillOpacity: '0.05' }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M0,0 l41,41 M0,-40 l41,41 M-40,0 l41,41', stroke: 'black', strokeWidth: '2', strokeOpacity: '0.2', fill: 'none' })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'g',
            { transform: 'translate(' + (size - dotRadius) / 2 + ',' + (size - dotRadius) / 2 + ')' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              { className: '-background-circle', mask: 'url(#' + maskCenterCornersId + ')' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', { r: radius, fill: '#F3F3F3' })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              { className: '-missing-data-markers' },
              dataMissingIndexes.map(function (i) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', {
                  d: sliceMissingDatumPath(i),
                  fill: 'url(#' + missingDataPatternId + ') black',
                  fillOpacity: i === highlightedSector || highlightedSector === null ? 1 : 0.3
                });
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              {
                className: '-colored-slices',
                clipPath: 'url(#' + clipPathId + ')',
                mask: 'url(#' + maskCenterCornersId + ')'
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'g',
                { filter: enableBlur ? 'url(#' + blurId + ')' : null },
                data.map(function (d, i) {
                  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', {
                    key: i,
                    d: slicePath(),
                    transform: 'rotate(' + (i * degreeSlice - degreeSlice / 2) + ')',
                    fill: colors[i]
                  });
                })
              ),
              highlightedSector !== null && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'g',
                { className: '-highlighted-sector-mask' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: sliceHighlightedMaskPath(), fill: '#F3F3F3', fillOpacity: '0.8' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              { className: '-axis' },
              data.map(function (d, i) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('line', {
                  key: i,
                  x1: 0,
                  y1: 0,
                  x2: radius * Math.cos(angleSlice * i - Math.PI / 2),
                  y2: radius * Math.sin(angleSlice * i - Math.PI / 2),
                  stroke: '#FFFFFF',
                  strokeWidth: 1.2
                });
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              { className: '-data-points' },
              data.map(function (d, i) {
                // Manage data N/A
                if (dataDirty[i] === null) return null;

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('circle', {
                  key: i,
                  r: dotRadius,
                  cx: scale(d) * Math.cos(angleSlice * i - Math.PI / 2),
                  cy: scale(d) * Math.sin(angleSlice * i - Math.PI / 2),
                  fill: highlightedSector === null || highlightedSector === i ? 'black' : '#D6D6D6'
                });
              })
            ),
            debug && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_components_DebugPath__["a" /* default */], { d: radarPath })
          )
        )
      );
    }
  }]);

  return PetalChart;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ "./src/lib.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_PetalChart__ = __webpack_require__("./src/components/PetalChart.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PetalChart", function() { return __WEBPACK_IMPORTED_MODULE_0_components_PetalChart__["a"]; });



/***/ }),

/***/ "./src/lib/curve-normal-bezier.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NormalBezier */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_noop__ = __webpack_require__("lodash/noop");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_noop__);



function NormalBezier(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

NormalBezier.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0_lodash_noop___default.a,
  areaEnd: __WEBPACK_IMPORTED_MODULE_0_lodash_noop___default.a,
  lineStart: function lineStart() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function lineEnd() {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
      case 2:
        {
          this._context.lineTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },

  point: function point(x, y) {
    x = Number(x);
    y = Number(y);
    switch (this._point) {
      case 0:
        {
          this._point = 1;
          this._x3 = x;
          this._y3 = y;
          break;
        }
      case 1:
        {
          this._point = 2;
          this._x4 = x;
          this._y4 = y;
          break;
        }
      case 2:
        {
          this._point = 3;
          this._x5 = x;
          this._y5 = y;
          this._context.moveTo(x, y);
          break;
        }
      default:
        {
          var p1 = { x: x, y: y };
          var p0 = { x: this._x2, y: this._y2 };

          var t = 0.25;

          var nearZero = function nearZero(x) {
            return Math.abs(x) < 0.01;
          };
          var signedLength = function signedLength(_ref) {
            var x = _ref.x,
                y = _ref.y;
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * -Math.sign(y);
          };
          var length = function length(_ref2) {
            var x = _ref2.x,
                y = _ref2.y;
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          };
          var normalized = function normalized(_ref3) {
            var x = _ref3.x,
                y = _ref3.y;

            var n = length({ x: x, y: y });
            return { x: x / n, y: y / n };
          };
          var multiplied = function multiplied(_ref4, n) {
            var x = _ref4.x,
                y = _ref4.y;

            return { x: x * n, y: y * n };
          };

          var m1 = -(p0.x / p0.y);
          var d1 = nearZero(p0.y) ? { x: 0, y: 1 } : nearZero(p0.x) ? { x: 1, y: 0 } : normalized({ x: 1, y: m1 });
          var v1 = multiplied(d1, signedLength(p0) * t);
          var h1 = {
            x: p0.x + v1.x,
            y: p0.y + v1.y
          };

          var m2 = -(p1.x / p1.y);
          var d2 = nearZero(p1.y) ? { x: 0, y: 1 } : nearZero(p1.x) ? { x: 1, y: 0 } : normalized({ x: 1, y: m2 });
          var v2 = multiplied(d2, signedLength(p1) * t);
          var h2 = {
            x: p1.x - v2.x,
            y: p1.y - v2.y
          };

          this._context.bezierCurveTo(h1.x, h1.y, h2.x, h2.y, p1.x, p1.y);
        }
    }

    this._x0 = this._x1;
    this._x1 = this._x2;
    this._x2 = x;

    this._y0 = this._y1;
    this._y1 = this._y2;
    this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {
  function cardinal(context) {
    return new NormalBezier(context, tension);
  }

  cardinal.tension = function (tension) {
    return custom(Number(tension));
  };

  return cardinal;
})(0));

/***/ }),

/***/ "d3-scale":
/***/ (function(module, exports) {

module.exports = require("d3-scale");

/***/ }),

/***/ "d3-shape":
/***/ (function(module, exports) {

module.exports = require("d3-shape");

/***/ }),

/***/ "lodash/noop":
/***/ (function(module, exports) {

module.exports = require("lodash/noop");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });