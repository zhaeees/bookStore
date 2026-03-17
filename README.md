## 북스토어 웹사이트

간단한 **온라인 서점 웹사이트**입니다.  
React + Vite로 만들었고, 실제 서비스처럼 보이도록 레이아웃/반응형/UI 흐름을 연습하면서 구현했습니다.  
프로젝트를 학습용으로 진행하는 **학습자 입장**에서, 구조와 의사결정을 정리했습니다.

---

## 1. 프로젝트 명칭 및 한 줄 정의

- **프로젝트명**: 북스토어 (Bookstore)
- **한 줄 정의**: 더미 도서 데이터를 기반으로, 홈/검색/상세/마이페이지 플로우를 연습하기 위한 리액트 온라인 서점 예제입니다.

---

## 2. 사용 기술 스택 (Tech Stack)

- **React** `^18.x`
- **Vite** `^5.x`
- **React Router** `^6.x`
- **react-icons** `^5.x`
- **swiper** `^11.x`
- **스타일**: 순수 CSS (reset / variables / global + 컴포넌트별 CSS)

※ 버전은 `package.json` 기준으로 작성했습니다.

---

## 3. 실행 방법 (Getting Started)

### 1-1. 의존성 설치

```bash
npm install
```

### 1-2. 개발 서버 실행

```bash
npm run dev
```


## 4. 아키텍처 설계도 (폴더 구조 기준)

```text
src/
  App.jsx               전체 앱 진입 컴포넌트 (MainLayout 사용)
  main.jsx              ReactDOM 렌더링 + 전역 스타일 import
  router/               라우터 설정 (경로와 페이지 매핑)

  components/           재사용 가능한 UI 컴포넌트 모음
    layout/             공통 레이아웃 관련
      Header.jsx        상단 헤더 (검색창, 네비게이션, 햄버거 메뉴)
      Footer.jsx        하단 푸터
      MainLayout.jsx    공통 레이아웃 (Header + Footer + Outlet)

    home/               홈 화면 전용 컴포넌트
      MainVisualSlider  메인 비주얼 슬라이더
      BannerGrid        상단 배너 3개 그리드
      BookSection       섹션 타이틀 + 내용 래퍼 (inner 적용)

    books/              도서 관련 공통 컴포넌트
      BookCard          단일 도서 카드 (이미지/제목/가격/버튼)
      BookList          BookCard 리스트 렌더링
      BookFilterBar     검색 페이지 상단 필터/정렬 바

  pages/                라우팅되는 페이지 컴포넌트
    Home/               메인 페이지
      HomePage.jsx      메인 비주얼 + 섹션(베스트/신간/특가/추천)
    Search/             검색/필터 페이지
      Search.jsx        쿼리/카테고리/정렬 조합으로 검색
    BookDetail/         도서 상세 페이지
      BookDetail.jsx    도서 상세 정보, 가격/찜/장바구니 버튼
    MyPage/             마이페이지 샘플
      MyPage.jsx        장바구니/찜/주문/내정보 탭
    NotFound/
      NotFound.jsx      404 페이지

  hooks/                커스텀 훅
    useBooks.js         책 데이터 로딩 + 검색/필터/단일 조회 로직

  context/              전역 상태 관리
    CartContext         장바구니 상태 및 add/remove 로직

  data/                 JSON 더미 데이터
    books.json          도서 목록 (id, 제목, 가격 등)
    categories.json     카테고리 목록 (필터용)
    slides.json         메인 슬라이더 데이터

  styles/               전역 스타일
    reset.css           기본 초기화 (margin/padding, box-sizing 등)
    variables.css       색상, 폰트, 여백 등 CSS 변수 정의
    global.css          공통 `.inner`, 버튼, 섹션 공통 스타일
```

---

## 5. 핵심 기능 (Key Features)

- **홈 화면**
  - 메인 비주얼 슬라이더(`MainVisualSlider`)로 프로모션 배너를 자동 슬라이드.
  - 베스트/신간/특가/추천 도서를 섹션별로 나누어 `BookSection + BookList` 조합으로 노출.

- **검색/필터**
  - `Search` 페이지에서 `q`(검색어), `category`, `filter`, `sort` 쿼리 파라미터를 사용해 필터링.
  - 상단 `BookFilterBar`에서 카테고리 버튼 + 오른쪽 정렬 셀렉트로 조건 변경.

- **도서 상세**
  - `BookDetail`에서 URL의 `:id`를 읽고, `useBooks.getBookById`로 단일 도서를 조회.
  - 가격/할인율/태그/평점/리뷰 수와 함께 장바구니/찜 버튼 제공.

- **마이페이지(샘플)**
  - 탭 UI로 장바구니/찜/주문내역/내정보를 전환.
  - 전역 장바구니(`CartContext`)와 연동해서, 담긴 도서 목록과 총 금액을 보여줌.

---

## 6. 주요 컴포넌트/페이지 역할 정리

### 4-1. 레이아웃 관련

- **`MainLayout.jsx`**
  - `Header` + `Outlet` + `Footer` 구조로 전체 페이지 공통 레이아웃을 담당합니다.
  - `main` 안쪽에 `.inner`를 한 번 더 감싸서, 모든 페이지 본문이 중앙 1200px 폭 안에 들어오도록 했습니다.

- **`Header.jsx`**
  - 상단 공지 배너, 로고, 검색창, 마이페이지/로그인, 네비게이션 메뉴로 구성되어 있습니다.
  - 모바일에서는 햄버거 버튼을 사용해 메뉴를 접었다 펼치는 방식으로 구현했습니다.
  - 네비게이션 메뉴(`nav-list`)도 `inner` 안에 있어서 다른 콘텐츠와 정렬이 맞습니다.

- **`Footer.jsx`**
  - 고객센터, 회사정보, 서비스, 소셜미디어 영역으로 나뉜 푸터입니다.
  - 전체 폭 가운데에 `.inner`를 사용해서 정렬합니다.

### 4-2. 홈 / 검색 / 상세 / 마이페이지

- **`HomePage.jsx`**
  - 상단 메인 비주얼 슬라이더(`MainVisualSlider`)
  - 이벤트/바로가기 배너 그리드(`BannerGrid`)
  - 오늘의 베스트/신간/특가/추천 도서를 각 `BookSection` + `BookList` 조합으로 보여줍니다.

- **`Search.jsx`**
  - URL 쿼리(`q`, `category`, `filter`, `sort`)를 읽어서 검색 조건을 구성합니다.
  - 상단에 `BookFilterBar`를 두고, 아래에 검색 결과 `BookList`를 렌더링합니다.
  - 오른쪽 정렬 셀렉트 박스로 최신순/평점순/가격순 정렬을 할 수 있습니다.

- **`BookDetail.jsx`**
  - `useParams`로 책 `id`를 받아와 `useBooks`의 `getBookById`로 단일 도서를 조회합니다.
  - 왼쪽에는 썸네일/배지, 오른쪽에는 도서 정보/가격/찜/장바구니 버튼을 배치했습니다.

- **`MyPage.jsx`**
  - 장바구니, 찜한 도서, 주문 내역, 내 정보 탭으로 구성된 마이페이지 샘플입니다.
  - 현재는 실제 주문/회원 시스템 연동 없이 UI와 상태 관리 연습용입니다.

---

## 7. 레이아웃/스타일 가이드 (inner, 반응형)

- **`.inner` (global.css)**
  - 최대 `1200px` 폭 + 양 옆 `16px` 패딩 + 중앙 정렬을 담당하는 공통 컨테이너입니다.
  - 헤더/푸터/페이지 본문/섹션 등 대부분의 영역이 이 클래스를 기준으로 정렬됩니다.

- **반응형 처리**
  - 헤더는 모바일에서 로고 + 마이페이지/로그인, 아래에 검색창, 그 아래에 햄버거 메뉴가 나오는 구조입니다.
  - `BookFilterBar`는 좁은 화면에서 두 줄 이상으로 자연스럽게 줄바꿈 되도록 `flex-wrap`을 사용했습니다.
  - 메인 비주얼(`MainVisualSlider`)은 전체 폭 슬라이더로, 안쪽 텍스트만 1200px 폭 안에 들어가도록 스타일을 조정했습니다.

---

## 8. 트러블슈팅 (Troubleshooting)

### 8-1. 모바일에서 검색 필터 영역 가로 스크롤 발생

- **문제**: `BookFilterBar`에서 카테고리 버튼과 정렬 셀렉트가 한 줄에 고정되면서, 작은 화면에서 가로 스크롤바가 생김.
- **해결**: 필터 영역 컨테이너에 `flex-wrap`을 허용해서, 작은 화면에서는 버튼들이 다음 줄로 자연스럽게 내려가도록 수정했습니다.

### 8-2. 모바일 헤더에서 메뉴와 액션 버튼 배치가 어색함

- **문제**: 헤더에서 로고/검색/마이페이지/로그인이 줄 바꿈되면서, 실제 쇼핑몰처럼 정돈되지 않은 느낌.
- **해결 방향**:
  - 모바일에서 `header-content`의 `order`를 조정해
    - 1) 로고
    - 2) 마이페이지/로그인
    - 3) 검색창
    순으로 배치.
  - 네비게이션은 `nav-toggle`(햄버거 버튼) + 펼쳐지는 `nav-list` 구조로 변경해서, 부트스트랩 네비게이션과 유사한 UX를 구현.

---

## 9. 기술적 의사결정 (Decision Log)

- **React + Vite 선택 이유**
  - CRA보다 Vite가 개발 서버 속도/경험이 좋아서 선택했습니다.

- **상태 관리: Context만 사용**
  - 규모가 크지 않아서 Redux 등은 도입하지 않고, 장바구니만 `CartContext`로 전역 관리했습니다.
  - 나머지는 각 페이지/컴포넌트의 로컬 상태(`useState`)로 충분하다고 판단했습니다.

- **스타일: CSS-in-JS 대신 순수 CSS**
  - Styled-Components, Emotion도 고려했지만, 우선은 **레이아웃/반응형/클래스 설계 연습**에 집중하고 싶어서 순수 CSS로 구현했습니다.

- **데이터: 실 DB 대신 JSON 파일**
  - 아직 백엔드가 없는 상태라, 프론트엔드에서만 빠르게 UI/UX를 구현하기 위해 `data/*.json`을 사용했습니다.
  - 나중에 API가 생기면 `useBooks` 내부 구현만 바꿔서 쉽게 교체할 수 있도록 의존성을 한 곳에 모았습니다.

---

## 10. 앞으로 개선하면 좋을 점 (TODO 아이디어)

- 실제 백엔드 API 연동 (현재는 JSON 더미 데이터 사용)
- 로그인/회원가입 기능 구현 및 마이페이지 연동
- 장바구니/주문 내역을 로컬스토리지 또는 서버에 저장
- 검색 결과/필터 상태를 URL과 더 강하게 동기화 (뒤로 가기 UX 개선)
- 다크 모드, 접근성(a11y) 관련 개선 (키보드 포커스, ARIA 속성 등)

학습자 입장에서 최대한 **폴더 구조와 역할이 바로 보이도록** 정리해 두었습니다.  
코드를 보실 때 위 구조를 같이 보시면 이해가 조금 더 빠를 것 같습니다.

