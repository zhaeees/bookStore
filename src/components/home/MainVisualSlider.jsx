// Swiper React 컴포넌트 - SwiperSlide는 각 슬라이드 래퍼
import { Swiper, SwiperSlide } from "swiper/react";

// 사용할 Swiper 모듈 import
// Navigation: 이전/다음 버튼
// Pagination: 하단 인디케이터
// Autoplay: 자동 슬라이드
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// 커스텀 네비게이션 아이콘
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

// Swiper 기본 스타일 (슬라이드 레이아웃, transition 등 핵심 스타일)
import "swiper/css";
// Pagination 인디케이터 기본 스타일
import "swiper/css/pagination";

import mainVisualData from "../../data/slides.json";
import "./MainVisualSlider.css";

function MainVisualSlider() {
  return (
    /*
      section > Swiper > SwiperSlide 구조.
      각 슬라이드 안에서 글로벌 .inner 로 1200px 안쪽에 텍스트/버튼 배치.
      네비게이션 버튼은 react-icons 로 커스텀 렌더링.
    */
    <section className="main-visual">
      {/* 커스텀 네비게이션 버튼 (react-icons 사용) */}
      <button
        type="button"
        className="main-visual-nav main-visual-nav-prev"
        aria-label="이전 슬라이드"
      >
        <GoChevronLeft />
      </button>
      <button
        type="button"
        className="main-visual-nav main-visual-nav-next"
        aria-label="다음 슬라이드"
      >
        <GoChevronRight />
      </button>

      <Swiper
        // 사용할 모듈 등록 - 배열로 선언해야 Swiper가 인식함
        modules={[Navigation, Pagination, Autoplay]}

        // 슬라이드 개수는 항상 1개 (풀배너 슬라이더)
        slidesPerView={1}

        // 무한 루프: 마지막 슬라이드 이후 첫 번째로 돌아옴
        loop={true}

        // 커스텀 Navigation 버튼 사용 (CSS 셀렉터로 연결)
        navigation={{
          prevEl: ".main-visual-nav-prev",
          nextEl: ".main-visual-nav-next",
        }}

        // Pagination 활성화
        // clickable: true → 인디케이터 클릭 시 해당 슬라이드로 이동
        // CSS에서 .swiper-pagination-bullet 로 스타일 커스텀
        pagination={{ clickable: true }}

        // Autoplay 활성화
        // delay: 5000ms마다 다음 슬라이드로 자동 전환
        // disableOnInteraction: false → 사용자가 버튼 클릭해도 autoplay 멈추지 않음
        autoplay={{ delay: 5000, disableOnInteraction: false }}

        className="main-visual-swiper"
      >
        {/* mainVisualData 배열을 순회하며 각 슬라이드 생성 */}
        {mainVisualData.map((visual, index) => (
          <SwiperSlide key={index}>
            {/*
              슬라이드별 배경색/이미지를 inline style로 적용.
              슬라이드마다 다른 배경이 필요하므로 className이 아닌 style로 처리.
              backgroundImage가 없는 슬라이드는 color만 노출됨.
            */}
            <div
              className="main-visual-slide"
              style={{
                backgroundColor: visual.color,
                backgroundImage: visual.image ? `url(${visual.image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              
                <div className="main-visual-text">
                  {/* label은 옵셔널 필드 - 없으면 렌더링 생략 */}
                  {visual.label && (
                    <p className="main-visual-label">{visual.label}</p>
                  )}
                  <h2 className="main-visual-title">{visual.title}</h2>
                  <p className="main-visual-subtitle">{visual.subtitle}</p>
                </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MainVisualSlider;