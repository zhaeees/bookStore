// AppRouter
// - 전체 앱의 라우팅 구조를 정의하는 컴포넌트
// - BrowserRouter: 브라우저 주소(URL)와 React 컴포넌트를 연결해 주는 최상위 라우터
// - CartProvider: 라우트 전체를 감싸서, 하위 모든 페이지에서 장바구니 Context를 사용할 수 있게 함
// - Routes / Route:
//   * element={<App />}: 공통 레이아웃(MainLayout + Outlet)을 쓰는 루트
//   * index: 레이아웃의 기본(메인) 페이지. path="/"일 때 Outlet에 HomePage가 렌더됨
//   * path별로 BookDetail, Search, MyPage, NotFound 매핑
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import BookDetail from "../pages/BookDetail/BookDetail";
import Search from "../pages/Search/Search";
import MyPage from "../pages/MyPage/MyPage";
import NotFound from "../pages/NotFound/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <Routes>
          <Route element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
