interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const element = document.getElementById('projects');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center justify-center gap-2 mb-20 px-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-[0.25rem] border border-outline/20 text-on-surface-variant hover:border-primary hover:text-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page > totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-[0.25rem] font-bold text-sm ${
            currentPage === page
              ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-background transition-colors'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-[0.25rem] border border-outline/20 text-on-surface-variant hover:border-primary hover:text-primary transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </nav>
  );
}
