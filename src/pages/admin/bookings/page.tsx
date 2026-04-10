export default function AdminBookingsPage() {
  return (
    <div className="p-12">
      <header className="mb-12">
        <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
          Inquiries Management
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
          View, manage, and respond to project inquiries and client requests.
        </p>
      </header>

      <div className="bg-surface-container rounded-xl p-12 border border-outline-variant/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">mail</span>
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">
            Inquiries Under Construction
          </h3>
          <p className="text-on-surface-variant">
            This page will display a table of all inquiries with filtering and management options.
          </p>
        </div>
      </div>
    </div>
  );
}
