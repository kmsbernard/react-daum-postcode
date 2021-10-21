declare global {
  interface Window {
    daum: {
      postcode: {
        load: (fn: () => void) => void;
        version: string;
        _validParam_: boolean;
      };
      Postcode: PostcodeConstructor;
    };
  }
}

export interface Address {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: 'R' | 'J';
  userSelectedType: 'R' | 'J';
  noSelected: 'Y' | 'N';
  userLanguageType: 'K' | 'E';
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: 'Y' | 'N';
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}

export interface Size {
  width: number;
  height: number;
}

export type State = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';

export interface Search {
  q: string;
  count: number;
}

export interface Theme {
  bgColor?: string;
  searchBgColor?: string;
  contentBgColor?: string;
  pageBgColor?: string;
  textColor?: string;
  queryTextColor?: string;
  postcodeTextColor?: string;
  emphTextColor?: string;
  outlineColor?: string;
}

export interface PostcodeOptions {
  oncomplete?: (address: Address) => void;
  onresize?: (size: Size) => void;
  onclose?: (state: State) => void;
  onsearch?: (search: Search) => void;
  width?: string | number;
  height?: string | number;
  animation?: boolean;
  focusInput?: boolean;
  focusContent?: boolean;
  autoMapping?: boolean;
  shorthand?: boolean;
  pleaseReadGuide?: number;
  pleaseReadGuideTimer?: number;
  maxSuggestItems?: number;
  showMoreHName?: boolean;
  hideMapBtn?: boolean;
  hideEngBtn?: boolean;
  alwaysShowEngAddr?: boolean;
  submitMode?: boolean;
  useBannerLink?: boolean;
  theme?: Theme;
  useSuggest?: boolean;
}

export interface OpenOptions {
  q?: string;
  left?: number | string;
  top?: number | string;
  popupTitle?: string;
  popupKey?: string;
  autoClose?: boolean;
}

export interface EmbedOptions {
  q?: string;
  autoClose?: boolean;
}

export interface Postcode {
  open(openOptions?: OpenOptions): void;
  embed(element: HTMLElement, embedOptions?: EmbedOptions): void;
}

export interface PostcodeConstructor {
  new (postcodeOptions: PostcodeOptions): Postcode;
}

const promiseQueue = (function () {
  const queue: Array<[(value: PostcodeConstructor) => void, (error: unknown) => void]> = [];
  const enqueue = queue.push.bind(queue);
  const dequeue = () => queue.shift() ?? [];
  const resolveAll = (value: PostcodeConstructor) => {
    while (queue.length) {
      const [resolve] = dequeue();
      resolve?.(value);
    }
  };
  const rejectAll = (value: unknown) => {
    while (queue.length) {
      const [_, reject] = dequeue();
      reject?.(value);
    }
  };
  return { enqueue, resolveAll, rejectAll };
})();

const loadPostcode = (function () {
  const scriptId = 'daum_postcode_script';
  return function (url: string): Promise<typeof window.daum.Postcode> {
    if (window.daum && window.daum.Postcode) {
      return Promise.resolve(window.daum.Postcode);
    }
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = url;
      script.id = scriptId;
      script.onload = () => {
        try {
          promiseQueue.resolveAll(window.daum.Postcode);
        } catch (e) {
          promiseQueue.rejectAll(e);
        }
      };
      script.onerror = (error) => promiseQueue.rejectAll(error);
      document.body.appendChild(script);
    }
    return new Promise<PostcodeConstructor>((resolve, reject) => {
      promiseQueue.enqueue([resolve, reject]);
    });
  };
})();

export default loadPostcode;
