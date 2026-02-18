import KakaoPostcodeEmbed from './KakaoPostcodeEmbed';
import useKakaoPostcodePopup from './useKakaoPostcodePopup';
import loadPostcode from './loadPostcode';

export { loadPostcode, KakaoPostcodeEmbed, useKakaoPostcodePopup };
export default KakaoPostcodeEmbed;

import type { KakaoPostcodeEmbedProps } from './KakaoPostcodeEmbed';
import type { KakaoPostcodePopupParams } from './useKakaoPostcodePopup';
import type { Address, Search, State } from './loadPostcode';

export type { KakaoPostcodeEmbedProps, KakaoPostcodePopupParams, Address, Search, State };
