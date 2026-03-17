import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiBookOpen, FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  /** handleSearch: 검색 폼 제출 시 호출됨. 기본 submit 동작 막고, 검색어가 있으면 /search?q=검색어 로 이동 후 입력창 비움 */
// 검색 폼 제출 시 실행되는 함수
const handleSearch = (e) => {
  // 1. form 기본 동작 막기
  // form은 submit되면 페이지가 새로고침된다.
  // React SPA에서는 페이지가 새로고침되면 상태(state)가 초기화되기 때문에
  // 이를 막기 위해 preventDefault()를 사용한다.
  e.preventDefault();
  // 2. trim()을 사용하는 이유
  // 사용자가 공백만 입력하는 경우 검색이 의미가 없기 때문에
  // 앞뒤 공백을 제거해서 실제 검색어가 있는지 확인한다.
  const trimmedQuery = searchQuery.trim();
  // 3. 검색어가 있는 경우에만 검색 실행
  if (trimmedQuery) {
    // 4. encodeURIComponent 사용하는 이유
    // URL에는 사용할 수 없는 문자들이 있다.
    // 예: 공백, /, ?, 한글 등
    // 그래서 URL에서 안전하게 사용할 수 있도록 변환한다.
    const encodedQuery = encodeURIComponent(trimmedQuery);

    // 5. React Router를 이용한 페이지 이동
    // /search?q=검색어 형태로 이동한다.
    // q는 query parameter로 검색 페이지에서 이 값을 읽어서 검색을 수행한다.
    navigate(`/search?q=${encodedQuery}`);

    // 6. 검색 후 input 초기화
    // UX 측면에서 검색 후 입력창을 비우기 위해 사용
    setSearchQuery("");
  }
};

  return (
    <header className="header">
      <div className="header-top">
        <div className="inner">
          <div className="header-top-content">
            <button
              type="button"
              className="header-announcement"
              onClick={() => alert("회원가입 기능은 준비 중입니다.")}
            >
              <FiBookOpen /> 신규 회원 가입 시 10% 할인 쿠폰 지급!
            </button>
          </div>
        </div>
      </div>
      <div className="header-main">
        <div className="inner">
          <div className="header-content">
            <Link to="/" className="header-logo">
              <span className="logo-text">북스토어</span>
            </Link>

            <form className="header-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="도서명, 저자명으로 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FiSearch />
              </button>
            </form>

            <div className="header-actions">
              <Link to="/mypage" className="header-link">
                마이페이지
              </Link>
              <span className="header-divider">|</span>
              <button
                type="button"
                className="header-link header-link-button"
                onClick={() => alert("로그인 기능은 준비 중입니다.")}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <div className="inner header-nav-inner">
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setIsNavOpen((prev) => !prev)}
            aria-label={isNavOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isNavOpen ? <FiX /> : <FiMenu />}
          </button>
          <ul className={`nav-list ${isNavOpen ? "open" : ""}`}>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/search?filter=best">베스트</Link>
            </li>
            <li>
              <Link to="/search?filter=new">신간</Link>
            </li>
            <li>
              <Link to="/search">전체도서</Link>
            </li>
            <li>
              <Link to="/search?category=자기계발">자기계발</Link>
            </li>
            <li>
              <Link to="/search?category=경제/경영">경제/경영</Link>
            </li>
            <li>
              <Link to="/search?category=에세이">에세이</Link>
            </li>
            <li>
              <Link to="/search?category=문학">문학</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
