import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-full px-12 py-8 flex justify-between items-center max-w-[1400px] mx-auto">
      <Link to="/" className="w-8 h-8 flex items-center justify-center">
        <span className="material-symbols-outlined text-on-background">pentagon</span>
      </Link>
      <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase">
        <Link
          className={`transition-colors ${isActive('/') ? 'text-primary' : 'hover:text-primary'}`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`transition-colors ${isActive('/portfolio') ? 'text-primary' : 'hover:text-primary'}`}
          to="/portfolio"
        >
          Projects
        </Link>
        <Link
          className={`transition-colors ${isActive('/about') ? 'text-primary' : 'hover:text-primary'}`}
          to="/about"
        >
          About
        </Link>
        <Link
          className={`transition-colors ${isActive('/contact') ? 'text-primary' : 'hover:text-primary'}`}
          to="/contact"
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary">share</span>
          <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary">alternate_email</span>
          <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary">language</span>
        </div>
      </div>
    </nav>
  );
}
