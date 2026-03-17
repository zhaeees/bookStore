import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">고객센터</h3>
            <ul className="footer-links">
              <li>
                <a href="tel:1588-0000">1588-0000</a>
              </li>
              <li>평일 09:00 ~ 18:00</li>
              <li>주말 및 공휴일 휴무</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">회사정보</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">회사소개</Link>
              </li>
              <li>
                <Link to="/">이용약관</Link>
              </li>
              <li>
                <Link to="/">개인정보처리방침</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">서비스</h3>
            <ul className="footer-links">
              <li>
                <Link to="/search">도서 검색</Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/">이벤트</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">소셜미디어</h3>
            <ul className="footer-links">
              <li>인스타그램</li>
              <li>페이스북</li>
              <li>유튜브</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 온라인 서점. All rights reserved.
          </p>
          <p className="footer-address">
            주소: 서울특별시 강남구 테헤란로 123 | 사업자등록번호: 123-45-67890
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
