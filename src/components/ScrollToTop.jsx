// 라우트가 바뀔 때 스크롤을 맨 위로 복원.
// SPA에서는 페이지 전환 시 브라우저가 스크롤 위치를 유지하므로, pathname 변경 시 window.scrollTo(0, 0) 호출.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
