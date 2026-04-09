export type ProjectCategory = 'UX Research' | 'UI/UX Design' | 'Graphic Design' | 'Product Design';

export type ProjectType = 'Mobile App' | 'Web App' | 'Website' | 'Dashboard' | 'Design System';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  type: ProjectType;
  year: string;
  timeline: string;
  role: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  images: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  challenge: string;
  solution: string;
  impact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  client: string;
  category: ProjectCategory;
  type: ProjectType;
  year: string;
  timeline: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  impact?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
}
