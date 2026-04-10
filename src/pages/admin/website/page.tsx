export default function AdminWebsitePage() {
  return (
    <div className="p-12">
      <header className="mb-12">
        <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
          Content Management System
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
          Manage and edit your website content including hero sections, services, and CTAs.
        </p>
      </header>

      <div className="bg-surface-container rounded-xl p-12 border border-outline-variant/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">edit_note</span>
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">
            CMS Under Construction
          </h3>
          <p className="text-on-surface-variant">
            This page will allow you to edit website content including hero sections, services, and CTAs.
          </p>
        </div>
      </div>
    </div>
  );
}
