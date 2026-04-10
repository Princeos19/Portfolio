export type InquiryStatus = 'NEW' | 'READ' | 'URGENT' | 'ARCHIVED';

export type ProjectType = 'UI/UX Design' | 'Graphic Design' | 'Web Development' | 'Consultation' | 'Other';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
  status: InquiryStatus;
  avatar?: string;
  createdAt: string;
  readAt?: string;
  archivedAt?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
}
