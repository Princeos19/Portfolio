import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/public/Navigation';
import { ServiceCard } from '../../../components/public/ServiceCard';
import { ExperienceTimeline } from '../../../components/public/ExperienceTimeline';
import { FeaturedProjects } from '../../../components/public/FeaturedProjects';
import { ReviewsSection } from '../../../components/public/ReviewsSection';
import { ContactCTA } from '../../../components/public/ContactCTA';
import { Footer } from '../../../components/public/Footer';
import { serviceItems } from '../../../data/serviceItems';
import { experienceItems } from '../../../data/experienceItems';

export default function HomePage() {
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
                <span className="text-primary">Prince</span>
                <span className="relative">
                 <span className="bg-[linear-gradient(90deg,#01A1D6_41.51%,#FFC1DF_115.95%)] bg-clip-text text-transparent">O</span>sei
                </span>
              </h1>
              <h2 className="text-2xl font-bold mt-4">Product Designer</h2>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
              Welcome to my creative space, where pixels meet purpose and design unfolds as a powerful storyteller. I'm a passionate product designer driven by belief that exceptional design transcends aesthetics—it solves problems, enriches experiences, and leaves an indelible mark on users' lives.
            </p>
            <Link to="/contact" className="bg-primary text-on-primary px-10 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 inline-block">
              Lets talk
            </Link>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="w-72 h-72 md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-[6px] border-surface-variant/50 glow-cyan relative z-10 p-2">
              <img alt="Prince Osei" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApB_aE-8Zipv4vBfwYGtIHbu94xSugNsih1ySIYkoPOwvusohG86gGRYGUu0kGC1WeME-9XvQgKVemQHCaJAsnJrUXQQyIM2JoPGUVIB1TmGtZrx5pfpK0sdK8dwKQQvPkMRxzm7Wrshz8nHUUotd2G5kkGCBDqRedWOQQDKcnu_WKRHGxtpije302jC4FW41vKHFO6Zan-CzW9OoYEfN7Toxgib4j7D0csf_HvJMSI3KU_YYWFwugm9KGY8Q1I4yH_XR2lxNEUd0"/>
            </div>
          </div>
        </section>

        <section className="py-32">
          <h2 className="text-4xl font-extrabold mb-16">Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceItems.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>

        <section className="py-32 flex flex-col md:flex-row gap-24">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-extrabold mb-8">Work Experience</h2>
            <p className="text-on-surface-variant text-[15px] leading-relaxed">
              Embarking on a dynamic journey in product design, I've led impactful projects from concept to execution. Collaborating cross-functionally, I've woven visually appealing interfaces that seamlessly align with user needs. Each role has been a canvas for innovation, reflecting my passion for creating impactful, user-centric design solutions.
            </p>
          </div>
          <div className="md:w-2/3 space-y-0 border-b border-outline/20">
            {experienceItems.map((exp, index) => (
              <ExperienceTimeline key={index} {...exp} />
            ))}
          </div>
        </section>

        <section className="py-32" id="projects">
          <h2 className="text-4xl font-extrabold mb-16">Projects</h2>
          <FeaturedProjects />
          <div className="flex justify-center mt-20">
            <Link to="/portfolio" className="border border-outline/40 px-10 py-3 rounded-full text-xs font-bold flex items-center gap-3 hover:border-primary transition-all uppercase tracking-widest">
              See all projects <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <section className="py-32">
          <h2 className="text-4xl font-extrabold mb-20 flex items-center gap-6">
            Reviews
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
