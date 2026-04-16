import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../../utils/constants';
import { AdminNavigation } from './AdminNavigation';
import { MaterialIcon } from './MaterialIcon';

export function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    window.location.href = APP_ROUTES.ADMIN_LOGIN;
  };

  return (
    <div className="min-h-screen bg-[#f4eee5] text-[#111318]">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-[#d9d2c8] bg-[#faf7f1]">
        <div className="border-b border-[#e7dfd4] px-6 py-5">
          <NavLink to={APP_ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d2c8] bg-white">
              <MaterialIcon name="dashboard" className="text-[20px] text-[#111318]" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-[#111318]">Senvon</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f695f]">Admin console</p>
            </div>
          </NavLink>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <AdminNavigation />
        </div>

        <div className="border-t border-[#e7dfd4] p-4">
          <button
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d9d2c8] bg-white px-4 py-3 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#f4eee5]"
          >
            <MaterialIcon name="logout" className="text-[18px]" />
            Logout
          </button>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-10 border-b border-[#d9d2c8] bg-[#faf7f1]/95 backdrop-blur">
        <div className="ml-64 flex h-16 items-center justify-between px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#6f695f]">
              Minimal control surface
            </p>
            <p className="text-sm text-[#5e584f]">Console view for portfolio administration</p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#d9d2c8] bg-white px-4 py-2 text-sm font-semibold text-[#111318] transition-colors hover:bg-[#f4eee5]"
          >
            <MaterialIcon name="open_in_new" className="text-[18px]" />
            View site
          </a>
        </div>
      </header>

      <main className="min-h-screen pl-64 pt-16">
        <Outlet />
      </main>
    </div>
  );
}
