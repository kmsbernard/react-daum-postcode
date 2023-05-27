import React, { Component, createRef, CSSProperties } from 'react';
import loadPostcode, { postcodeScriptUrl, PostcodeConstructor, PostcodeOptions } from './loadPostcode';

export interface DaumPostcodeEmbedProps
  extends Omit<PostcodeOptions, 'oncomplete' | 'onresize' | 'onclose' | 'onsearch' | 'width' | 'height'> {
  onComplete?: PostcodeOptions['oncomplete'];
  onResize?: PostcodeOptions['onresize'];
  onClose?: PostcodeOptions['onclose'];
  onSearch?: PostcodeOptions['onsearch'];
  className?: string;
  style?: CSSProperties;
  defaultQuery?: string;
  errorMessage?: string | React.ReactNode;
  scriptUrl?: string;
  autoClose?: boolean;
}
/**
 * @deprecated
 * type 'DaumPostcodeProps' is renamed to 'DaumPostcodeEmbedProps'.
 * use 'DaumPostcodeEmbedProps' instead of 'DaumPostcodeProps'.
 * it will be removed future version.
 */
export type DaumPostcodeProps = DaumPostcodeEmbedProps;

interface State {
  hasError: boolean;
}

/**
 * 1. 깃헙이슈_#53: DaumpostcodeEmbed 메소드 사용시 Document.write() 가 문제가 됩니다.
 * 2. 에러메세지: caught TypeError: Cannot read properties of null (reading 'document').
 * 3. 원인: `loadPostcode` 함수가 두번 실행되어 발생하는 문제입니다.
 * * React StrictMode에서는 의도적으로 라이프사이클 메소드가 두 번 호출되게 설계되어 있습니다.
 * * 이는 개발 과정에서 부작용(side-effects)이 발생하는 것을 감지하고 문제를 미리 찾아낼 수 있도록 하는 목적이 있습니다.
 * 4. 해결: 의도적으로 componentDidMount시 `loadPostcode` 함수가 1번만 호출하도록 변수 `mount`를 추가하여, mount값이 false 일때만 `loadPostcode`를 실행하면 해결됩니다.
 * @see =================== 변경 내역 ==================
 * [작성자][작업일시] - 내용
 * [HK1211][2023-05-28 Sunday 00:48:08] - 최초작성
 */
let mount = false;
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
    if (!mount) {
      mount = true; // react@18 부터 development 환경에서 React.StrictMode 사용시 출력되는 문제해결.
      loadPostcode(scriptUrl).then(initiate).catch(onError);
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

  onError = (e: unknown) => {
    console.error(e);
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
