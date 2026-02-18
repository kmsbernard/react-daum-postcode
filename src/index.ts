import DaumPostcodeEmbed from './DaumPostcodeEmbed';
import useDaumPostcodePopup from './useDaumPostcodePopup';
import loadPostcode from './loadPostcode';

export { loadPostcode, DaumPostcodeEmbed, useDaumPostcodePopup };
export default DaumPostcodeEmbed;

import type { DaumPostcodeEmbedProps } from './DaumPostcodeEmbed';
import type { DaumPostcodePopupParams } from './useDaumPostcodePopup';
import type { Address, Search, State } from './loadPostcode';

export type { DaumPostcodeEmbedProps, DaumPostcodePopupParams, Address, Search, State };
