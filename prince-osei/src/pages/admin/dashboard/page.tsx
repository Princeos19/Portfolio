import { StatsCard } from '../../../components/admin/StatsCard';

export default function AdminDashboardPage() {
  return (
    <div className="p-12 space-y-12">
      <header>
        <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
          Systems Overview
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-2xl font-body">
          Atmospheric real-time performance and portfolio metrics for Digital Luminary portal.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon="architecture"
          label="Total Projects"
          value="24"
          badge="+12%"
        />
        <StatsCard
          icon="alternate_email"
          label="Total Inquiries"
          value="158"
          badge="New"
        />
        <StatsCard
          icon="visibility"
          label="Site Views"
          value="12.4k"
          badge="Live"
        />
      </section>

      <div className="bg-surface-container rounded-xl p-12 border border-outline-variant/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">construction</span>
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">
            Dashboard Under Construction
          </h3>
          <p className="text-on-surface-variant">
            This page will display recent inquiries and quick actions once fully implemented.
          </p>
        </div>
      </div>
    </div>
  );
}
