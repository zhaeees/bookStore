// App 컴포넌트
// - 공통 레이아웃(MainLayout)을 렌더. MainLayout 내부에 Outlet이 있어 현재 path에 맞는 페이지가 그 자리에 렌더됨
import MainLayout from "./components/layout/MainLayout";

function App() {
  return <MainLayout />;
}

export default App;
