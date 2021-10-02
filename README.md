# react-daum-postcode

리액트 컴포넌트로 만든 Daum 우편번호 검색 서비스입니다. Daum 우편번호 검색 서비스를 React 환경에서 간편하게 이용할 수 있습니다.

## 설치

```shell
npm install --save react-daum-postcode
// or
yarn add react-daum-postcode
```

## 사용

```javascript
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = () => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }

  return (
    <DaumPostcode
      onComplete={handleComplete}
      { ...props }
    />
  );
}
```

## props

- `onComplete` _[function]_ - 우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수입니다.
  - `function(data: object) => void` : 주소 데이터의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `onSearch` _[function]_ - 주소를 검색할 경우에 실행되는 콜백함수입니다.
  - `function(data: object) => void` : 검색결과 정보의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `onClose` _[function]_ - 검색 결과를 선택하여, 우편번호 검색이 닫힐 때 실행되는 콜백함수입니다.
- `onResize` _[function]_ - 검색 결과로 인해, 우편번호 서비스의 화면 크기가 변경될 때 실행되는 콜백함수입니다.
- `className` _[string]_ - 우편번호 검색창을 감싸는 최상위 엘리먼트에 적용할 클래스명입니다.
- `style` _[object]_ - 우편번호 검색창을 감싸는 최상위 엘리먼트에 적용할 스타일입니다. 기본값: `{ width: 100%, height: 400 }`
- `scriptUrl` _[string]_ - 컴포넌트에서 사용할 Daum 우편번호 스크립트 주소입니다. 기본값: `'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'`
- `defaultQuery` _[string]_ - 우편번호 검색창에 기본으로 입력할 검색어입니다. 기본값 : `undefined`
- `autoClose` _[boolean]_ - 우편번호 검색 완료시, 자동 닫힘 여부입니다. 주소를 선택하면, 최상위 엘리먼트를 돔에서 제거합니다. 기본값: `true`
- `errorMessage` _[React element]_ - Daum 우편번호 스크립트가 로드되지 않을 때 나타낼 에러 메시지입니다. 기본값: `<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>`
- 기타 Daum 우편번호 생성자 속성들을 동일한 이름으로 props를 전달할 수 있습니다. 속성값에 대해서는 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide#attributes)를 참고해주세요.

## 안내

`react-daum-postcode`는 Daum 우편번호 서비스와 독립적으로 제작된 패키지입니다. React환경에서 발생하는 `react-daum-postcode`의 버그는 패키지 레포지터리의 [이슈트래커](https://github.com/kimminsik-bernard/react-daum-postcode/issues)에 말씀해주세요. 만약 Daum 우편번호 서비스 자체의 문제라고 생각하신다면, 다음 우편번호 서비스의 [FAQ](https://github.com/daumPostcode/QnA/blob/master/README.md)와 [이슈트래커](https://github.com/daumPostcode/QnA/issues)를 참조해주세요.