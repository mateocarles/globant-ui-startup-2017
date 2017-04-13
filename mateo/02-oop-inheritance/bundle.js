(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = function Actor(name, age) {
    _classCallCheck(this, Actor);

    this.name = name;
    this.age = age;
};

module.exports = Actor;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isFunction = function isFunction(obj) {
    return typeof obj == 'function' || false;
};

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.listeners = new Map(); //sets up an initially empty map for keeping track of our listeners
    }

    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(label, callback) {
            // argument label identifies the type of notifications the listener wants to receive
            // the callback function we should invoke for the listener when we 
            // emit that event.
            this.listeners.has(label) || this.listeners.set(label, []); //create the label if it isnt there
            this.listeners.get(label).push(callback); //push callback function 
        }
    }, {
        key: 'emit',
        value: function emit(label) {
            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {

                listeners.forEach(function (listener) {
                    listener(label);
                });
                return true;
            }
            return false;
        }
    }, {
        key: 'off',
        value: function off(label, callback) {

            var listeners = this.listeners.get(label),
                index = void 0;

            if (listeners && listeners.length) {

                index = listeners.reduce(function (i, listener, index) {

                    return isFunction(listener) && listener === callback ? i = index : i;
                }, -1);

                if (index > -1) {
                    listeners.splice(index, 1);
                    this.listeners.set(label, listeners);
                    return true;
                }
            }
            return false;
        }
    }]);

    return EventEmitter;
}();

module.exports = EventEmitter;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, [{
        key: "log",
        value: function log(info) {
            console.log("the " + info + " event has been emitted");
        }
    }]);

    return Logger;
}();

module.exports = Logger;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _Social = require('./Social');

var _Social2 = _interopRequireDefault(_Social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Movie = function (_EventEmitter) {
    _inherits(Movie, _EventEmitter);

    function Movie(title, year, duration) {
        _classCallCheck(this, Movie);

        var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this));

        _this.title = title;
        _this.year = year;
        _this.duration = duration;
        Object.assign(_this, _Social2.default);
        _this.actors = new Array();
        return _this;
    }

    _createClass(Movie, [{
        key: 'play',
        value: function play() {
            this.emit("play");
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.emit("pause");
        }
    }, {
        key: 'resume',
        value: function resume() {
            this.emit("resume");
        }
    }, {
        key: 'addCast',
        value: function addCast(actors) {
            var _this2 = this;

            if (Array.isArray(actors)) {
                actors.forEach(function (actor) {
                    _this2.actors.push(actor);
                });
            } else {
                this.actors.push(actors);
            }
        }
    }]);

    return Movie;
}(_EventEmitter3.default);

module.exports = Movie;

},{"./EventEmitter":2,"./Social":5}],5:[function(require,module,exports){
"use strict";

var Social = {
    share: function share(friendName) {
        var msj = friendName + " shared " + this.title;
        console.log(msj);
    },
    like: function like(friendName) {
        var msj = friendName + " likes " + this.title;
        console.log(msj);
    }
};

module.exports = Social;

},{}],6:[function(require,module,exports){
'use strict';

var _Actor = require('./Actor');

var _Actor2 = _interopRequireDefault(_Actor);

var _Movie = require('./Movie');

var _Movie2 = _interopRequireDefault(_Movie);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showCast(actors) {

   for (var i = 0; i < actors.length; i++) {

      console.log(actors[i].name);
   }
}

///////TESTS/////


var terminator = new _Movie2.default('TERMINATOR', 1985, "1h22m");
var logger = new _Logger2.default();

terminator.on("play", logger.log);
terminator.play();

terminator.share("Thomas");
terminator.like("Matthew");

var actor1 = new _Actor2.default("Arnold", 65);
console.log(actor1.name + " is an actor");

var actor2 = new _Actor2.default("Phil", 60);
var otherCast = [new _Actor2.default('Paul Winfield', 50), new _Actor2.default('Michael Biehn', 50), new _Actor2.default('Linda Hamilton', 50)];

terminator.addCast(actor1);
terminator.addCast(actor2);
terminator.addCast(otherCast);

showCast(terminator.actors);

//////////////////////////////////

},{"./Actor":1,"./Logger":3,"./Movie":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJBY3Rvci5qcyIsIkV2ZW50RW1pdHRlci5qcyIsIkxvZ2dlci5qcyIsIk1vdmllLmpzIiwiU29jaWFsLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0lDQU0sSyxHQUVGLGVBQVksSUFBWixFQUFpQixHQUFqQixFQUFzQjtBQUFBOztBQUNsQixTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNILEM7O0FBRUwsT0FBTyxPQUFQLEdBQWlCLEtBQWpCOzs7Ozs7Ozs7QUNOQyxJQUFJLGFBQWEsU0FBYixVQUFhLENBQVMsR0FBVCxFQUFjO0FBQ3hCLFdBQU8sT0FBTyxHQUFQLElBQWMsVUFBZCxJQUE0QixLQUFuQztBQUNILENBRko7O0lBS0ssWTtBQUVGLDRCQUFjO0FBQUE7O0FBQ1YsYUFBSyxTQUFMLEdBQWlCLElBQUksR0FBSixFQUFqQixDQURVLENBQ2tCO0FBQy9COzs7OzJCQUVHLEssRUFBTyxRLEVBQVU7QUFBRTtBQUNBO0FBQ0E7QUFDbkIsaUJBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsS0FBbkIsS0FBNkIsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFuQixFQUEwQixFQUExQixDQUE3QixDQUhpQixDQUcyQztBQUM1RCxpQkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFuQixFQUEwQixJQUExQixDQUErQixRQUEvQixFQUppQixDQUl5QjtBQUU3Qzs7OzZCQUNLLEssRUFBTztBQUNULGdCQUFJLFlBQVksS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFuQixDQUFoQjs7QUFFQSxnQkFBSSxhQUFhLFVBQVUsTUFBM0IsRUFBbUM7O0FBRS9CLDBCQUFVLE9BQVYsQ0FBa0IsVUFBQyxRQUFELEVBQWM7QUFDNUIsNkJBQVMsS0FBVDtBQUNILGlCQUZEO0FBR0EsdUJBQU8sSUFBUDtBQUVI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O0FBQ0EsV0FBVyxJQUFYOztBQUlBLFdBQVcsS0FBWCxDQUFpQixRQUFqQjtBQUNBLFdBQVcsSUFBWCxDQUFnQixTQUFoQjs7QUFFQSxJQUFJLFNBQVMsb0JBQVUsUUFBVixFQUFtQixFQUFuQixDQUFiO0FBQ0EsUUFBUSxHQUFSLENBQVksT0FBTyxJQUFQLEdBQWMsY0FBMUI7O0FBRUEsSUFBSSxTQUFTLG9CQUFVLE1BQVYsRUFBaUIsRUFBakIsQ0FBYjtBQUNBLElBQUksWUFBWSxDQUNiLG9CQUFVLGVBQVYsRUFBMkIsRUFBM0IsQ0FEYSxFQUViLG9CQUFVLGVBQVYsRUFBMkIsRUFBM0IsQ0FGYSxFQUdiLG9CQUFVLGdCQUFWLEVBQTRCLEVBQTVCLENBSGEsQ0FBaEI7O0FBT0EsV0FBVyxPQUFYLENBQW1CLE1BQW5CO0FBQ0EsV0FBVyxPQUFYLENBQW1CLE1BQW5CO0FBQ0EsV0FBVyxPQUFYLENBQW1CLFNBQW5COztBQUVBLFNBQVMsV0FBVyxNQUFwQjs7QUFVQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBBY3RvciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZSxhZ2UpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gQWN0b3I7XHJcbiAiLCJcclxuIGxldCBpc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7ICBcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xyXG4gICAgfTsgXHJcblxyXG5cclxuY2xhc3MgRXZlbnRFbWl0dGVyIHsgICBcclxuICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTsgLy9zZXRzIHVwIGFuIGluaXRpYWxseSBlbXB0eSBtYXAgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygb3VyIGxpc3RlbmVyc1xyXG4gICAgfVxyXG5cclxuICAgIG9uIChsYWJlbCwgY2FsbGJhY2spIHsgLy8gYXJndW1lbnQgbGFiZWwgaWRlbnRpZmllcyB0aGUgdHlwZSBvZiBub3RpZmljYXRpb25zIHRoZSBsaXN0ZW5lciB3YW50cyB0byByZWNlaXZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB3ZSBzaG91bGQgaW52b2tlIGZvciB0aGUgbGlzdGVuZXIgd2hlbiB3ZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW1pdCB0aGF0IGV2ZW50LlxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmhhcyhsYWJlbCkgfHwgdGhpcy5saXN0ZW5lcnMuc2V0KGxhYmVsLCBbXSk7IC8vY3JlYXRlIHRoZSBsYWJlbCBpZiBpdCBpc250IHRoZXJlXHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGxhYmVsKS5wdXNoKGNhbGxiYWNrKTsgLy9wdXNoIGNhbGxiYWNrIGZ1bmN0aW9uIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZW1pdCAobGFiZWwpIHtcclxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGxhYmVsKTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGxhYmVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBvZmYgKGxhYmVsLCBjYWxsYmFjaykgeyAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmdldChsYWJlbCksXHJcbiAgICAgICAgaW5kZXg7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgaW5kZXggPSBsaXN0ZW5lcnMucmVkdWNlKChpLCBsaXN0ZW5lciwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGlzRnVuY3Rpb24obGlzdGVuZXIpICYmIGxpc3RlbmVyID09PSBjYWxsYmFjaykgP1xyXG4gICAgICAgICAgICAgICAgaSA9IGluZGV4IDpcclxuICAgICAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgIH0sIC0xKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNldChsYWJlbCwgbGlzdGVuZXJzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcbiIsIlxyXG5jbGFzcyBMb2dnZXIge1xyXG4gICAgXHJcbiAgICBsb2coaW5mbykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIFwiICsgaW5mbyArIFwiIGV2ZW50IGhhcyBiZWVuIGVtaXR0ZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTG9nZ2VyOyIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi9FdmVudEVtaXR0ZXInO1xyXG5pbXBvcnQgU29jaWFsIGZyb20gJy4vU29jaWFsJztcclxuXHJcblxyXG5jbGFzcyBNb3ZpZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLHllYXIsZHVyYXRpb24pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnllYXIgPSB5ZWFyO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsU29jaWFsKTtcclxuICAgICAgICB0aGlzLmFjdG9ycyA9IG5ldyBBcnJheSgpOyBcclxuICAgIH1cclxuXHJcbiAgIHBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwicGxheVwiKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChcInBhdXNlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgcmVzdW1lKCkge1xyXG4gICAgICAgIHRoaXMuZW1pdChcInJlc3VtZVwiKTsgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRDYXN0KGFjdG9ycykge1xyXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoYWN0b3JzKSkge1xyXG4gICAgICAgICAgICBhY3RvcnMuZm9yRWFjaCgoYWN0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3JzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmllOyIsImxldCBTb2NpYWwgPSB7XHJcbiAgICBcclxuICAgIHNoYXJlKGZyaWVuZE5hbWUpIHtcclxuICAgICAgICBsZXQgbXNqID0gZnJpZW5kTmFtZSArIFwiIHNoYXJlZCBcIiArIHRoaXMudGl0bGU7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNqKTtcclxuICAgIH0sXHJcblxyXG4gICAgbGlrZShmcmllbmROYW1lKSB7XHJcbiAgICAgICAgbGV0IG1zaiA9IGZyaWVuZE5hbWUgKyBcIiBsaWtlcyBcIiArIHRoaXMudGl0bGU7XHJcbiAgICAgICAgY29uc29sZS5sb2cobXNqKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb2NpYWw7IiwiXG5cbmltcG9ydCBBY3RvciBmcm9tICcuL0FjdG9yJztcbmltcG9ydCBNb3ZpZSBmcm9tICcuL01vdmllJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi9Mb2dnZXInO1xuXG5cblxuZnVuY3Rpb24gc2hvd0Nhc3QoYWN0b3JzKSB7XG5cbiAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0b3JzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKGFjdG9yc1tpXS5uYW1lKTtcbiAgIH1cbn1cblxuXG4vLy8vLy8vVEVTVFMvLy8vL1xuXG5cblxubGV0IHRlcm1pbmF0b3IgPSBuZXcgTW92aWUoJ1RFUk1JTkFUT1InLDE5ODUsXCIxaDIybVwiKTtcbmxldCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbnRlcm1pbmF0b3Iub24oXCJwbGF5XCIsbG9nZ2VyLmxvZyk7XG50ZXJtaW5hdG9yLnBsYXkoKTtcblxuXG5cbnRlcm1pbmF0b3Iuc2hhcmUoXCJUaG9tYXNcIik7XG50ZXJtaW5hdG9yLmxpa2UoXCJNYXR0aGV3XCIpO1xuXG5sZXQgYWN0b3IxID0gbmV3IEFjdG9yKFwiQXJub2xkXCIsNjUpO1xuY29uc29sZS5sb2coYWN0b3IxLm5hbWUgKyBcIiBpcyBhbiBhY3RvclwiKTtcblxubGV0IGFjdG9yMiA9IG5ldyBBY3RvcihcIlBoaWxcIiw2MCk7XG5sZXQgb3RoZXJDYXN0ID0gW1xuICAgbmV3IEFjdG9yKCdQYXVsIFdpbmZpZWxkJywgNTApLFxuICAgbmV3IEFjdG9yKCdNaWNoYWVsIEJpZWhuJywgNTApLFxuICAgbmV3IEFjdG9yKCdMaW5kYSBIYW1pbHRvbicsIDUwKVxuXTtcblxuXG50ZXJtaW5hdG9yLmFkZENhc3QoYWN0b3IxKTtcbnRlcm1pbmF0b3IuYWRkQ2FzdChhY3RvcjIpO1xudGVybWluYXRvci5hZGRDYXN0KG90aGVyQ2FzdCk7XG5cbnNob3dDYXN0KHRlcm1pbmF0b3IuYWN0b3JzKTtcblxuXG5cblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8iXX0=
