# react-daum-postcode

리액트 컴포넌트로 만든 다음 우편번호 검색 서비스입니다.

## 설치

```shell
npm install --save react-daum-postcode
```

## 사용

이 컴포넌트는 전역적으로 접근 가능한 `daum` 객체에 의존합니다. 사용하고자 하는 페이지에 아래 `<script>`코드를 삽입해주세요. `autoload=false`로 스크립트를 동적으로 불러올 수 있습니다.
```html
<!-- http 환경 -->
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false"></script> 

<!-- https 환경 -->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>
```

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
  - `function(data: object) => void` : 주소 데이터의 내용은 [다음 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요.
- `width` _[number or string]_ - 컴포넌트의 가로 길이입니다. 300이하는 무시됩니다. 기본값: '100%'
- `height` _[number or string]_ - 컴포넌트의 세로 길이입니다. 400이하는 무시됩니다. 기본값: 400
- `autoClose` _[bool]_ - 우편번호 검색이 끝났을 때 컴포넌트를 자동으로 닫습니다. 기본값: false
- `autoResize` _[bool]_ - 우편번호를 검색할 때 검색 결과에 따라 컴포넌트의 세로 길이를 자동으로 조절합니다. 기본값: false
- `animation` _[bool]_ - 우편번호를 검색할 때 애니메이션 효과를 줍니다. 기본값: false
- `defaultQuery` _[string]_ - 우편번호 검색창에 미리 표시할 검색어입니다. 기본값: null
- `theme` _[object]_ - 다음 우편번호 검색 모듈에 적용할 테마입니다. 테마의 설정은 [다음 우편번호 서비스 가이드](http://postcode.map.daum.net/guide)를 참고해주세요. 기본값: null
- `style` _[object]_ - 우편번호 검색창을 감싸는 최상위 컴포넌트에 적용할 스타일입니다. 기본값: null
