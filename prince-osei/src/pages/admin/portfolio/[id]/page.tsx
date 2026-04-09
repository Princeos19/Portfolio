import { Link, useParams } from 'react-router-dom';

export default function AdminPortfolioDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-12">
      <div className="mb-8">
        <Link
          to="/admin/portfolio"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Portfolio
        </Link>
        <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
          {id === 'new' ? 'Add New Case Study' : 'Edit Case Study'}
        </h2>
      </div>

      <div className="bg-surface-container rounded-xl p-12 border border-outline-variant/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">edit</span>
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">
            Editor Under Construction
          </h3>
          <p className="text-on-surface-variant">
            This page will provide a form to create and edit case study details including images, text, and metadata.
          </p>
        </div>
      </div>
    </div>
  );
}
