import { NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
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
    <nav className="flex-1 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === APP_ROUTES.ADMIN_DASHBOARD}
          className={({ isActive }: NavLinkRenderProps) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? 'border border-[#d9d2c8] bg-white text-[#111318]'
                : 'text-[#5e584f] hover:bg-[#f4eee5] hover:text-[#111318]'
            }`
          }
        >
          <MaterialIcon name={item.icon} className="text-[18px]" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
