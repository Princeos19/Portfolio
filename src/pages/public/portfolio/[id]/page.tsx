import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../../../../components/public/Navigation';
import { Footer } from '../../../../components/public/Footer';
import { projectDetails } from '../../../../data/projectDetails';
import type { ProjectDetail } from '../../../../data/projectDetails';

type ApiPortfolioProject = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string | null;
};

function buildProjectDetailFromApi(remote: ApiPortfolioProject): ProjectDetail {
  const title = remote.title.trim() || 'Untitled Project';
  const summary = remote.summary.trim() || 'No project summary provided yet.';

  return {
    id: remote.slug || String(remote.id),
    title,
    subtitle: `${title}.`,
    tags: ['Portfolio'],
    heroImage: remote.coverImageUrl || '/src/assets/logo.png',
    overview: summary,
    client: 'Unknown Client',
    role: 'Product Designer',
    timeline: '2024',
    service: 'Portfolio Project',
    challenge: [summary],
    solution: [summary],
    solutionChecks: [],
    galleryImages: [],
    features: [],
    impact: [],
    nextProject: null,
  };
}

function mergeProjectDetail(fallback: ProjectDetail | null, remote: ApiPortfolioProject | null): ProjectDetail | null {
  if (!remote) {
    return fallback;
  }

  const title = remote.title.trim();
  const summary = remote.summary.trim();
  const heroImage = remote.coverImageUrl?.trim();

  if (!fallback) {
    return buildProjectDetailFromApi(remote);
  }

  return {
    ...fallback,
    id: remote.slug || fallback.id,
    ...(title ? { title } : {}),
    ...(summary ? { overview: summary } : {}),
    ...(heroImage ? { heroImage } : {}),
  };
}

const colSpanMap: Record<number, string> = {
  4: 'md:col-span-4',
  8: 'md:col-span-8',
  12: 'md:col-span-12',
};

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const [remoteProject, setRemoteProject] = useState<ApiPortfolioProject | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'api' | 'notfound' | 'fallback'>('loading');

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');

    async function loadProject() {
      if (!id) {
        if (!cancelled) {
          setRemoteProject(null);
          setLoadState('notfound');
        }
        return;
      }

      try {
        const response = await fetch(`/api/public/portfolio/${encodeURIComponent(id)}`);
        if (response.status === 404) {
          if (!cancelled) {
            setRemoteProject(null);
            setLoadState('notfound');
          }
          return;
        }

        if (!response.ok) {
          if (!cancelled) {
            setRemoteProject(null);
            setLoadState('notfound');
          }
          return;
        }

        const data = (await response.json()) as { project?: ApiPortfolioProject };
        if (!cancelled) {
          if (data.project) {
            setRemoteProject(data.project);
            setLoadState('api');
          } else {
            setRemoteProject(null);
            setLoadState('notfound');
          }
        }
      } catch {
        if (!cancelled) {
          setRemoteProject(null);
          setLoadState('fallback');
        }
      }
    }

    void loadProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const fallbackProject = id ? projectDetails[id] : null;
  const project =
    loadState === 'api'
      ? mergeProjectDetail(fallbackProject ?? null, remoteProject)
      : loadState === 'fallback'
        ? fallbackProject
        : null;

  if (!project) {
    if (loadState === 'loading') {
      return (
        <div className="bg-background text-on-background font-body min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-headline font-bold mb-4">Loading project</h1>
            <p className="text-on-surface-variant">Fetching portfolio details...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background text-on-background font-body min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold mb-4">Project Not Found</h1>
          <Link to="/portfolio" className="text-primary hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const nextProject = project.nextProject ? projectDetails[project.nextProject.id] : null;

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 relative">
      <div className="bg-glow-container">
        <div className="absolute top-[50px] right-[-200px] w-[800px] h-[800px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.14) 0%, transparent 70%)' }}></div>
        <div className="absolute top-[1200px] left-[-250px] w-[700px] h-[700px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.10) 0%, transparent 70%)' }}></div>
        <div className="absolute top-[2400px] right-[-250px] w-[900px] h-[900px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.12) 0%, transparent 70%)' }}></div>
      </div>

      <Navigation />

      <main className="relative pt-12 z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex gap-3 flex-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant text-xs font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold tracking-tighter leading-none max-w-4xl">
              {project.title}: <span className="text-gradient">{project.subtitle.replace('.', '')}</span>
            </h1>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl group">
            <img
              alt="Project Cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={project.heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none"></div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-8">Overview</h2>
            <p className="text-2xl md:text-3xl font-body text-on-surface leading-relaxed font-light">
              {project.overview}
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-8 p-10 bg-surface-container-low rounded-xl">
            <div>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-2">Client</h3>
              <p className="text-on-surface font-headline font-bold text-lg">{project.client}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-2">Role</h3>
              <p className="text-on-surface font-headline font-bold text-lg">{project.role}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-2">Timeline</h3>
              <p className="text-on-surface font-headline font-bold text-lg">{project.timeline}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-2">Service</h3>
              <p className="text-on-surface font-headline font-bold text-lg">{project.service}</p>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="relative bg-surface-container-lowest py-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-8">The Challenge</h2>
              {project.challenge.map((paragraph, i) => (
                <p key={i} className="text-on-surface-variant text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-8 text-primary">The Solution</h2>
              {project.solution.map((paragraph, i) => (
                <p key={i} className="text-on-surface-variant text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
              <ul className="space-y-4">
                {project.solutionChecks.map((check, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="text-on-surface">{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Design Gallery */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-16 text-center">Process &amp; Artifacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {project.galleryImages.map((img, i) => (
              <div key={i} className={`${colSpanMap[img.span]} ${img.height} rounded-xl overflow-hidden shadow-2xl`}>
                <img alt={img.alt} className="w-full h-full object-cover" src={img.src} />
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {project.features.map((feature, i) => (
              <div key={i} className="p-8 rounded-xl bg-surface-container-high border-t border-outline-variant/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-headline font-bold mb-4">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="max-w-5xl mx-auto px-6 py-32 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-16">The Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {project.impact.map((item, i) => (
              <div key={i}>
                <p className="text-6xl font-headline font-black text-on-surface mb-2">{item.stat}</p>
                <p className="text-on-surface-variant font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Project CTA */}
        {nextProject && (
          <Link to={`/portfolio/${nextProject.id}`} className="block">
            <section className="relative py-48 px-6 bg-surface-container overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div>
                  <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Next Up</p>
                  <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter">{nextProject.title}</h2>
                </div>
                <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-4xl transition-colors duration-300">arrow_forward</span>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 grayscale pointer-events-none">
                <img alt="Next Project" className="h-full w-full object-cover" src={nextProject.heroImage} />
              </div>
            </section>
          </Link>
        )}
      </main>

      <Footer />
    </div>
  );
}
