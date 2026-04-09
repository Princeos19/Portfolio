import { ProjectCard } from './ProjectCard';
import { projectItems } from '../../data/projects';

interface ProjectsGridProps {
  projects?: typeof projectItems;
}

export function ProjectsGrid({ projects = projectItems }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
