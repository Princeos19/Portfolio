import { Link } from 'react-router-dom';

export default function AdminPortfolioPage() {
  return (
    <div className="p-12">
      <header className="mb-12">
        <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
          Case Studies Management
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
          Manage your portfolio case studies, add new projects, and edit existing work.
        </p>
      </header>

      <div className="bg-surface-container rounded-xl p-12 border border-outline-variant/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">folder_shared</span>
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">
            Portfolio Management Under Construction
          </h3>
          <p className="text-on-surface-variant mb-6">
            This page will display a grid of all case studies with editing and deletion options.
          </p>
          <Link
            to="/admin/portfolio/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Case Study
          </Link>
        </div>
      </div>
    </div>
  );
}
