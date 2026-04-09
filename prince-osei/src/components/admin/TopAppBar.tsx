import { MaterialIcon } from './MaterialIcon';

export function TopAppBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-[#1e2024]/70 dark:bg-[#1e2024]/70 backdrop-blur-xl flex justify-between items-center px-12 w-full">
      <div className="flex items-center gap-8">
        <span className="font-black text-[#00daf3] tracking-widest text-lg font-headline">
          LUMINARY_OS
        </span>
        <nav className="hidden md:flex gap-6">
          <a
            href="/"
            className="text-[#bbc9cc] text-sm font-medium tracking-wide uppercase hover:text-[#00daf3] transition-colors"
          >
            View Site
          </a>
          <a
            href="#"
            className="text-[#bbc9cc] text-sm font-medium tracking-wide uppercase hover:text-[#00daf3] transition-colors"
          >
            Documentation
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <MaterialIcon
            name="search"
            className="text-[#bbc9cc] group-hover:text-[#00daf3] cursor-pointer transition-colors"
          />
        </div>
        <div className="flex items-center gap-4 border-l border-[#3c494c]/20 pl-6">
          <MaterialIcon
            name="notifications"
            className="text-[#bbc9cc] hover:text-[#00daf3] cursor-pointer transition-colors"
          />
          <MaterialIcon
            name="account_circle"
            className="text-[#bbc9cc] hover:text-[#00daf3] cursor-pointer transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
