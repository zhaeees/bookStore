// Search 페이지
// - URL 쿼리(q, category, filter, sort)를 기반으로 도서 목록을 검색/필터링하는 페이지
// - 데이터: useBooks 훅의 searchBooks(query, filters)를 사용해 필터링된 books 배열을 얻음
// - 상태:
//   * favorites: 현재 검색 결과에서 사용자가 찜한 도서 id 목록
//   * filters: 카테고리/필터(베스트, 신간, 할인)/정렬 정보
// - 알고리즘/흐름:
//   1) URL 쿼리에서 초기 query, category, filter 값을 읽어 filters 상태 초기화
//   2) filters 또는 query가 바뀔 때마다 searchBooks를 호출해서 filteredBooks를 계산
//   3) BookFilterBar에서 onFilterChange로 새로운 filters를 올려주면,
//      - filters 상태 업데이트
//      - URLSearchParams를 다시 만들어서 쿼리스트링 동기화(새로고침/공유해도 같은 결과 유지)
//   4) BookList는 props로 받은 books와 onAddToCart, onToggleFavorite 핸들러만 사용해서 렌더링
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookFilterBar from "../../components/books/BookFilterBar";
import BookList from "../../components/books/BookList";
import BookSection from "../../components/home/BookSection";
import { useBooks } from "../../hooks/useBooks";
import { useCart } from "../../context/CartContext";
import "./Search.css";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchBooks } = useBooks();
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const filter = searchParams.get("filter") || "";

  const [filters, setFilters] = useState({
    category: category,
    filter: filter,
    sort: "",
  });

  /** useEffect: URL의 category, filter가 바뀌면 filters 상태를 동기화. sort는 유지 */
  useEffect(() => {
    setFilters({
      category: category,
      filter: filter,
      sort: filters.sort,
    });
  }, [category, filter]);

  const filteredBooks = searchBooks(query, filters);

  /** handleFilterChange: BookFilterBar에서 카테고리/정렬 변경 시 호출됨. filters 상태 업데이트 + URL 쿼리스트링 동기화 */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (newFilters.category && newFilters.category !== "all")
      params.set("category", newFilters.category);
    if (newFilters.filter) params.set("filter", newFilters.filter);
    if (newFilters.sort) params.set("sort", newFilters.sort);
    setSearchParams(params);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    alert(`${book.title}이(가) 장바구니에 추가되었습니다.`);
  };

  /** handleToggleFavorite: BookCard에서 "찜하기" 버튼 클릭 시 호출됨. favorites에 bookId가 있으면 제거, 없으면 추가 */
  const handleToggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <div className="search-page">
      <BookSection
        title={query ? `"${query}" 검색 결과` : "전체 도서"}
        subtitle={`총 ${filteredBooks.length}권의 도서가 있습니다.`}
      >
        <BookFilterBar filters={filters} onFilterChange={handleFilterChange} />
        <BookList
          books={filteredBooks}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      </BookSection>
    </div>
  );
}

export default Search;
