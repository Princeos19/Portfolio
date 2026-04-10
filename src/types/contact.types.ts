export type ProjectTypeInquiry = 'UI/UX Design' | 'Web Development' | 'Branding' | 'General Inquiry';

export interface ContactFormData {
  name: string;
  email: string;
  projectType: ProjectTypeInquiry;
  message: string;
}

export interface ContactFormProps {
  setFormStatus: (status: string) => void;
}
