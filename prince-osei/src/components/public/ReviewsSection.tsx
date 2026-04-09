import { ReviewCard } from './ReviewCard';

export function ReviewsSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <ReviewCard
          text="Osei Prince is an outstanding designer, merging creativity and technical prowess seamlessly in UI/UX and Graphic Design. His attention to detail, coupled with a deep understanding of user experience and visual storytelling, results in visually stunning and engaging projects."
          author="Peter Tonka-"
          role="CEO Tonitel"
        />
        <ReviewCard
          text="Osei Prince excels as a product designer, effortlessly merging creativity and functionality in every project. Osei's commitment to understanding user needs ensures that his designs are both aesthetically pleasing and impactful."
          author="Mr. Suale"
          role="CEO Offlise"
        />
      </div>
      <div className="flex justify-end gap-5 mt-16">
        <button className="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <button className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </>
  );
}
