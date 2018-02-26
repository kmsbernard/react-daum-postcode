'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DaumPostcode = function (_React$Component) {
  _inherits(DaumPostcode, _React$Component);

  function DaumPostcode(props) {
    _classCallCheck(this, DaumPostcode);

    var _this = _possibleConstructorReturn(this, (DaumPostcode.__proto__ || Object.getPrototypeOf(DaumPostcode)).call(this, props));

    _this.initiate = function (comp) {
      window.daum.postcode.load(function () {
        var Postcode = new window.daum.Postcode({
          oncomplete: function oncomplete(data) {
            comp.props.onComplete(data);
            if (comp.props.autoClose) comp.setState({ display: 'none' });
          },
          onresize: function onresize(size) {
            if (comp.props.autoResize) comp.setState({ height: size.height });
          },
          theme: comp.props.theme,
          animation: comp.props.animation,
          autoMapping: comp.props.autoMapping,
          shorthand: comp.props.shorthand,
          pleaseReadGuide: comp.props.pleaseReadGuide,
          pleaseReadGuideTimer: comp.props.pleaseReadGuideTimer,
          maxSuggestItems: comp.props.maxSuggestItems,
          showMoreHName: comp.props.showMoreHName,
          hideMapBtn: comp.props.hideMapBtn,
          hideEngBtn: comp.props.hideEngBtn,
          width: '100%',
          height: '100%'
        });

        Postcode.embed(_this.wrap, { q: _this.props.defaultQuery, autoClose: _this.props.autoClose });
      });
    };

    _this.state = {
      display: 'block',
      width: _this.props.width,
      height: _this.props.height
    };
    return _this;
  }

  _createClass(DaumPostcode, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var isExist = !!document.getElementById('daum_postcode_script');

      if (!isExist) {
        var script = document.createElement('script');
        script.src = this.props.scriptUrl;
        script.onload = function () {
          return _this2.initiate(_this2);
        };
        script.id = 'daum_postcode_script';
        document.body.appendChild(script);
      } else this.initiate(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', {
        ref: function ref(div) {
          _this3.wrap = div;
        },
        style: _extends({
          width: this.state.width,
          height: this.state.height,
          display: this.state.display
        }, this.props.style)
      });
    }
  }]);

  return DaumPostcode;
}(_react2.default.Component);

DaumPostcode.propTypes = {
  onComplete: _propTypes2.default.func.isRequired,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  autoClose: _propTypes2.default.bool,
  autoResize: _propTypes2.default.bool,
  animation: _propTypes2.default.bool,
  autoMapping: _propTypes2.default.bool,
  shorthand: _propTypes2.default.bool,
  pleaseReadGuide: _propTypes2.default.number,
  pleaseReadGuideTimer: _propTypes2.default.number,
  maxSuggestItems: _propTypes2.default.number,
  showMoreHName: _propTypes2.default.bool,
  hideMapBtn: _propTypes2.default.bool,
  hideEngBtn: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  defaultQuery: _propTypes2.default.string,
  theme: _propTypes2.default.object,
  scriptUrl: _propTypes2.default.string
};

DaumPostcode.defaultProps = {
  width: '100%',
  height: 400,
  autoClose: false,
  autoResize: false,
  animation: false,
  autoMapping: true,
  shorthand: true,
  pleaseReadGuide: 0,
  pleaseReadGuideTimer: 1.5,
  maxSuggestItems: 10,
  showMoreHName: false,
  hideMapBtn: false,
  hideEngBtn: false,
  style: null,
  defaultQuery: null,
  theme: null,
  scriptUrl: 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false'
};

exports.default = DaumPostcode;