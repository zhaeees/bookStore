import { Link } from "react-router-dom";
import { FiShoppingCart, FiStar, FiGift } from "react-icons/fi";
import "./BannerGrid.css";

function BannerGrid() {
  const banners = [
    {
      id: 1,
      title: "2월 Best 1",
      subtitle: "이달의 베스트셀러",
      icon: <FiStar />,
      link: "/search?filter=best",
      color: "#FF9800",
    },
    {
      id: 2,
      title: "장바구니",
      subtitle: "담은 도서 보기",
      icon: <FiShoppingCart />,
      link: "/mypage",
      color: "#4CAF50",
    },
    {
      id: 3,
      title: "이벤트",
      subtitle: "특별 할인 진행중",
      icon: <FiGift />,
      link: "/search?filter=discount",
      color: "#2196F3",
    },
  ];

  return (
    <div className="banner-grid">
      <div className="inner">
        <div className="banner-grid-content">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="banner-item"
              style={{ "--banner-color": banner.color }}
            >
              <div className="banner-icon">{banner.icon}</div>
              <div className="banner-text">
                <h3 className="banner-title">{banner.title}</h3>
                <p className="banner-subtitle">{banner.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerGrid;
