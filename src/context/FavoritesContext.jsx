// FavoritesContext
// - 전역 찜한 도서 상태를 관리하기 위한 React Context
// - 역할:
//   * favorites: 찜한 도서 id 배열 (모든 페이지에서 공유)
//   * toggleFavorite(bookId): 있으면 제거, 없으면 추가. 추가 시 "마이페이지 찜한도서에서 확인하세요." 경고
// - 사용: FavoritesProvider로 앱을 감싼 뒤, useFavorites()로 favorites와 toggleFavorite 사용
import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (bookId) => {
    setFavorites((prev) => {
      const isAdding = !prev.includes(bookId);
      const next = isAdding
        ? [...prev, bookId]
        : prev.filter((id) => id !== bookId);
      if (isAdding) {
        setTimeout(() => {
          alert("마이페이지 찜한도서에서 확인하세요.");
        }, 0);
      }
      return next;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
