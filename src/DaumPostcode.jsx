import React from 'react';
import PropTypes from 'prop-types';


class DaumPostcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block',
      width: this.props.width,
      height: this.props.height,
    };
  }

  componentDidMount() {
    let isExist  = !!document.getElementById('daum_postcode_script');

    if(!isExist){
      const script = document.createElement('script');
      script.src = this.props.scriptUrl;
      script.onload = () => this.initiate(this);
      script.id = 'daum_postcode_script';
      document.body.appendChild(script);
    }
  }

  initiate = (comp) => {
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
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
        height: '100%',
      });

      Postcode.embed(this.wrap, { q: this.props.defaultQuery, autoClose: this.props.autoClose });
    });
  };

  render() {
    return (
      <div
        ref={(div) => { this.wrap = div; }}
        style={{
          width: this.state.width,
          height: this.state.height,
          display: this.state.display,
          ...this.props.style,
        }}
      />
    );
  }
}

DaumPostcode.propTypes = {
  onComplete: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autoClose: PropTypes.bool,
  autoResize: PropTypes.bool,
  animation: PropTypes.bool,
  autoMapping: PropTypes.bool,
  shorthand: PropTypes.bool,
  pleaseReadGuide: PropTypes.number,
  pleaseReadGuideTimer: PropTypes.number,
  maxSuggestItems: PropTypes.number,
  showMoreHName: PropTypes.bool,
  hideMapBtn: PropTypes.bool,
  hideEngBtn: PropTypes.bool,
  style: PropTypes.object,
  defaultQuery: PropTypes.string,
  theme: PropTypes.object,
  scriptUrl: PropTypes.string,
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
  scriptUrl: 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false',
};

export default DaumPostcode;
