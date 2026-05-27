import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

function MainLayout() {
  return (
    <div className="min-h-screen bg-shell text-ink">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <TopNav />
          <main id="main-content" tabIndex="-1" className="min-h-0 flex-1 overflow-y-auto p-3 pb-20 sm:p-4 md:p-6 md:pb-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
