import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const defaultErrorMessage = (<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>);

const DaumPostcode = (props) => {
  const {
    style,
    onComplete,
    alwaysShowEngAddr,
    animation,
    autoClose,
    autoMapping,
    autoResize,
    defaultQuery,
    errorMessage,
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
    ...rest
  } = props;

  const [height, setHeight] = useState(props.height);
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState('block');
  const postcodeEl = useRef(null);

  const initiate = (refEl) => {
    window.daum.postcode.load(() => {
      const Postcode = new window.daum.Postcode({
        oncomplete: function oncomplete(data) {
          onComplete(data);
          if (autoClose) {
            setDisplay('none');
          }
        },
        onresize: function onresize(size) {
          if (autoResize) {
            setHeight(size.height);
          }
        },
        alwaysShowEngAddr,
        animation,
        autoMapping,
        autoResize,
        height,
        hideEngBtn,
        hideMapBtn,
        maxSuggestItems,
        pleaseReadGuide,
        pleaseReadGuideTimer,
        shorthand,
        showMoreHName,
        submitMode,
        theme,
        useSuggest,
        width,
        zonecodeOnly,
      });

      Postcode.embed(refEl, { q: defaultQuery, autoClose });
    });
  };

  const handleError = (err) => {
    err.target.remove();
    setError(true);
  };

  useEffect(() => {
    const scriptId = 'daum_postcode_script';
    const isExist = !!document.getElementById(scriptId);

    if (!isExist) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.onload = () => initiate(postcodeEl.current);
      script.onerror = handleError;
      script.id = scriptId;
      document.body.appendChild(script);
    } else {
      initiate(postcodeEl.current);
    }
  }, postcodeEl.current);

  return (
    <div
      ref={postcodeEl}
      style={{
        width,
        height,
        display,
        ...style,
      }}
      {...rest}
    >
      {error && errorMessage}
    </div>
  );
};

DaumPostcode.propTypes = {
  onComplete: PropTypes.func.isRequired,
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
  zonecodeOnly: PropTypes.bool,
};

DaumPostcode.defaultProps = {
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
  scriptUrl: 'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false',
  shorthand: true,
  showMoreHName: false,
  style: null,
  submitMode: true,
  theme: null,
  useSuggest: true,
  width: '100%',
  zonecodeOnly: false,
};

export default DaumPostcode;
