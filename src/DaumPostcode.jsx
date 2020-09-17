import React from 'react';
import PropTypes from 'prop-types';

const defaultErrorMessage = (<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>);

class DaumPostcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'block',
      width: this.props.width,
      height: this.props.height,
      error: false,
    };
  }

  componentDidMount() {
    const scriptId = 'daum_postcode_script';
    const isExist = !!document.getElementById(scriptId);

    if (!isExist) {
      const script = document.createElement('script');
      script.src = this.props.scriptUrl;
      script.onload = () => this.initiate(this);
      script.onerror = error => this.handleError(error);
      script.id = scriptId;
      document.body.appendChild(script);
    } else this.initiate(this);
  }

  initiate = (comp) => {
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
        oncomplete: function oncomplete(data) {
          comp.props.onComplete(data);
          if (comp.props.autoClose) comp.setState({ display: 'none' });
        },
        onsearch: comp.props.onSearch,
        onresize: function onresize(size) {
          if (comp.props.autoResize) comp.setState({ height: size.height });
        },
        alwaysShowEngAddr: comp.props.alwaysShowEngAddr,
        animation: comp.props.animation,
        autoMapping: comp.props.autoMapping,
        autoResize: comp.props.autoResize,
        height: comp.props.height,
        hideEngBtn: comp.props.hideEngBtn,
        hideMapBtn: comp.props.hideMapBtn,
        maxSuggestItems: comp.props.maxSuggestItems,
        pleaseReadGuide: comp.props.pleaseReadGuide,
        pleaseReadGuideTimer: comp.props.pleaseReadGuideTimer,
        shorthand: comp.props.shorthand,
        showMoreHName: comp.props.showMoreHName,
        submitMode: comp.props.submitMode,
        theme: comp.props.theme,
        useSuggest: comp.props.useSuggest,
        width: comp.props.width,
        focusInput: comp.props.focusInput,
        focusContent: comp.props.focusContent,
      });

      Postcode.embed(this.wrap, { q: this.props.defaultQuery, autoClose: this.props.autoClose });
    });
  };

  handleError = (error) => {
    error.target.remove();
    this.setState({ error: true });
  };

  render() {
    const {
      style,
      onComplete,
      onSearch,
      alwaysShowEngAddr,
      animation,
      autoClose,
      autoMapping,
      autoResize,
      defaultQuery,
      errorMessage,
      height,
      hideEngBtn,
      hideMapBtn,
      maxSuggestItems,
      pleaseReadGuide,
      pleaseReadGuideTimer,
      scriptUrl,
      shorthand,
      showMoreHName,
      submitMode,
      theme,
      useSuggest,
      width,
      zonecodeOnly,
      focusInput,
      focusContent,
      ...rest
    } = this.props;

    return (
      <div
        ref={(div) => { this.wrap = div; }}
        style={{
          width: this.state.width,
          height: this.state.height,
          display: this.state.display,
          ...style,
        }}
        {...rest}
      >
        {this.state.error && this.props.errorMessage}
      </div>
    );
  }
}

DaumPostcode.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  alwaysShowEngAddr: PropTypes.bool,
  animation: PropTypes.bool,
  autoClose: PropTypes.bool,
  autoMapping: PropTypes.bool,
  autoResize: PropTypes.bool,
  defaultQuery: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hideEngBtn: PropTypes.bool,
  hideMapBtn: PropTypes.bool,
  maxSuggestItems: PropTypes.number,
  pleaseReadGuide: PropTypes.number,
  pleaseReadGuideTimer: PropTypes.number,
  scriptUrl: PropTypes.string,
  shorthand: PropTypes.bool,
  showMoreHName: PropTypes.bool,
  style: PropTypes.object,
  submitMode: PropTypes.bool,
  theme: PropTypes.object,
  useSuggest: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  focusInput: PropTypes.bool,
  focusContent: PropTypes.bool,
};

DaumPostcode.defaultProps = {
  onSearch: undefined,
  alwaysShowEngAddr: false,
  animation: false,
  autoClose: false,
  autoMapping: true,
  autoResize: false,
  defaultQuery: null,
  errorMessage: defaultErrorMessage,
  height: 400,
  hideEngBtn: false,
  hideMapBtn: false,
  maxSuggestItems: 10,
  pleaseReadGuide: 0,
  pleaseReadGuideTimer: 1.5,
  scriptUrl: 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  shorthand: true,
  showMoreHName: false,
  style: null,
  submitMode: true,
  theme: null,
  useSuggest: true,
  width: '100%',
  focusInput: true,
  focusContent: true,
};

export default DaumPostcode;
