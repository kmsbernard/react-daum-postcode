import React, { Component, createRef, CSSProperties } from 'react';
import loadPostcode, { postcodeScriptUrl, ConstructorOptions } from './loadPostcode';

export interface DaumPostcodeEmbedProps
  extends Omit<ConstructorOptions, 'oncomplete' | 'onresize' | 'onclose' | 'onsearch' | 'width' | 'height'> {
  onComplete?: ConstructorOptions['oncomplete'];
  onResize?: ConstructorOptions['onresize'];
  onClose?: ConstructorOptions['onclose'];
  onSearch?: ConstructorOptions['onsearch'];
  className?: string;
  style?: CSSProperties;
  defaultQuery?: string;
  errorMessage?: string | React.ReactNode;
  scriptUrl?: string;
  autoClose?: boolean;
}
/**
 * @deprecated
 * prop-type is renamed to 'DaumPostcodeEmbedProps'.
 * import 'DaumPostcodeEmbedProps' instead of 'DaumPostcodeProps'.
 * it will be remove next version.
 */
export type DaumPostcodeProps = DaumPostcodeEmbedProps;

interface State {
  hasError: boolean;
}

const defaultErrorMessage = <p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>;

const defaultStyle = {
  width: '100%',
  height: 400,
};

const defaultProps = {
  scriptUrl: postcodeScriptUrl,
  errorMessage: defaultErrorMessage,
  autoClose: true,
};

class DaumPostcodeEmbed extends Component<DaumPostcodeEmbedProps, State> {
  static defaultProps = defaultProps;

  wrap = createRef<HTMLDivElement>();

  state = {
    hasError: false,
  };

  componentDidMount() {
    const { initiate, onError } = this;
    const { scriptUrl } = this.props;

    if (!scriptUrl) return;
    loadPostcode(scriptUrl).then(initiate).catch(onError);
  }

  initiate = (Postcode: typeof window.daum.Postcode) => {
    if (!this.wrap.current) return;
    const { scriptUrl, className, style, defaultQuery, autoClose, errorMessage, onComplete, onClose, onResize, onSearch, ...options } =
      this.props;

    const postcode = new Postcode({
      ...options,
      oncomplete: (address) => {
        if (onComplete) onComplete(address);
        if (autoClose && this.wrap.current) this.wrap.current.remove();
      },
      onsearch: onSearch,
      onresize: onResize,
      onclose: onClose,
      width: '100%',
      height: '100%',
    });

    postcode.embed(this.wrap.current, { q: defaultQuery, autoClose: autoClose });
  };

  onError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { className, style, errorMessage } = this.props;
    const { hasError } = this.state;

    return (
      <div ref={this.wrap} className={className} style={{ ...defaultStyle, ...style }}>
        {hasError && errorMessage}
      </div>
    );
  }
}

export default DaumPostcodeEmbed;
