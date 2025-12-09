import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="docs-layout">
      <Sidebar />
      <main className="docs-content">
        <Outlet />
      </main>
      <footer className="docs-footer" style={{textAlign: 'center', padding: '1rem 0', color: '#666'}}>
        &copy; {new Date().getFullYear()} <a href="https://github.com/anandsurya1590" target="_blank" rel="noopener noreferrer">anandsurya1590</a>
      </footer>
    </div>
  );
}
