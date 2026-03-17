import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <div className="inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
