import { NavLink } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { MaterialIcon } from './MaterialIcon';
import { APP_ROUTES } from '../../utils/constants';

const navItems = [
  { path: APP_ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: 'dashboard' as const },
  { path: APP_ROUTES.ADMIN_WEBSITE, label: 'Content CMS', icon: 'edit_note' as const },
  { path: APP_ROUTES.ADMIN_PORTFOLIO, label: 'Case Studies', icon: 'folder_shared' as const },
  { path: APP_ROUTES.ADMIN_BOOKINGS, label: 'Inquiries', icon: 'mail' as const },
  { path: APP_ROUTES.ADMIN_SETTINGS, label: 'Settings', icon: 'settings' as const },
] as const;

export function AdminNavigation() {
  return (
    <nav className="flex-1 space-y-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === APP_ROUTES.ADMIN_DASHBOARD}
          className={({ isActive }: Pick<LinkProps, 'to'> & { isActive: boolean }) =>
            `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 group relative font-body text-sm ${
              isActive
                ? 'text-[#00daf3] font-bold after:content-[""] after:absolute after:left-0 after:w-1 after:h-6 after:bg-[#00daf3] after:rounded-r-full active-nav-glow'
                : 'text-[#bbc9cc] hover:text-[#e2e2e8] hover:bg-[#1e2024]/50 hover:backdrop-blur-xl'
            }`
          }
        >
          <MaterialIcon name={item.icon} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
