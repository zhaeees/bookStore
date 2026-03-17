import { Link } from "react-router-dom";
import { FiStar, FiShoppingCart, FiHeart } from "react-icons/fi";
import "./BookCard.css";

function BookCard({ book, onAddToCart, onToggleFavorite }) {
  /** discountRate: 정가와 할인가 차이로 할인율(%) 계산. 배지 표시용 */
  const discountRate =
    book.price !== book.salePrice
      ? Math.round(((book.price - book.salePrice) / book.price) * 100)
      : 0;

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`} className="book-card-link">
        <div className="book-card-image-wrapper">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="book-card-image"
          />
          <div className="book-badge-group">
            {book.isNew && <span className="book-badge new">신간</span>}
            {book.isBest && <span className="book-badge best">베스트</span>}
            {book.isDiscount && (
              <span className="book-badge discount">-{discountRate}%</span>
            )}
          </div>
        </div>
        <div className="book-card-content">
          <h3 className="book-card-title">{book.title}</h3>
          <p className="book-card-author">{book.author}</p>
          <div className="book-card-rating">
            <FiStar className="star-icon filled" />
            <span>{book.rating}</span>
            <span className="review-count">({book.reviewCount})</span>
          </div>
          <div className="book-card-price">
            {book.price !== book.salePrice && (
              <span className="original-price">{book.price.toLocaleString()}원</span>
            )}
            <span className="sale-price">{book.salePrice.toLocaleString()}원</span>
          </div>
        </div>
      </Link>
      <div className="book-card-actions">
        <button
          className="action-button"
          onClick={() => onAddToCart && onAddToCart(book)}
          aria-label="장바구니에 추가"
        >
          <FiShoppingCart />
        </button>
        <button
          className="action-button"
          onClick={() => onToggleFavorite && onToggleFavorite(book.id)}
          aria-label="찜하기"
        >
          <FiHeart />
        </button>
      </div>
    </div>
  );
}

export default BookCard;
