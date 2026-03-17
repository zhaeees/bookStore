// BookDetail 페이지
// - URL 파라미터로 받은 책 id에 해당하는 도서의 상세 정보를 보여주는 페이지
// - 데이터 흐름:
//   1) useParams로 URL에서 id를 가져옴
//   2) useBooks의 getBookById(id)로 해당 도서를 조회해서 book 상태에 저장
//   3) book 정보(제목, 저자, 출판사, 태그, 가격, 평점 등)를 우측 정보 영역에 표시
// - 상태:
//   * book: 현재 상세 조회 중인 도서 객체
//   * favorites: 이 페이지에서만 사용하는 찜 상태(id 배열) → 버튼 토글용
// - 장바구니/찜 알고리즘:
//   * handleAddToCart: CartContext의 addToCart(book)를 호출해 전역 장바구니에 추가
//   * handleToggleFavorite: favorites 배열에 book.id가 있으면 제거, 없으면 추가
// - 레이아웃:
//   * 왼쪽: 썸네일 + 배지(신간/베스트/할인)
//   * 오른쪽: 메타 정보, 가격, 액션 버튼(장바구니/찜)
//   * 아래: 도서 소개/추천 도서 섹션
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiStar, FiShoppingCart, FiHeart, FiArrowLeft } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useBooks } from "../../hooks/useBooks";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById } = useBooks();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [book, setBook] = useState(null);

  /** useEffect: URL의 id가 바뀔 때마다 getBookById로 해당 도서를 조회해 book 상태에 저장 */
  useEffect(() => {
    const foundBook = getBookById(id);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [id, getBookById]);

  if (!book) {
    return (
      <div className="book-detail-page">
        <div className="inner">
          <div className="book-not-found">
            <p>도서를 찾을 수 없습니다.</p>
            <Link to="/" className="btn btn-primary">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountRate =
    book.price !== book.salePrice
      ? Math.round(((book.price - book.salePrice) / book.price) * 100)
      : 0;

  const isFavorite = favorites.includes(book.id);

  const handleAddToCart = () => {
    addToCart(book);
    alert(`${book.title}이(가) 장바구니에 추가되었습니다.`);
  };

  /** handleToggleFavorite: "찜하기" 버튼 클릭 시 호출됨. 전역 찜 상태 토글 (추가 시 마이페이지 안내 경고) */
  const handleToggleFavorite = () => {
    toggleFavorite(book.id);
  };

  return (
    <div className="book-detail-page">
      <div className="inner">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          뒤로가기
        </button>

        <div className="book-detail-content">
          <div className="book-detail-image">
            <img src={book.thumbnail} alt={book.title} />
            {book.isNew && <span className="book-badge new">신간</span>}
            {book.isBest && <span className="book-badge best">베스트</span>}
            {book.isDiscount && (
              <span className="book-badge discount">-{discountRate}%</span>
            )}
          </div>

          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">저자: {book.author}</p>
            <p className="book-detail-publisher">출판사: {book.publisher}</p>
            <p className="book-detail-published">
              출간일: {book.publishedAt}
            </p>
            <p className="book-detail-pages">페이지: {book.pages}쪽</p>

            <div className="book-detail-rating">
              <FiStar className="star-icon filled" />
              <span className="rating-value">{book.rating}</span>
              <span className="review-count">({book.reviewCount}개 리뷰)</span>
            </div>

            <div className="book-detail-tags">
              {book.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="book-detail-price-section">
              {book.price !== book.salePrice && (
                <span className="original-price">
                  {book.price.toLocaleString()}원
                </span>
              )}
              <span className="sale-price">
                {book.salePrice.toLocaleString()}원
              </span>
              {discountRate > 0 && (
                <span className="discount-rate">{discountRate}% 할인</span>
              )}
            </div>

            <div className="book-detail-actions">
              <button
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
              >
                <FiShoppingCart />
                장바구니에 담기
              </button>
              <button
                className={`btn btn-outline btn-large ${
                  isFavorite ? "favorite-active" : ""
                }`}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? <FaHeart /> : <FiHeart />}
                {isFavorite ? "찜한 도서" : "찜하기"}
              </button>
            </div>
          </div>
        </div>

        <div className="book-detail-description">
          <h2>도서 소개</h2>
          <p>{book.description}</p>
        </div>

        <div className="book-detail-related">
          <h2>이 책과 함께 보면 좋은 도서</h2>
          <p className="related-note">
            같은 카테고리의 다른 도서들을 추천해드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
