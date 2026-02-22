import KakaoPostcodeEmbed from './KakaoPostcodeEmbed';
import useKakaoPostcodePopup from './useKakaoPostcodePopup';
import loadPostcode from './loadPostcode';

export { loadPostcode, KakaoPostcodeEmbed, useKakaoPostcodePopup };
export default KakaoPostcodeEmbed;

import type { KakaoPostcodeEmbedProps } from './KakaoPostcodeEmbed';
import type { KakaoPostcodePopupParams } from './useKakaoPostcodePopup';
import type { Address, Search, State } from './loadPostcode';

export type { KakaoPostcodeEmbedProps, KakaoPostcodePopupParams, Address, Search, State };

/**
 * @deprecated Use `KakaoPostcodeEmbed` instead.
 */
const DaumPostcodeEmbed = KakaoPostcodeEmbed;
/**
 * @deprecated Use `useKakaoPostcodePopup` instead.
 */
const useDaumPostcodePopup = useKakaoPostcodePopup;
/**
 * @deprecated Use `KakaoPostcodeEmbedProps` instead.
 */
type DaumPostcodeEmbedProps = KakaoPostcodeEmbedProps;
/**
 * @deprecated Use `KakaoPostcodePopupParams` instead.
 */
type DaumPostcodePopupParams = KakaoPostcodePopupParams;

export { DaumPostcodeEmbed, useDaumPostcodePopup };
export type { DaumPostcodeEmbedProps, DaumPostcodePopupParams };
