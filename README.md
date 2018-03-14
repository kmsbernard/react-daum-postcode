# react-daum-postcode

리액트 컴포넌트로 만든 Daum 우편번호 검색 서비스입니다. Daum 우편번호 검색 서비스를 React환경에서 간편하게 이용할 수 있습니다.

## 설치

```shell
npm install --save react-daum-postcode
```

## 사용

```javascript
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

class Postcode extends React.Component {

  handleAddress = (data) => {
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

  render() {
    return (
      <DaumPostcode
        onComplete={this.handleAddress}
        ...props
      />
    );
  }
}
```

## props

- `onComplete` (필수) _[function]_ - 우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수입니다.
  - `function(data: object) => void` : 주소 데이터의 구성은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `width` _[number or string]_ - 컴포넌트의 가로 길이입니다. 300이하는 무시됩니다. 기본값: `'100%'`
- `height` _[number or string]_ - 컴포넌트의 세로 길이입니다. 400이하는 무시됩니다. 기본값: `400`
- `autoClose` _[bool]_ - 우편번호 검색이 끝났을 때 컴포넌트를 자동으로 닫습니다. 기본값: `false`
- `autoResize` _[bool]_ - 우편번호를 검색할 때 검색 결과에 따라 컴포넌트의 세로 길이를 자동으로 조절합니다. 기본값: `false`
- `animation` _[bool]_ - 우편번호를 검색할 때 애니메이션 효과를 줍니다. 기본값: `false`
- `defaultQuery` _[string]_ - 우편번호 검색창에 미리 표시할 검색어입니다. 기본값: `null`
- `theme` _[object]_ - Daum 우편번호 검색 모듈에 적용할 테마입니다. 테마의 설정은 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요. 기본값: `null`
- `style` _[object]_ - 우편번호 검색창을 감싸는 최상위 컴포넌트에 적용할 스타일입니다. 기본값: `null`
- `scriptUrl` _[string]_ - 컴포넌트에서 사용할 Daum 우편번호 스크립트 주소입니다. 기본값: `'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false'`
- `errorMessage` _[React element]_ - Daum 우편번호 스크립트가 로드되지 않을 때 나타낼 에러 메시지입니다. 기본값: `<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>`
- Daum 우편번호 생성자 속성들을 동일한 이름의 props로 전달할 수 있습니다. 속성값에 대해서는 [Daum 우편번호 서비스 가이드](http://postcode.map.daum.net/guide#attributes)를 참고해주세요.

## 안내

`react-daum-postcode`는 Daum 우편번호 서비스와 독립적으로 제작된 패키지입니다. React환경에서 발생하는 `react-daum-postcode`의 버그는 패키지 레포지터리의 [이슈트래커](https://github.com/kimminsik-bernard/react-daum-postcode/issues)에 말씀해주세요. 만약 Daum 우편번호 서비스 자체의 문제라고 생각하신다면, 다음 우편번호 서비스의 [FAQ](https://github.com/daumPostcode/QnA/blob/master/README.md)와 [이슈트래커](https://github.com/daumPostcode/QnA/issues)를 참조해주세요.