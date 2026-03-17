// Home 페이지
// - 전체 홈 화면을 구성하는 페이지 컴포넌트
// - 데이터: useBooks 훅으로부터 오늘의 베스트 / 신간 / 특가 / 전체 책 목록을 가져옴
// - 상태: favorites (찜한 도서 id 목록)을 로컬 상태로 관리
// - 장바구니: CartContext(useCart)에서 addToCart 함수를 받아서 여러 섹션에서 공통으로 사용
// - 흐름:
//   1) useBooks() 호출로 여러 종류의 책 리스트 준비
//   2) 각 BookSection 안에서 BookList를 렌더링하면서 onAddToCart, onToggleFavorite 같은 이벤트 핸들러 전달
//   3) BookCard에서 버튼 클릭 → 여기서 내려준 핸들러 호출 → 장바구니/찜 상태가 변경됨
import { useState } from "react";
import MainVisualSlider from "../../components/home/MainVisualSlider";
import BannerGrid from "../../components/home/BannerGrid";
import BookSection from "../../components/home/BookSection";
import BookList from "../../components/books/BookList";
import { useBooks } from "../../hooks/useBooks";
import { useCart } from "../../context/CartContext";
import "./HomePage.css";

function HomePage() {
  const { books, bestBooks, newBooks, discountBooks } = useBooks();
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);

  /** handleAddToCart: BookCard에서 "장바구니" 버튼 클릭 시 호출됨. 전역 장바구니(CartContext)에 book을 추가하고 알림 표시 */
  const handleAddToCart = (book) => {
    addToCart(book);
    alert(`${book.title}이(가) 장바구니에 추가되었습니다.`);
  };

  /** handleToggleFavorite: BookCard에서 "찜하기" 버튼 클릭 시 호출됨. favorites 배열에 bookId가 있으면 제거, 없으면 추가 (토글) */
  const handleToggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <div className="home-page">
      <MainVisualSlider />
      <BannerGrid />

      <BookSection title="오늘의 베스트셀러 TOP 10">
        <BookList
          books={bestBooks.slice(0, 10)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      </BookSection>

      <BookSection title="신간 도서">
        <BookList
          books={newBooks}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      </BookSection>

      <BookSection title="특가 도서">
        <BookList
          books={discountBooks}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      </BookSection>

      <BookSection title="추천 도서">
        <BookList
          books={books.slice(0, 8)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      </BookSection>
    </div>
  );
}

export default HomePage;
