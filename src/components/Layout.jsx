import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="docs-layout">
      <Sidebar />
      <main className="docs-content">
        <Outlet />
      </main>
    </div>
  );
}
