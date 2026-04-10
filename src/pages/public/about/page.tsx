import { Navigation } from '../../../components/public/Navigation';
import { ToolStackItem } from '../../../components/public/ToolStackItem';
import { SkillTag } from '../../../components/public/SkillTag';
import { CertificationCard } from '../../../components/public/CertificationCard';
import { ContactCTA } from '../../../components/public/ContactCTA';
import { Footer } from '../../../components/public/Footer';
import { tools } from '../../../data/tools';
import { hardSkills } from '../../../data/hardSkills';
import { softSkills } from '../../../data/softSkills';
import { certifications } from '../../../data/certifications';

export default function AboutPage() {
  const bioParagraph1 = "I'm a multidisciplinary designer with a passion for creating digital experiences that are both functional and visually stunning. My journey began with a curiosity about how things work, which evolved into a career dedicated to crafting user-centric solutions.";
  const bioParagraph2 = "With a background that bridges the gap between healthcare and digital design, I bring a unique perspective to problem-solving, emphasizing empathy and human-centered principles in every project I undertake.";

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
                A journey of <span className="text-primary">learning</span>, designing and impact
              </h1>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed max-w-2xl">
                <p>{bioParagraph1}</p>
                <p>{bioParagraph2}</p>
              </div>
              <div className="mt-10">
                <button className="flex items-center gap-3 bg-surface-variant/40 hover:bg-surface-variant text-primary px-8 py-4 rounded transition-all duration-300 group border border-outline/20">
                  <span className="font-bold text-sm tracking-widest uppercase">Download CV</span>
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
                </button>
              </div>
            </div>
            <div className="md:col-span-5 relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden aspect-[4/5] bg-surface-variant/40 border border-outline/20">
                <img 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGoJcaGLo4ZnVOKyxSPmHmkpVsghD4-wqkP12nmoChOF7TTcPT-bS8cECCqYk3yh3UbtF04C9r82Lwzz17D2Zn__FX4UERwHkv45CtcJhx5GTbVOt6zXm19FR3dgVSy1Zm7Z2S01Mkzrub2xLH89DPLgKNGKDOcZwdzoYfsn2VpRDo2Ak8HoLO4HkMVCGopNUFneWBhG5L5iWBiyDqANToW5WrEbKGu22AVfuio9E-YkgYB2g4B_0__gVEnyNYxD_NAGv9aeA9eE"
                  alt="Portrait of designer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-[2rem] -z-10"></div>
            </div>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-headline font-bold mb-4">Tool Stack</h2>
            <p className="text-on-surface-variant max-w-3xl">Designing user-centered experiences through a combination of unique characteristics and honed competences</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {tools.map((tool) => (
              <ToolStackItem key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Hard Skills</h2>
          <div className="flex flex-wrap gap-3">
            {hardSkills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Soft Skills</h2>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-12 mb-32">
          <div className="mb-12">
            <h2 className="text-3xl font-headline font-bold mb-4">Certifications</h2>
            <p className="text-on-surface-variant max-w-3xl">Designing user-centered experiences through a combination of unique characteristics and honed competences</p>
          </div>
          <div className="space-y-12">
            {certifications.map((cert) => (
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
