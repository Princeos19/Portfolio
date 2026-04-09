import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export function ProjectCard({ id, title, description, image }: ProjectCardProps) {
  return (
    <Link to={`/portfolio/${id}`} className="group cursor-pointer block">
      <div className="aspect-square rounded-[2rem] overflow-hidden mb-8 bg-surface-variant/40 border border-outline/20 p-2 card-hover">
        <img
          alt={title}
          className="w-full h-full object-cover rounded-[1.8rem] group-hover:scale-105 transition-transform duration-700"
          src={image}
          loading="lazy"
        />
      </div>
      <div className="space-y-2 px-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-on-surface-variant">{description}</p>
      </div>
    </Link>
  );
}
