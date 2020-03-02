### > 1.8.3
[Github 레포지터리의 릴리즈 기록을 참고해주세요](https://github.com/bernard-kms/react-daum-postcode/releases)

### 1.8.2
- 검색결과 TypeScript 타입에 `noSelected` 인자 추가

### 1.8.1
- TypeScript 타입선언 업데이트

### 1.8.0
- 구 우편번호를 검색 결과에서 제외하는 `zonecodeOnly` props 추가

### 1.7.1
- Daum Postcode 커스텀 props가 DOM으로 주입되는 문제 해결

### 1.7.0
- React 버전을 16.4로 올림
- TypeScript 타입선언 파일을 추가
  - `DaumPostcode`컴포넌트 타입
  - 컴포넌트의 props인 `DaumPostcodeProps` 타입
  - _onComplete_ props의 인자로 쓰이는 `AddressData` 타입

### 1.6.0
- React 버전을 16.3 으로 올림
- `alwaysShowEngAddr`, `submitMode`, `useSuggest` 생성자 속성을 추가

### 1.5.0
- Daum 우편번호 스크립트가 로드되지 않을때, 오류 메시지를 표시
- 패키지 라이브러리를 빌드할 때 minify 적용

### 1.4.2
- 다음 우편주소 검색창이 여러번 반복해서 열릴수 있도록 함

### 1.4.1
- 다음 우편주소 스크립트를 중복으로 생성하지 않도록 함 ([@ignocide](https://github.com/ignocide) in [#3](https://github.com/kimminsik-bernard/react-daum-postcode/pull/3))
- React 버전을 16.2.0으로 올림

### 1.4.0

- 다음 우편번호 생성자가 받을수 있는 모든 속성을 props를 통해 전달
- React 버전을 16.0.0으로 올림

### 1.3.0

- 다음 우편번호 스크립트를 자체적으로 로드
- README 수정

### 1.2.1

- 에러 핸들링 개선
- README 수정

### 1.2.0

- React 버전을 15.5.0으로 올림
- prop-types 패키지 사용

### 1.1.0

- 다음 우편번호 스크립트를 동적으로 로딩

### 1.0.1

- 문서 수정
- eslint 설정

### 1.0.0

- 최초 배포
