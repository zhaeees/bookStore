// CartContext
// - 전역 장바구니 상태를 관리하기 위한 React Context
// - 역할:
//   * cart: 모든 페이지에서 공유하는 장바구니 배열 (book 객체 리스트)
//   * addToCart(book): 기존 cart 뒤에 book을 추가
//   * removeFromCart(bookId): 해당 id와 일치하지 않는 book만 남기도록 필터링
// - 사용 방법:
//   1) AppRouter에서 <CartProvider>로 전체 앱을 감쌈
//   2) Home / Search / BookDetail / MyPage 등에서 useCart()로 cart와 함수를 꺼내 씀
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /** addToCart: 장바구니에 book 객체를 추가. setCart로 기존 배열 뒤에 새 book을 붙임 */
  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
  };

  /** removeFromCart: bookId와 일치하는 도서를 장바구니에서 제거. filter로 해당 id를 가진 항목만 제외 */
  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((book) => book.id !== bookId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

/** useCart: CartContext에서 cart, addToCart, removeFromCart를 꺼내 쓰는 훅. CartProvider 밖에서 호출 시 에러 발생 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
