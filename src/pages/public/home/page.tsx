import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactCTA } from '../../../components/public/ContactCTA';
import { ExperienceTimeline } from '../../../components/public/ExperienceTimeline';
import { FeaturedProjects } from '../../../components/public/FeaturedProjects';
import { Footer } from '../../../components/public/Footer';
import { Navigation } from '../../../components/public/Navigation';
import { ReviewsSection } from '../../../components/public/ReviewsSection';
import { ServiceCard } from '../../../components/public/ServiceCard';
import { experienceItems } from '../../../data/experienceItems';
import { serviceItems } from '../../../data/serviceItems';
import { getPageContent, type PublicPageContentResponse } from '../../../lib/api/public';

type ContentSection = Record<string, unknown>;

const DEFAULT_HOME_HERO = {
  headline: 'Prince Osei',
  subheadline: 'Product Designer',
  description:
    "Welcome to my creative space, where pixels meet purpose and design unfolds as a powerful storyteller. I'm a passionate product designer driven by belief that exceptional design transcends aesthetics—it solves problems, enriches experiences, and leaves an indelible mark on users' lives.",
  ctaLabel: 'Lets talk',
  ctaHref: '/contact',
  imageSrc:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApB_aE-8Zipv4vBfwYGtIHbu94xSugNsih1ySIYkoPOwvusohG86gGRYGUu0kGC1WeME-9XvQgKVemQHCaJAsnJrUXQQyIM2JoPGUVIB1TmGtZrx5pfpK0sdK8dwKQQvPkMRxzm7Wrshz8nHUUotd2G5kkGCBDqRedWOQQDKcnu_WKRHGxtpije302jC4FW41vKHFO6Zan-CzW9OoYEfN7Toxgib4j7D0csf_HvJMSI3KU_YYWFwugm9KGY8Q1I4yH_XR2lxNEUd0',
  imageAlt: 'Prince Osei',
};

const DEFAULT_HOME_SECTIONS = {
  sectionsTitle: 'Sections',
  experienceTitle: 'Work Experience',
  experienceDescription:
    "Embarking on a dynamic journey in product design, I've led impactful projects from concept to execution. Collaborating cross-functionally, I've woven visually appealing interfaces that seamlessly align with user needs. Each role has been a canvas for innovation, reflecting my passion for creating impactful, user-centric design solutions.",
  projectsTitle: 'Projects',
  reviewsTitle: 'Reviews',
};

function parseSection(pageContent: PublicPageContentResponse | null, sectionKey: string): ContentSection {
  const section = pageContent?.sections.find((item) => item.sectionKey === sectionKey);
  if (!section) {
    return {};
  }

  try {
    const parsed = JSON.parse(section.contentJson) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ContentSection;
    }
  } catch {
    return {};
  }

  return {};
}

function readString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function mapServiceItems(value: unknown) {
  if (!Array.isArray(value)) {
    return serviceItems;
  }

  const mapped = value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return null;
      }

      const record = item as ContentSection;
      return {
        icon: readString(record.icon, ''),
        title: readString(record.title, ''),
        description: readString(record.description, ''),
      };
    })
    .filter((item): item is { icon: string; title: string; description: string } => Boolean(item?.title));

  return mapped.length > 0 ? mapped : serviceItems;
}

function mapExperienceItems(value: unknown) {
  if (!Array.isArray(value)) {
    return experienceItems;
  }

  const mapped = value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return null;
      }

      const record = item as ContentSection;
      return {
        period: readString(record.period, ''),
        role: readString(record.role, ''),
        company: readString(record.company, ''),
      };
    })
    .filter((item): item is { period: string; role: string; company: string } => Boolean(item?.role));

  return mapped.length > 0 ? mapped : experienceItems;
}

function splitHeadline(headline: string): { firstWord: string; remainingWords: string } {
  const parts = headline.trim().split(/\s+/);
  return {
    firstWord: parts[0] || DEFAULT_HOME_HERO.headline.split(' ')[0],
    remainingWords: parts.slice(1).join(' '),
  };
}

export default function HomePage() {
  const [pageContent, setPageContent] = useState<PublicPageContentResponse | null>(null);

  useEffect(() => {
    let isActive = true;

    void getPageContent('home')
      .then((response) => {
        if (isActive) {
          setPageContent(response);
        }
      })
      .catch(() => {
        if (isActive) {
          setPageContent(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const heroSection = parseSection(pageContent, 'hero');
  const servicesSection = parseSection(pageContent, 'services');
  const experienceSection = parseSection(pageContent, 'experience');
  const projectsSection = parseSection(pageContent, 'projects');
  const reviewsSection = parseSection(pageContent, 'reviews');

  const heroHeadline = readString(heroSection.headline, DEFAULT_HOME_HERO.headline);
  const { firstWord, remainingWords } = splitHeadline(heroHeadline);
  const heroSubheadline = readString(heroSection.subheadline, DEFAULT_HOME_HERO.subheadline);
  const heroDescription = readString(heroSection.description, DEFAULT_HOME_HERO.description);
  const heroCtaLabel = readString(heroSection.ctaLabel, DEFAULT_HOME_HERO.ctaLabel);
  const heroCtaHref = readString(heroSection.ctaHref, DEFAULT_HOME_HERO.ctaHref);
  const heroImageSrc = readString(heroSection.imageSrc, DEFAULT_HOME_HERO.imageSrc);
  const heroImageAlt = readString(heroSection.imageAlt, DEFAULT_HOME_HERO.imageAlt);

  const sectionsTitle = readString(servicesSection.title ?? servicesSection.heading, DEFAULT_HOME_SECTIONS.sectionsTitle);
  const serviceSectionItems = mapServiceItems(servicesSection.items);
  const experienceTitle = readString(
    experienceSection.title ?? experienceSection.heading,
    DEFAULT_HOME_SECTIONS.experienceTitle,
  );
  const experienceDescription = readString(
    experienceSection.description,
    DEFAULT_HOME_SECTIONS.experienceDescription,
  );
  const experienceSectionItems = mapExperienceItems(experienceSection.items);
  const projectsTitle = readString(projectsSection.title ?? projectsSection.heading, DEFAULT_HOME_SECTIONS.projectsTitle);
  const reviewsTitle = readString(reviewsSection.title ?? reviewsSection.heading, DEFAULT_HOME_SECTIONS.reviewsTitle);

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 relative">
      <div className="bg-glow-container">
        {/* Hero glow - top right */}
        <div className="absolute top-[50px] right-[-200px] w-[800px] h-[800px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.14) 0%, transparent 70%)' }}></div>
        {/* Services glow - left */}
        <div className="absolute top-[900px] left-[-250px] w-[700px] h-[700px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.10) 0%, transparent 70%)' }}></div>
        {/* Experience glow - right */}
        <div className="absolute top-[1600px] right-[-250px] w-[900px] h-[900px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.12) 0%, transparent 70%)' }}></div>
        {/* Projects glow - left */}
        <div className="absolute top-[2400px] left-[-200px] w-[800px] h-[800px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, transparent 70%)' }}></div>
        {/* Reviews glow - right */}
        <div className="absolute top-[3200px] right-[-250px] w-[900px] h-[900px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.12) 0%, transparent 70%)' }}></div>
        {/* CTA glow - center */}
        <div className="absolute top-[4000px] left-[-100px] w-[700px] h-[700px]" style={{ background: 'radial-gradient(circle, rgba(0, 188, 212, 0.10) 0%, transparent 70%)' }}></div>
      </div>

      <Navigation />

      <main className="max-w-[1400px] mx-auto px-12 relative z-10">
        <section className="relative py-24 md:py-36 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl space-y-10 order-2 md:order-1 mt-12 md:mt-0">
            <div>
              <h1 className="font-headline text-5xl md:text-[80px] font-extrabold tracking-tight flex items-center flex-wrap gap-x-4 leading-none">
                <span className="text-primary">{firstWord}</span>
                {remainingWords ? (
                  <span className="relative">
                    <span className="bg-[linear-gradient(90deg,#01A1D6_41.51%,#FFC1DF_115.95%)] bg-clip-text text-transparent">
                      {remainingWords}
                    </span>
                  </span>
                ) : null}
              </h1>
              <h2 className="text-2xl font-bold mt-4">{heroSubheadline}</h2>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
              {heroDescription}
            </p>
            <Link to={heroCtaHref} className="bg-primary text-on-primary px-10 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 inline-block">
              {heroCtaLabel}
            </Link>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="w-72 h-72 md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-[6px] border-surface-variant/50 glow-cyan relative z-10 p-2">
              <img alt={heroImageAlt} className="w-full h-full object-cover rounded-full" src={heroImageSrc} />
            </div>
          </div>
        </section>

        <section className="py-32">
          <h2 className="text-4xl font-extrabold mb-16">{sectionsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceSectionItems.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>

        <section className="py-32 flex flex-col md:flex-row gap-24">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-extrabold mb-8">{experienceTitle}</h2>
            <p className="text-on-surface-variant text-[15px] leading-relaxed">
              {experienceDescription}
            </p>
          </div>
          <div className="md:w-2/3 space-y-0 border-b border-outline/20">
            {experienceSectionItems.map((exp, index) => (
              <ExperienceTimeline key={`${exp.company}-${exp.role}-${index}`} {...exp} />
            ))}
          </div>
        </section>

        <section className="py-32" id="projects">
          <h2 className="text-4xl font-extrabold mb-16">{projectsTitle}</h2>
          <FeaturedProjects />
          <div className="flex justify-center mt-20">
            <Link to="/portfolio" className="border border-outline/40 px-10 py-3 rounded-full text-xs font-bold flex items-center gap-3 hover:border-primary transition-all uppercase tracking-widest">
              See all projects <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <section className="py-32">
          <h2 className="text-4xl font-extrabold mb-20 flex items-center gap-6">
            {reviewsTitle}
            <div className="flex-1 h-[1px] bg-outline/20"></div>
          </h2>
          <ReviewsSection />
        </section>

        <section className="py-32" id="contact">
          <ContactCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
}
