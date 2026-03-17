import { Link } from "react-router-dom";
import "./NotFound.css";

/** NotFound 페이지: 정의되지 않은 URL(path)로 접속했을 때 보여주는 404 페이지 */
function NotFound() {
  return (
    <div className="not-found-page">
      <div className="inner">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <p className="not-found-message">페이지를 찾을 수 없습니다.</p>
          <p className="not-found-desc">
            요청하신 주소가 잘못되었거나 페이지가 삭제·이동되었을 수 있습니다.
          </p>
          <Link to="/" className="btn btn-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
