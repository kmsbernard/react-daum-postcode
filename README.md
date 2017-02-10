# react-daum-postcode

리액트 컴포넌트로 만든 다음 우편번호 검색 서비스입니다.

## 설치

```shell
npm install --save react-daum-postcode
```

## 사용

이 컴포넌트는 전역적으로 접근 가능한 `daum` 객체에 의존합니다.
```html
<!-- http 환경 -->
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script> 

<!-- https 환경 -->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
```

```javascript
import React from 'react';
import DaumPostcode from 'react-daum-postcode';

class Postcode extends React.Component {

  handleAddress = (data) => {
    // do something..
  }

  render() {
    return (
      <DaumPostcode
        onComplete={this.handleAdrress}
        ...props
      />
    );
  }
}
```

## props

- `onComplete` (필수) _[function]_ - 우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수입니다.
  - `function(addressData: object) => void` : 주소 데이터의 내용은 [다음 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `width` _[number or string]_ - 컴포넌트의 가로 길이입니다. 기본값: '100%'
- `height` _[number or string]_ - 컴포넌트의 세로 길이입니다. 기본값: 400
- `autoClose` _[bool]_ - 우편번호 검색이 끝났을 때 컴포넌트를 자동으로 닫을지 여부입니다. 기본값: false
- `autoResize` _[bool]_ - 우편번호를 검색할 때 검색 결과에 따라 컴포넌트의 세로 길이를 자동으로 조절할지 여부입니다. 기본값: false
- `animation` _[bool]_ - 우편번호를 검색할때 애니메이션 효과를 줄 지 여부입니다. 기본값: false
- `defaultQuery` _[string]_ - 우편번호 검색창에 미리 표시할 검색어입니다. 기본값: null
- `theme` _[object]_ - 다음 우편번호 검색 모듈에 적용할 테마입니다. 기본값: null
- `style` _[object]_ - 최상위 컴포넌트에 적용할 스타일입니다. 기본값: null
