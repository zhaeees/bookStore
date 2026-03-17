import "./BookSection.css";

/** BookSection: 섹션 제목(title), 부제(subtitle)를 보여주고 children(BookList, BookFilterBar 등)을 감싸는 레이아웃 컴포넌트 */
function BookSection({ title, subtitle, children, className = "" }) {
  return (
    <section className={`book-section ${className}`}>
      <div className="inner">
        <div className="section-header">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default BookSection;
