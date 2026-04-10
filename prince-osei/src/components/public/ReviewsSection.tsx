import { useState } from 'react';
import { ReviewCard } from './ReviewCard';

export function ReviewsSection() {
  const reviews = [
    {
      text: "Osei Prince is an outstanding designer, merging creativity and technical prowess seamlessly in UI/UX and Graphic Design. His attention to detail, coupled with a deep understanding of user experience and visual storytelling, results in visually stunning and engaging projects. Osei's unique blend of aesthetics and functionality makes him a top choice for design endeavors. Highly recommend for his skill, passion, and ability to deliver exceptional work.",
      author: "Peter Tonka-",
      role: "CEO Tonitel"
    },
    {
      text: "Osei Prince excels as a product designer, effortlessly merging creativity and functionality in every project. Osei's commitment to understanding user needs ensures that his designs are both aesthetically pleasing and impactful. His skill, passion, and ability to deliver designs centered around user experience make him highly recommended in the field.",
      author: "Mr. Suale",
      role: "CEO Offiise"
    },
    {
      text: "Osei Price is a speedy UI/UX designer, excelling in swift, impactful decisions. Collaborating with him ensures both speed and user-centric design excellence. Highly recommended for efficient UI/UX solutions.",
      author: "Issahaku Solomon",
      role: "Project manager- Falconhive"
    },
    {
      text: "Osei Prince stands out as a designer, not only for his exceptional skills but also for his strong teamwork and communication. His collaborative spirit, effective communication, and ability to articulate design concepts make him an asset to any project. Highly recommended for his positive impact on team dynamics.",
      author: "Timothy",
      role: "CEO - Unarcom"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 2 < reviews.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const translateClass = currentIndex === 0 ? 'translate-x-0' : 'translate-x-[-50%]';

  return (
    <>
      <div className="overflow-hidden w-full">
        <div className={`flex gap-24 transition-transform duration-300 ${translateClass}`}>
          {reviews.map((review, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-1/2">
              <ReviewCard
                text={review.text}
                author={review.author}
                role={review.role}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-16">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center transition-colors ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + 2 >= reviews.length}
          className={`w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center transition-all shadow-lg shadow-primary/20 ${
            currentIndex + 2 >= reviews.length ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </>
  );
}
