import { Outlet } from 'react-router-dom';
import { AdminNavigation } from './AdminNavigation';
import { TopAppBar } from './TopAppBar';
import { NavLink } from 'react-router-dom';
import { MaterialIcon } from './MaterialIcon';
import { APP_ROUTES } from '../../utils/constants';

export function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    window.location.href = APP_ROUTES.ADMIN_LOGIN;
  };

  return (
    <div className="flex min-h-screen bg-[#111318]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#1e2024] flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 pb-4">
          <NavLink to={APP_ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center glow-cyan">
              <MaterialIcon name="dashboard" className="text-on-primary text-xl" />
            </div>
            <span className="font-black text-xl tracking-tighter text-[#00daf3]">
              Luminary
            </span>
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 overflow-y-auto custom-scrollbar">
          <AdminNavigation />
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#3c494c]/15">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-primary/10"
          >
            <MaterialIcon name="logout" className="text-sm" />
            <span className="text-sm">Logout</span>
          </button>
          <div className="flex items-center gap-3 mt-6 px-2">
            <img
              className="w-10 h-10 rounded-full object-cover border border-[#3c494c]/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmP7OCocbMkPjUBRE9SHhiBk-o8aNh0EDKvzsZyfj6VI2uH79qNUTqNLgezD4kNOltfccxE5dXsUiOk9SygMmy-NYmXBCp4B-OrtvWnB3hHRlJv7KFHJVgWPQ2gcBdLvLNNY97uJ4aPkP4EWW15ooGK1mgONWv3PvJuYhlsOGouOMUKNigom-WjepkwLlWS_3q9uBxUIygTJd3R_yEXTDXxsSebiW5W6HBdbKNwnZwbKSs0vejfWd-iWzg97P5oo8kYDRk7Do7a-I"
              alt="Admin profile"
            />
            <div>
              <p className="text-xs font-bold text-on-surface">Admin Profile</p>
              <p className="text-[10px] text-on-surface-variant">Lead Architect</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Top App Bar */}
      <TopAppBar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 pt-16 min-h-screen flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
