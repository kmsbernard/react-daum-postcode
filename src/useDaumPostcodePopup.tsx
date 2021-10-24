import { useCallback, useEffect } from 'react';

import loadPostcode, { ConstructorOptions, OpenOptions, postcodeScriptUrl } from './loadPostcode';

export type PopupOptions = Omit<ConstructorOptions, 'oncomplete' | 'onresize' | 'onclose' | 'onsearch'> &
  OpenOptions & {
    onComplete?: ConstructorOptions['oncomplete'];
    onResize?: ConstructorOptions['onresize'];
    onClose?: ConstructorOptions['onclose'];
    onSearch?: ConstructorOptions['onsearch'];
    onError?: (error: Error) => void;
  };

function useDaumPostcodePopup(scriptUrl = postcodeScriptUrl) {
  useEffect(() => {
    loadPostcode(scriptUrl);
  }, [scriptUrl]);

  const open = useCallback(
    (options?: PopupOptions) => {
      const { q, left, top, popupKey, popupTitle, autoClose, onComplete, onResize, onClose, onSearch, onError, ...others } = {
        ...options,
      };
      if (!scriptUrl) return;

      loadPostcode(scriptUrl)
        .then((Postcode) => {
          const postcode = new Postcode({
            ...others,
            oncomplete: onComplete,
            onsearch: onSearch,
            onresize: onResize,
            onclose: onClose,
          });
          postcode.open({ q, left, top, popupTitle, popupKey, autoClose });
        })
        .catch(onError);
    },
    [scriptUrl]
  );

  return open;
}

export default useDaumPostcodePopup;
