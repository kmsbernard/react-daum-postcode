import React, { Component, createRef, CSSProperties } from 'react';
import loadPostcode, { postcodeScriptUrl, PostcodeConstructor, PostcodeOptions, EmbedOptions } from './loadPostcode';

export interface KakaoPostcodeEmbedProps
  extends Omit<PostcodeOptions, 'oncomplete' | 'onresize' | 'onclose' | 'onsearch' | 'width' | 'height'>,
    Omit<EmbedOptions, 'q'> {
  onComplete?: PostcodeOptions['oncomplete'];
  onResize?: PostcodeOptions['onresize'];
  onClose?: PostcodeOptions['onclose'];
  onSearch?: PostcodeOptions['onsearch'];
  className?: string;
  style?: CSSProperties;
  defaultQuery?: string;
  errorMessage?: string | React.ReactNode;
  scriptUrl?: string;
}

interface State {
  hasError: boolean;
  completed: boolean;
}

const defaultErrorMessage = <p>현재 Kakao 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>;

const defaultStyle = {
  width: '100%',
  height: 400,
};

const defaultProps = {
  scriptUrl: postcodeScriptUrl,
  errorMessage: defaultErrorMessage,
  autoClose: true,
};

class KakaoPostcodeEmbed extends Component<KakaoPostcodeEmbedProps, State> {
  static defaultProps = defaultProps;
  /**
   * See #61
   */
  private mounted = false;

  wrap = createRef<HTMLDivElement>();

  state = {
    hasError: false,
    completed: false,
  };

  componentDidMount() {
    const { initiate, onError } = this;
    const { scriptUrl } = this.props;

    if (!scriptUrl) return;
    if (!this.mounted) {
      loadPostcode(scriptUrl).then(initiate).catch(onError);
      this.mounted = true;
    }
  }

  initiate = (Postcode: PostcodeConstructor) => {
    if (!this.wrap.current) return;
    const { scriptUrl, className, style, defaultQuery, autoClose, errorMessage, onComplete, onClose, onResize, onSearch, ...options } =
      this.props;

    const postcode = new Postcode({
      ...options,
      oncomplete: (address) => {
        if (onComplete) onComplete(address);
        this.setState({ completed: true });
      },
      onsearch: onSearch,
      onresize: onResize,
      onclose: onClose,
      width: '100%',
      height: '100%',
    });

    postcode.embed(this.wrap.current, { q: defaultQuery, autoClose: autoClose });
  };

  onError = (e: unknown) => {
    console.error(e);
    this.setState({ hasError: true });
  };

  render() {
    const { className, style, errorMessage, autoClose } = this.props;
    const { hasError, completed } = this.state;

    if (autoClose === true && completed === true) return null;

    return (
      <div ref={this.wrap} className={className} style={{ ...defaultStyle, ...style }}>
        {hasError && errorMessage}
      </div>
    );
  }
}

export default KakaoPostcodeEmbed;
