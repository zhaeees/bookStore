import BookCard from "./BookCard";
import "./BookList.css";

/** BookList: books 배열을 받아 각각 BookCard로 렌더링. onAddToCart, onToggleFavorite를 각 카드에 전달 */
function BookList({ books, onAddToCart, onToggleFavorite, layout = "grid" }) {
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
        />
      ))}
    </div>
  );
}

export default BookList;
