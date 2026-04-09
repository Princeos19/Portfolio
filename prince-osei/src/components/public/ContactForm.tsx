import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';
import type { ContactFormProps } from '../../types/contact.types';

export function ContactForm({ setFormStatus }: ContactFormProps) {
  const projectTypeOptions = [
    { value: 'UI/UX Design', label: 'UI/UX Design' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Branding', label: 'Branding' },
    { value: 'General Inquiry', label: 'General Inquiry' },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    try {
      const data = Object.fromEntries(new FormData(form));
      
      const res = await fetch(`https://statikform.com/api/f/${import.meta.env.VITE_STATIKFORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, email_to: import.meta.env.VITE_CONTACT_EMAIL }),
      });

      if (res.ok) {
        setFormStatus('Sent!');
        form.reset();
      } else {
        setFormStatus('Something went wrong.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('Something went wrong.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          label="Your Name"
          name="name"
          placeholder="John Doe"
          required
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="hello@example.com"
          required
        />
      </div>

      <FormSelect
        label="Project Type"
        name="projectType"
        options={projectTypeOptions}
        required
      />

      <FormTextarea
        label="Message"
        name="message"
        placeholder="Tell us about your project..."
        required
      />

      <div className="pt-4">
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center gap-3 bg-primary text-on-primary px-12 py-5 rounded-xl font-headline font-extrabold text-lg transition-all hover:shadow-[0_10px_40px_-10px_rgba(0,218,243,0.5)] active:scale-95 w-full md:w-auto"
        >
          Send Message
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </form>
  );
}
