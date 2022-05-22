import DaumPostcodeEmbed, { DaumPostcodeEmbedProps, DaumPostcodeProps } from './DaumPostcodeEmbed';
import useDaumPostcodePopup, { PopupOptions } from './useDaumPostcodePopup';
import loadPostcode, { Address, Search, State } from './loadPostcode';

export type { DaumPostcodeEmbedProps, DaumPostcodeProps, PopupOptions, Address, Search, State };
export { loadPostcode, DaumPostcodeEmbed, useDaumPostcodePopup };
export default DaumPostcodeEmbed;
