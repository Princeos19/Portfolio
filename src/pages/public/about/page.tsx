import { useEffect, useState, type ReactNode } from 'react';
import { CertificationCard } from '../../../components/public/CertificationCard';
import { ContactCTA } from '../../../components/public/ContactCTA';
import { Footer } from '../../../components/public/Footer';
import { Navigation } from '../../../components/public/Navigation';
import { SkillTag } from '../../../components/public/SkillTag';
import { ToolStackItem } from '../../../components/public/ToolStackItem';
import { certifications } from '../../../data/certifications';
import { hardSkills } from '../../../data/hardSkills';
import { softSkills } from '../../../data/softSkills';
import { tools } from '../../../data/tools';
import { getPageContent, type PublicPageContentResponse } from '../../../lib/api/public';

type ContentSection = Record<string, unknown>;

type CertificationItem = {
  title: string;
  provider: string;
  category: string;
  icon: string;
  credentialUrl: string;
};

const DEFAULT_ABOUT_HERO = {
  headline: 'A journey of learning, designing and impact',
  description1:
    "I'm a multidisciplinary designer with a passion for creating digital experiences that are both functional and visually stunning. My journey began with a curiosity about how things work, which evolved into a career dedicated to crafting user-centric solutions.",
  description2:
    'With a background that bridges the gap between healthcare and digital design, I bring a unique perspective to problem-solving, emphasizing empathy and human-centered principles in every project I undertake.',
  imageSrc:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCGoJcaGLo4ZnVOKyxSPmHkVsghD4-wqkP12nmoChOF7TTcPT-bS8cECCqYk3yh3UbtF04C9r82Lwzz17D2Zn__FX4UERwHkv45CtcJhx5GTbVOt6zXm19FR3dgVSy1Zm7Z2S01Mkzrub2xLH89DPLgKNGKDOcZwdzoYfsn2VpRDo2Ak8HoLO4HkMVCGopNUFneWBhG5L5iWBiyDqANToW5WrEbKGu22AVfuio9E-YkgYB2g4B_0__gVEnyNYxD_NAGv9aeA9eE',
  imageAlt: 'Portrait of designer',
  ctaLabel: 'Download CV',
};

const DEFAULT_ABOUT_SECTIONS = {
  toolStackTitle: 'Tool Stack',
  toolStackDescription:
    'Designing user-centered experiences through a combination of unique characteristics and honed competences',
  certificationsTitle: 'Certifications',
  certificationsDescription:
    'Designing user-centered experiences through a combination of unique characteristics and honed competences',
  hardSkillsTitle: 'Hard Skills',
  softSkillsTitle: 'Soft Skills',
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

function renderHeadlineWithEmphasis(headline: string): ReactNode {
  const emphasisWord = 'learning';
  const emphasisIndex = headline.toLowerCase().indexOf(emphasisWord);

  if (emphasisIndex === -1) {
    return <>{headline}</>;
  }

  const before = headline.slice(0, emphasisIndex);
  const emphasized = headline.slice(emphasisIndex, emphasisIndex + emphasisWord.length);
  const after = headline.slice(emphasisIndex + emphasisWord.length);

  return (
    <>
      {before}
      <span className="text-primary">{emphasized}</span>
      {after}
    </>
  );
}

function readStringArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return items.length > 0 ? items : fallback;
}

function mapTools(value: unknown) {
  if (!Array.isArray(value)) {
    return tools;
  }

  const mapped = value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return null;
      }

      const record = item as ContentSection;
      return {
        name: readString(record.name, ''),
        icon: readString(record.icon, ''),
        backgroundColor: readString(record.backgroundColor, '#000000'),
      };
    })
    .filter((item): item is { name: string; icon: string; backgroundColor: string } => Boolean(item?.name));

  return mapped.length > 0 ? mapped : tools;
}

function mapCertifications(value: unknown): CertificationItem[] {
  if (!Array.isArray(value)) {
    return certifications;
  }

  const mapped = value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return null;
      }

      const record = item as ContentSection;
      return {
        title: readString(record.title, ''),
        provider: readString(record.provider, ''),
        category: readString(record.category, ''),
        icon: readString(record.icon, ''),
        credentialUrl: typeof record.credentialUrl === 'string' ? record.credentialUrl : '#',
      };
    })
    .filter((item): item is CertificationItem => Boolean(item?.title));

  return mapped.length > 0 ? mapped : certifications;
}

export default function AboutPage() {
  const [pageContent, setPageContent] = useState<PublicPageContentResponse | null>(null);

  useEffect(() => {
    let isActive = true;

    void getPageContent('about')
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
  const toolStackSection = parseSection(pageContent, 'toolStack');
  const skillsSection = parseSection(pageContent, 'skills');
  const certificationsSection = parseSection(pageContent, 'certifications');

  const heroHeadline = readString(heroSection.headline, DEFAULT_ABOUT_HERO.headline);
  const bioParagraphs = readStringArray(heroSection.paragraphs, [
    readString(heroSection.description1, DEFAULT_ABOUT_HERO.description1),
    readString(heroSection.description2, DEFAULT_ABOUT_HERO.description2),
  ]);
  const heroImageSrc = readString(heroSection.imageSrc, DEFAULT_ABOUT_HERO.imageSrc);
  const heroImageAlt = readString(heroSection.imageAlt, DEFAULT_ABOUT_HERO.imageAlt);
  const ctaLabel = readString(heroSection.ctaLabel, DEFAULT_ABOUT_HERO.ctaLabel);

  const toolStackTitle = readString(
    toolStackSection.title ?? toolStackSection.heading,
    DEFAULT_ABOUT_SECTIONS.toolStackTitle,
  );
  const toolStackDescription = readString(
    toolStackSection.description,
    DEFAULT_ABOUT_SECTIONS.toolStackDescription,
  );
  const certificationsTitle = readString(
    certificationsSection.title ?? certificationsSection.heading,
    DEFAULT_ABOUT_SECTIONS.certificationsTitle,
  );
  const certificationsDescription = readString(
    certificationsSection.description,
    DEFAULT_ABOUT_SECTIONS.certificationsDescription,
  );
  const hardSkillsTitle = readString(skillsSection.hardSkillsTitle ?? skillsSection.title, DEFAULT_ABOUT_SECTIONS.hardSkillsTitle);
  const softSkillsTitle = readString(skillsSection.softSkillsTitle ?? skillsSection.subtitle, DEFAULT_ABOUT_SECTIONS.softSkillsTitle);

  const toolItems = mapTools(toolStackSection.items);
  const hardSkillItems = readStringArray(skillsSection.hardSkills, hardSkills);
  const softSkillItems = readStringArray(skillsSection.softSkills, softSkills);
  const certificationItems = mapCertifications(certificationsSection.items);

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 relative">
      <div className="bg-glow-container">
        <div className="glow-hero"></div>
        <div className="glow-mid-left"></div>
        <div className="glow-mid-right"></div>
      </div>

      <Navigation />

      <main className="pt-32 pb-20">
        <section className="max-w-[1400px] mx-auto px-12 mb-32 relative">
          <div className="absolute -top-40 -left-20 w-96 h-96 glow-radial pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight mb-8 leading-[1.1]">
                {renderHeadlineWithEmphasis(heroHeadline)}
              </h1>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed max-w-2xl">
                {bioParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10">
                <button className="flex items-center gap-3 bg-surface-variant/40 hover:bg-surface-variant text-primary px-8 py-4 rounded transition-all duration-300 group border border-outline/20">
                  <span className="font-bold text-sm tracking-widest uppercase">{ctaLabel}</span>
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
                </button>
              </div>
            </div>
            <div className="md:col-span-5 relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden aspect-[4/5] bg-surface-variant/40 border border-outline/20">
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src={heroImageSrc}
                  alt={heroImageAlt}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-[2rem] -z-10"></div>
            </div>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-headline font-bold mb-4">{toolStackTitle}</h2>
            <p className="text-on-surface-variant max-w-3xl">{toolStackDescription}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {toolItems.map((tool) => (
              <ToolStackItem key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">{hardSkillsTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {hardSkillItems.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">{softSkillsTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {softSkillItems.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-headline font-bold mb-4">{certificationsTitle}</h2>
            <p className="text-on-surface-variant max-w-3xl">{certificationsDescription}</p>
          </div>
          <div className="space-y-12">
            {certificationItems.map((cert) => (
              <CertificationCard key={cert.title} {...cert} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 py-32" id="contact">
          <ContactCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
}
