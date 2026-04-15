import { useEffect, useState } from 'react';
import { ContactForm } from '../../../components/public/ContactForm';
import { ContactInfo } from '../../../components/public/ContactInfo';
import { Footer } from '../../../components/public/Footer';
import { Navigation } from '../../../components/public/Navigation';
import { SocialLinks } from '../../../components/public/SocialLinks';
import { getPageContent, type PublicPageContentResponse } from '../../../lib/api/public';

type ContentSection = Record<string, unknown>;

const DEFAULT_CONTACT_HERO = {
  headline: 'Contact',
  subtitle: "Take your business to the next level\nLET'S WORK Together",
};

const DEFAULT_CONTACT_BANNER = {
  imageSrc:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDxqv03kvNNmJaaRVT1UzsSZMqgmeW8DKrNAmgbt68YvNlZWprHbrl6Dj_ebBZy24oS2STpgp0FpfKLb5O1b7-z4FZVwRkUaVhyBAx2q4GkLIfRjmJdcUUDouVCZx9jz7eSEOVbx4XcG-PtTvr_QPyn0mK5u6LDW7okWeNDTNCyYqmvetZ8n6e7eZ8CdVEydv0Q2vC9abPOKu4RGQGugkx2XnB3qCFJUBJ-pG7kDU-htycr479ZhRLdwz9DIOiItBYFf6rEB15I_30',
  imageAlt:
    'Modern minimalist studio office interior with dark walls, architectural lighting, and large windows at dusk with blue ambient tones',
  title: 'Based in Ghana',
  description: 'Working with brands globally to deliver exceptional digital experiences.',
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

export default function ContactPage() {
  const [pageContent, setPageContent] = useState<PublicPageContentResponse | null>(null);
  const formStatus = '';

  const setFormStatus = (status: string) => {
    console.log('Form status:', status);
  };

  useEffect(() => {
    let isActive = true;

    void getPageContent('contact')
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
  const studioBannerSection = parseSection(pageContent, 'studioBanner');

  const heroHeadline = readString(heroSection.headline, DEFAULT_CONTACT_HERO.headline);
  const heroSubtitle = readString(heroSection.subtitle, DEFAULT_CONTACT_HERO.subtitle);
  const subtitleLines = heroSubtitle.split('\n');
  const subtitleLead = subtitleLines[0] ?? DEFAULT_CONTACT_HERO.subtitle.split('\n')[0];
  const subtitleEmphasis = subtitleLines[1];
  const bannerImageSrc = readString(studioBannerSection.imageSrc, DEFAULT_CONTACT_BANNER.imageSrc);
  const bannerImageAlt = readString(studioBannerSection.imageAlt, DEFAULT_CONTACT_BANNER.imageAlt);
  const bannerTitle = readString(studioBannerSection.title, DEFAULT_CONTACT_BANNER.title);
  const bannerDescription = readString(studioBannerSection.description, DEFAULT_CONTACT_BANNER.description);

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 relative">
      <div className="bg-glow-container">
        <div className="glow-hero"></div>
        <div className="glow-mid-left"></div>
        <div className="glow-mid-right"></div>
      </div>

      <Navigation />

      <main className="hero-gradient pt-44 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface-variant/30">
            {heroHeadline}
          </h1>
          <p className="font-headline text-xl md:text-2xl font-light text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {subtitleLead}
            <br />
            {subtitleEmphasis ? (
              <span className="font-extrabold text-on-surface uppercase tracking-tight">
                {subtitleEmphasis}
              </span>
            ) : null}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
            <ContactForm setFormStatus={setFormStatus} />
            {formStatus && (
              <div className="mt-4 p-4 rounded-xl bg-primary/10 text-on-surface text-sm font-semibold">
                {formStatus}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-12">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>

        <div className="mt-32 max-w-6xl mx-auto overflow-hidden rounded-3xl h-[500px] relative group border border-outline-variant/10">
          <img
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            src={bannerImageSrc}
            alt={bannerImageAlt}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          <div className="absolute bottom-12 left-12 max-w-md">
            <p className="font-headline text-2xl font-bold text-on-surface">
              {bannerTitle}
            </p>
            <p className="font-body text-on-surface-variant mt-2">
              {bannerDescription}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
