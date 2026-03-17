import {
  FiBookOpen,
  FiTrendingUp,
  FiBarChart2,
  FiClock,
  FiEdit3,
  FiFeather,
  FiPenTool,
} from "react-icons/fi";
import categoriesData from "../../data/categories.json";
import "./BookFilterBar.css";

const categoryIconMap = {
  all: FiBookOpen,
  self: FiTrendingUp,
  business: FiBarChart2,
  history: FiClock,
  essay: FiEdit3,
  literature: FiFeather,
  poem: FiPenTool, 
};

function BookFilterBar({ filters, onFilterChange }) {
  // 카테고리 변경
  // 1. 클릭된 categoryId를 받는다.
  // 2. 기존 filters를 복사한다.
  // 3. category만 클릭된 값으로 바꾼 새 객체를 만든다.
  // 4. onFilterChange로 부모에게 전달한다.
  const handleCategoryChange = (categoryId) => {
    onFilterChange({ ...filters, category: categoryId });
  };

  // 정렬 변경
  // 1. select에서 넘어온 sort 문자열(e.g. "price-desc")을 받는다.
  // 2. 넘어온 sort 값을 console.log로 찍어서 확인한다.
  // 3. sort가 "price-desc"라면 한 번 더 구체적으로 로그를 찍는다.
  // 4. 기존 filters를 복사해서 sort만 새 값으로 바꾼 후 onFilterChange로 부모에 전달한다.
  const handleSortChange = (sort) => {
    console.log("정렬 값 변경:", sort);

    if (sort === "price-desc") {
      console.log("현재 선택된 정렬: 가격 높은순(price-desc)");
    }

    onFilterChange({ ...filters, sort });
  };

  return (
    <div className="book-filter-bar">
      <div className="filter-categories">
        {categoriesData.map((category) => {
          const IconComponent = categoryIconMap[category.icon] || FiBookOpen;
          return (
            <button
              key={category.id}
              className={`filter-category ${
                filters.category === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="category-icon">
                <IconComponent />
              </span>
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
      <div className="filter-sort">
        <select
          value={filters.sort || ""}
          onChange={(e) => handleSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="">정렬 선택</option>
          <option value="newest">최신순</option>
          <option value="rating">평점순</option>
          <option value="price-asc">가격 낮은순</option>
          <option value="price-desc">가격 높은순</option>
        </select>
      </div>
    </div>
  );
}

export default BookFilterBar;