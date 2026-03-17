// MyPage 페이지
// - 마이페이지(장바구니, 찜한 도서, 주문 내역, 내 정보)를 탭 형태로 보여주는 페이지
// - 데이터:
//   * useBooks: 전체 books 목록을 가져와 favorites와 조합해서 찜한 도서 리스트 계산
//   * useCart: 전역 장바구니(cart)와 removeFromCart 함수를 사용
// - 상태:
//   * activeTab: 현재 선택된 탭 id ("cart" | "favorites" | "orders" | "profile")
//   * favorites: 찜한 도서 id 목록
//   * orders: 주문 내역 리스트(샘플용 더미 데이터 자리)
// - 알고리즘/흐름:
//   1) favoriteBooks = books.filter(...) 로 찜한 도서 목록 계산
//   2) renderTabContent()에서 activeTab에 따라 서로 다른 UI를 반환 (switch문)
//   3) 장바구니 탭:
//      - cart 배열의 길이/총 금액을 reduce로 계산해서 요약 표시
//      - BookList에 cart를 넘겨 실제 책 목록을 렌더링
//   4) 각 탭 버튼 클릭 시 setActiveTab으로 탭 전환
import { useState } from "react";
import { FiUser, FiShoppingCart, FiHeart, FiPackage } from "react-icons/fi";
import BookList from "../../components/books/BookList";
import BookSection from "../../components/home/BookSection";
import { useBooks } from "../../hooks/useBooks";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./MyPage.css";

function MyPage() {
  const [activeTab, setActiveTab] = useState("cart");
  const { books } = useBooks();
  const { cart, removeFromCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [orders, setOrders] = useState([]);

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  const tabs = [
    { id: "cart", label: "장바구니", icon: <FiShoppingCart /> },
    { id: "favorites", label: "찜한 도서", icon: <FiHeart /> },
    { id: "orders", label: "주문 내역", icon: <FiPackage /> },
    { id: "profile", label: "내 정보", icon: <FiUser /> },
  ];

  /** handleRemoveFromCart: 장바구니 탭에서 특정 도서를 장바구니에서 제거할 때 호출됨. CartContext의 removeFromCart 사용 */
  const handleRemoveFromCart = (bookId) => {
    removeFromCart(bookId);
  };

  const handleToggleFavorite = (bookId) => {
    toggleFavorite(bookId);
  };

  /** renderTabContent: activeTab 값에 따라 장바구니/찜한도서/주문내역/내정보 중 해당 탭의 UI를 반환하는 함수 */
  const renderTabContent = () => {
    switch (activeTab) {
      case "cart":
        return (
          <div className="tab-content">
            {cart.length === 0 ? (
              <div className="empty-state">
                <FiShoppingCart className="empty-icon" />
                <p>장바구니가 비어있습니다.</p>
              </div>
            ) : (
              <>
                <div className="cart-summary">
                  <h3>총 {cart.length}권의 도서</h3>
                  <p className="total-price">
                    총 금액:{" "}
                    {cart
                      .reduce((sum, book) => sum + book.salePrice, 0)
                      .toLocaleString()}
                    원
                  </p>
                  <button
                    className="btn btn-primary btn-large"
                    onClick={() =>
                      alert("주문 기능은 준비 중입니다. (결제·배송 연동 예정)")
                    }
                  >
                    주문하기
                  </button>
                </div>
                <BookList
                  books={cart}
                  onToggleFavorite={handleToggleFavorite}
                  favoriteIds={favorites}
                />
              </>
            )}
          </div>
        );

      case "favorites":
        return (
          <div className="tab-content">
            {favoriteBooks.length === 0 ? (
              <div className="empty-state">
                <FiHeart className="empty-icon" />
                <p>찜한 도서가 없습니다.</p>
              </div>
            ) : (
              <BookList
                books={favoriteBooks}
                onToggleFavorite={handleToggleFavorite}
                favoriteIds={favorites}
              />
            )}
          </div>
        );

      case "orders":
        return (
          <div className="tab-content">
            {orders.length === 0 ? (
              <div className="empty-state">
                <FiPackage className="empty-icon" />
                <p>주문 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-item">
                    <h3>주문번호: {order.id}</h3>
                    <p>주문일: {order.date}</p>
                    <p>총 금액: {order.total.toLocaleString()}원</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div className="tab-content">
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">
                  <FiUser />
                </div>
                <h2>사용자 정보</h2>
              </div>
              <div className="profile-info">
                <div className="info-item">
                  <label>이름</label>
                  <input type="text" defaultValue="홍길동" />
                </div>
                <div className="info-item">
                  <label>이메일</label>
                  <input type="email" defaultValue="user@example.com" />
                </div>
                <div className="info-item">
                  <label>전화번호</label>
                  <input type="tel" defaultValue="010-1234-5678" />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => alert("수정이 완료되었습니다.")}
                >
                  정보 수정
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mypage-page">
      <div className="inner">
        <h1 className="mypage-title">마이페이지</h1>

        <div className="mypage-content">
          <div className="mypage-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mypage-main">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
