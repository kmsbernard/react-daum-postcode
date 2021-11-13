import { useCallback, useEffect } from 'react';

import loadPostcode, { ConstructorOptions, OpenOptions, postcodeScriptUrl } from './loadPostcode';

export type PopupOptions = Omit<ConstructorOptions, 'oncomplete' | 'onresize' | 'onclose' | 'onsearch'> &
  Omit<OpenOptions, 'q'> & {
    onComplete?: ConstructorOptions['oncomplete'];
    onResize?: ConstructorOptions['onresize'];
    onClose?: ConstructorOptions['onclose'];
    onSearch?: ConstructorOptions['onsearch'];
    onError?: (error: Error) => void;
    defaultQuery?: string;
  };

function useDaumPostcodePopup(scriptUrl = postcodeScriptUrl) {
  useEffect(() => {
    loadPostcode(scriptUrl);
  }, [scriptUrl]);

  const open = useCallback(
    (options?: PopupOptions) => {
      const { defaultQuery, left, top, popupKey, popupTitle, autoClose, onComplete, onResize, onClose, onSearch, onError, ...others } = {
        ...options,
      };

      return loadPostcode(scriptUrl)
        .then((Postcode) => {
          const postcode = new Postcode({
            ...others,
            oncomplete: onComplete,
            onsearch: onSearch,
            onresize: onResize,
            onclose: onClose,
          });
          postcode.open({ q: defaultQuery, left, top, popupTitle, popupKey, autoClose });
        })
        .catch(onError);
    },
    [scriptUrl]
  );

  return open;
}

export default useDaumPostcodePopup;
