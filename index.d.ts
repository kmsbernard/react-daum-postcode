declare module "react-daum-postcode" {
  import * as React from "react";

  type AddressData = {
    zonecode: string;
    address: string;
    addressEnglish: string;
    addressType: "R" | "J";
    userSelectedType: "R" | "J";
    userLanguageType: "K" | "E";
    roadAddress: string;
    jibunAddress: string;
    jibunAddressEnglish: string;
    autoRoadAddress: string;
    autoRoadAddressEnglish: string;
    autoJibunAddress: string;
    autoJibunAddressEnglish: string;
    buildingCode: string;
    buildingName: string;
    apartment: "Y" | "N"
    sido: string;
    sigungu: string;
    sigunguCode: string;
    roadnameCode: string;
    bcode: string;
    roadname: string;
    bname: string;
    bname1: string;
    bname2: string;
    hname: string;
    query: string;
    postcode: string;
    postcode1: string;
    postcode2: string;
    postcodeSeq: string;
    noSelected: "Y" | "N";
  }

  type DaumPostcodeProps = {
    onComplete(data: AddressData): void;
    alwaysShowEngAddr?: boolean;
    animation?: boolean;
    autoClose?: boolean;
    autoMapping?: boolean;
    autoResize?: boolean;
    defaultQuery?: string;
    errorMessage?: React.ReactElement<any>
    height?: number | string;
    hideEngBtn?: boolean;
    hideMapBtn?: boolean;
    maxSuggestItems?: number;
    pleaseReadGuide?: number;
    pleaseReadGuideTimer?: number;
    scriptUrl?: string;
    shorthand?: boolean;
    showMoreHName?: boolean;
    style?: object;
    theme?: object;
    useSuggest?: boolean;
    width?: number | string;
    zonecodeOnly?: boolean;
  }

  class DaumPostcode extends React.Component<DaumPostcodeProps, any> {}

  export { AddressData, DaumPostcodeProps, DaumPostcode };

  export default DaumPostcode;
}