// useBooks 훅
// - books.json 더미 데이터를 기반으로, 여러 페이지에서 공통으로 사용할 "도서 관련 로직"을 모아둔 훅
// - 역할:
//   * 원본 books 목록 제공
//   * 파생 데이터(bestBooks, newBooks, discountBooks) 계산
//   * getBookById(id): 상세 페이지에서 id로 도서 하나 조회
//   * searchBooks(query, filters): 검색어 + 필터 + 정렬 조건을 조합해서 결과 리스트 반환
// - searchBooks 알고리즘 개요:
//   1) 전체 books를 복사해서 filtered에 담음
//   2) query(검색어)가 있으면 제목/저자/tags에 lowerCase 포함 여부로 필터링
//   3) category, filter(best/new/discount) 조건을 순차적으로 적용
//   4) sort 조건(price-asc/price-desc/rating/newest)에 따라 sort로 정렬
//   5) 최종 filtered 배열을 반환
import booksData from "../data/books.json";

export function useBooks() {
  const books = booksData;

  const bestBooks = books.filter((book) => book.isBest);
  const newBooks = books.filter((book) => book.isNew);
  const discountBooks = books.filter((book) => book.isDiscount);

  /** getBookById: id로 도서 하나를 찾아 반환. BookDetail 페이지에서 상세 정보 조회 시 사용 */
  const getBookById = (id) => {
    return books.find((book) => book.id === id);
  };

  /** searchBooks: 검색어(query)와 필터(category, filter, sort)를 적용해 필터링·정렬된 도서 배열 반환 */
  const searchBooks = (query, filters = {}) => {
    let filtered = [...books];

    // 검색어 필터
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // 카테고리 필터
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((book) => book.category === filters.category);
    }

    // 베스트셀러 필터
    if (filters.filter === "best") {
      filtered = filtered.filter((book) => book.isBest);
    }

    // 신간 필터
    if (filters.filter === "new") {
      filtered = filtered.filter((book) => book.isNew);
    }

    // 할인 필터
    if (filters.filter === "discount") {
      filtered = filtered.filter((book) => book.isDiscount);
    }

    // 정렬
    if (filters.sort === "price-asc") {
      filtered.sort((a, b) => a.salePrice - b.salePrice);
    } else if (filters.sort === "price-desc") {
      filtered.sort((a, b) => b.salePrice - a.salePrice);
    } else if (filters.sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    }

    return filtered;
  };

  return {
    books,
    bestBooks,
    newBooks,
    discountBooks,
    getBookById,
    searchBooks,
  };
}
