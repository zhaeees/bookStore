import BookCard from "./BookCard";
import "./BookList.css";

/** BookList: books 배열을 받아 각각 BookCard로 렌더링. favoriteIds로 찜 여부 전달해 하트/배경 스타일 적용 */
function BookList({ books, onAddToCart, onToggleFavorite, favoriteIds = [], layout = "grid" }) {
  if (!books || books.length === 0) {
    return (
      <div className="book-list-empty">
        <p>도서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`book-list book-list-${layout}`}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteIds.includes(book.id)}
        />
      ))}
    </div>
  );
}

export default BookList;
