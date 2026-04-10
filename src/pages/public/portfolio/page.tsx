import { Navigation } from '../../../components/public/Navigation';
import { ProjectsGrid } from '../../../components/public/ProjectsGrid';
import { Pagination } from '../../../components/public/Pagination';
import { ContactCTA } from '../../../components/public/ContactCTA';
import { Footer } from '../../../components/public/Footer';
import { projectItems } from '../../../data/projects';

export default function PortfolioPage() {
  const currentPage = 1;
  const totalPages = Math.ceil(projectItems.length / 6);

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 relative">
      <div className="bg-glow-container">
        <div className="glow-hero"></div>
        <div className="glow-mid-left"></div>
        <div className="glow-mid-right"></div>
      </div>

      <Navigation />

      <main className="min-h-screen">
        <header className="max-w-[1400px] mx-auto px-12 pt-24 pb-20 text-center">
          <h1 className="font-headline text-5xl md:text-[80px] font-extrabold tracking-tight leading-none mb-8">
            Explore all my <span className="text-primary">projects</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A curated selection of digital experiences, product designs, and technical experiments focused on clarity and impact.
          </p>
        </header>

        <section className="max-w-[1400px] mx-auto px-12 pb-32" id="projects">
          <ProjectsGrid projects={projectItems.slice((currentPage - 1) * 6, currentPage * 6)} />
        </section>

        <section className="max-w-[1400px] mx-auto px-12 pb-20">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>

        <section className="max-w-[1400px] mx-auto px-12 py-32" id="contact">
          <ContactCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
}
