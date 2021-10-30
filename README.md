# react-daum-postcode

Daum 우편번호 검색 서비스를 React 환경에서 간편하게 이용할 수 있습니다.

## Install

```shell
npm install --save react-daum-postcode
// or
yarn add react-daum-postcode
```

## Embed

`DaumPostcodeEmbed` 컴포넌트를 사용하여, 우편번호 검색 서비스를 embed 방식으로 사용할 수 있습니다.

```javascript
import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

const Postcode = () => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return <DaumPostcodeEmbed onComplete={handleComplete} {...props} />;
};
```

`DaumPostcodeEmbe` 컴포넌트는 다음 우편번호 서비스의 생성자 및 임베드 설정값 등을 `props`로 전달할 수 있습니다. 전달하지 않은 설정값은 다음 우편번호 서비스의 기본 설정을 따라갑니다.

- `scriptUrl` _[string]_ - Daum 우편번호 스크립트 주소입니다. 기본값: `'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'`
- `onComplete` _[function]_ - 우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수입니다.
  - `function(data: object) => void` : 주소 데이터의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `onSearch` _[function]_ - 주소를 검색할 경우에 실행되는 콜백함수입니다.
  - `function(data: object) => void` : 검색결과 정보의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `onClose` _[function]_ - 검색 결과를 선택하여, 우편번호 검색이 닫힐 때 실행되는 콜백함수입니다.
- `onResize` _[function]_ - 검색 결과로 인해, 우편번호 서비스의 화면 크기가 변경될 때 실행되는 콜백함수입니다.
- `className` _[string]_ - 우편번호 검색창을 감싸는 최상위 엘리먼트에 적용할 클래스명입니다.
- `style` _[object]_ - 우편번호 검색창을 감싸는 최상위 엘리먼트에 적용할 스타일입니다. 기본값: `{ width: 100%, height: 400 }`
- `defaultQuery` _[string]_ - 우편번호 검색창에 기본으로 입력할 검색어입니다. 기본값 : `undefined`
- `autoClose` _[boolean]_ - 우편번호 검색 완료시, 자동 닫힘 여부입니다. 주소를 선택하면, 최상위 엘리먼트를 돔에서 제거합니다. 기본값: `true`
- `errorMessage` _[React element]_ - Daum 우편번호 스크립트가 로드되지 않을 때 나타낼 에러 메시지입니다. 기본값: `<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>`
- 기타 Daum 우편번호 생성자 속성들을 동일한 이름으로 props를 전달할 수 있습니다. 속성값에 대해서는 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide#attributes)를 참고해주세요.

## Popup

`useDaumPostcodePopup` hook 을 사용하여, 반환받은 함수를 통해 우편번호 검색 서비스를 팝업 방식으로 이용할 수 있습니다.

```javascript
import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = () => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type='button' onClick={handleClick}>
      Open
    </button>
  );
};
```

`useDaumPostcodePopup` 은 처음 우편번호 서비스의 스크립트 주소를 받습니다. 반환한 함수를 실행할 때 다음 우편번호 서비스의 생성자 및 팝업 설정값을 전달할 수 있습니다. 전달하지 않은 설정값은 다음 우편번호 서비스의 기본 설정을 따라갑니다.

- `scriptUrl` _[string]_ - Daum 우편번호 스크립트 주소입니다. 기본값: `'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'`
- `onComplete` _[function]_ - 우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수입니다.
  - `function(data: object) => void` : 주소 데이터의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `onSearch` _[function]_ - 주소를 검색할 경우에 실행되는 콜백함수입니다.
  - `function(data: object) => void` : 검색결과 정보의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `onClose` _[function]_ - 검색 결과를 선택하여, 우편번호 검색이 닫힐 때 실행되는 콜백함수입니다.
- `onResize` _[function]_ - 검색 결과로 인해, 우편번호 서비스의 화면 크기가 변경될 때 실행되는 콜백함수입니다.
- `width` _[string|number]_ - 우편번호 검색창의 가로 너비 입니다. 기본값 : `undefined`
- `height` _[string|number]_ - 우편번호 검색창의 세로 높이 입니다. 기본값 : `undefined`
- `defaultQuery` _[string]_ - 우편번호 검색창에 기본으로 입력할 검색어입니다. 기본값 : `undefined`
- `top` _[string|number]_ - 팝업의 Y 위치를 나타내는 값입니다. 기본값 : `undefined`
- `left` _[string|number]_ - 팝업의 X 위치를 나타내는 값입니다. 기본값 : `undefined`
- `popupTitle` _[string]_ - 팝업창의 상태표시줄에 나오는 Title 값을 지정할 수 있습니다. 전달하지 않을 경우, 다음 우편번호의 기본 설정인 `Daum Postcode Service`가 출력됩니다. 기본값 : `undefined`
- `popupKey` _[string]_ - 팝업창의 key 입니다. 전달하지 않을 경우, `_blank` 가 지정되어 매번 새창이 열리게 됩니다. 기본값 : `undefined`
- `autoClose` _[boolean]_ - 우편번호 검색 완료시 자동 닫힘 여부입니다. 주소를 선택하면 팝업창이 닫힙니다. 기본값: `true`
- 기타 Daum 우편번호 생성자 속성들을 동일한 이름으로 props를 전달할 수 있습니다. 속성값에 대해서는 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide#attributes)를 참고해주세요.

## 안내

`react-daum-postcode`는 Daum 우편번호 서비스와 독립적으로 제작된 패키지입니다. React환경에서 발생하는 `react-daum-postcode`의 버그는 패키지 레포지터리의 [이슈트래커](https://github.com/kimminsik-bernard/react-daum-postcode/issues)에 말씀해주세요. 만약 Daum 우편번호 서비스 자체의 문제라고 생각하신다면, 다음 우편번호 서비스의 [FAQ](https://github.com/daumPostcode/QnA/blob/master/README.md)와 [이슈트래커](https://github.com/daumPostcode/QnA/issues)를 참조해주세요.
