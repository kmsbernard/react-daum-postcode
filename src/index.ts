import KakaoPostcodeEmbed from './KakaoPostcodeEmbed';
import useDaumPostcodePopup from './useDaumPostcodePopup';
import loadPostcode from './loadPostcode';

export { loadPostcode, KakaoPostcodeEmbed, useDaumPostcodePopup };
export default KakaoPostcodeEmbed;

import type { KakaoPostcodeEmbedProps } from './KakaoPostcodeEmbed';
import type { DaumPostcodePopupParams } from './useDaumPostcodePopup';
import type { Address, Search, State } from './loadPostcode';

export type { KakaoPostcodeEmbedProps, DaumPostcodePopupParams, Address, Search, State };
